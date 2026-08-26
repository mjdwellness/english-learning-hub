import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type {
  LuluCostCalculation,
  LuluLineItem,
  LuluPrintJob,
  LuluPrintJobRequest,
  LuluShippingAddress,
  LuluShippingOption,
} from "./lulu.server";

const addressSchema = z.object({
  name: z.string().min(2),
  street1: z.string().min(3),
  street2: z.string().optional(),
  city: z.string().min(2),
  state_code: z.string().optional(),
  country_code: z.string().length(2).toUpperCase(),
  postcode: z.string().min(2),
  phone_number: z.string().min(8),
});

const printLineItemSchema = z.object({
  title: z.string(),
  quantity: z.number().int().min(1),
  pod_package_id: z.string(),
  interior_source_url: z.string().url(),
  cover_source_url: z.string().url(),
});

const costLineItemSchema = z.object({
  page_count: z.number().int().min(1),
  quantity: z.number().int().min(1),
  pod_package_id: z.string(),
});

export const getLuluShippingOptions = createServerFn({ method: "GET" }).handler(async () => {
  const { luluFetch } = await import("./lulu.server");
  const data = await luluFetch<{ count: number; results: LuluShippingOption[] }>("/shipping-options/");
  return data?.results ?? [];
});

export const calculatePrintCost = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        line_items: z.array(costLineItemSchema).min(1),
        shipping_address: addressSchema,
        shipping_level: z.string().min(1),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { luluFetch } = await import("./lulu.server");
    const body = {
      line_items: data.line_items.map((item) => ({
        page_count: item.page_count,
        quantity: item.quantity,
        pod_package_id: item.pod_package_id,
      })),
      shipping_address: data.shipping_address,
      shipping_option: data.shipping_level,
    };
    const result = await luluFetch<LuluCostCalculation>("/print-job-cost-calculations/", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return result;
  });

export const createPrintOrder = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        contact_email: z.string().email(),
        external_id: z.string().optional(),
        line_items: z.array(printLineItemSchema).min(1),
        shipping_address: addressSchema,
        shipping_level: z.string().min(1),
        subtotal: z.number().min(0),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { luluFetch } = await import("./lulu.server");
    const body: LuluPrintJobRequest = {
      contact_email: data.contact_email,
      line_items: data.line_items.map((item): LuluLineItem => ({
        title: item.title,
        quantity: item.quantity,
        pod_package_id: item.pod_package_id,
        interior: { source_url: item.interior_source_url },
        cover: { source_url: item.cover_source_url },
      })),
      shipping_address: data.shipping_address as LuluShippingAddress,
      shipping_level: data.shipping_level,
    };
    if (data.external_id) body.external_id = data.external_id;

    const luluJob = await luluFetch<LuluPrintJob>("/print-jobs/", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const shippingCost = Number.parseFloat(luluJob.shipping_option?.cost ?? "0");
    const totalCost = Number.parseFloat(luluJob.total_cost ?? luluJob.cost ?? "0");

    const { data: record, error } = await supabaseAdmin
      .from("print_orders")
      .insert({
        email: data.contact_email,
        status: luluJob.status.name ?? "PENDING",
        lulu_print_job_id: luluJob.id,
        shipping_level: luluJob.shipping_level,
        shipping_address: data.shipping_address,
        line_items: data.line_items,
        subtotal: data.subtotal,
        shipping_cost: shippingCost,
        total: totalCost,
      })
      .select("id, email, status, lulu_print_job_id, shipping_level, line_items, subtotal, shipping_cost, total, created_at")
      .single();

    if (error) {
      console.error("Failed to save print order record", error);
      throw new Error("Print job created but order record could not be saved.");
    }

    return { luluJob, record };
  });

export const getPrintJobStatus = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ print_job_id: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { luluFetch } = await import("./lulu.server");
    const result = await luluFetch<LuluPrintJob>(`/print-jobs/${data.print_job_id}/`);
    return result;
  });
