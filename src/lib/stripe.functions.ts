import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { books, bundles } from "@/data/books";

const PROMOS: Record<string, number> = {
  ENGLISH10: 0.1,
  YORLINGO20: 0.2,
};

const cartItemSchema = z.object({
  id: z.string(),
  kind: z.enum(["book", "bundle"]),
  format: z.enum(["digital", "print"]),
  quantity: z.number().int().min(1).max(20),
});

const createSessionSchema = z.object({
  items: z.array(cartItemSchema).min(1),
  promoCode: z.string().optional(),
  shippingAmountCents: z.number().int().min(0).optional(),
});

function priceOf(item: z.infer<typeof cartItemSchema>): { name: string; unitCents: number } | null {
  if (item.kind === "bundle") {
    const bundle = bundles.find((b) => b.id === item.id);
    if (!bundle) return null;
    return { name: `${bundle.name} (Digital Bundle)`, unitCents: Math.round(bundle.price * 100) };
  }
  const book = books.find((b) => b.id === item.id);
  if (!book) return null;
  if (item.format === "print" && book.print) {
    return { name: `${book.title} (Paperback)`, unitCents: Math.round(book.print.price * 100) };
  }
  return { name: `${book.title} (PDF)`, unitCents: Math.round(book.price * 100) };
}

export const createStripeCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) => createSessionSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) {
      throw new Error(
        "STRIPE_NOT_CONFIGURED: add the STRIPE_SECRET_KEY secret to enable live payments.",
      );
    }
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key);

    const promoRate = data.promoCode ? (PROMOS[data.promoCode.trim().toUpperCase()] ?? 0) : 0;
    const hasPrint = data.items.some((i) => i.format === "print");

    const lineItems: Array<{
      quantity: number;
      price_data: {
        currency: string;
        unit_amount: number;
        tax_behavior: "exclusive";
        product_data: { name: string; tax_code: string };
      };
    }> = [];

    for (const item of data.items) {
      const priced = priceOf(item);
      if (!priced) continue;
      const unitAmount = Math.round(priced.unitCents * (1 - promoRate));
      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: unitAmount,
          tax_behavior: "exclusive",
          product_data: {
            name: priced.name,
            tax_code: item.format === "print" ? "txcd_35010000" : "txcd_10000000",
          },
        },
      });
    }

    if (data.shippingAmountCents && data.shippingAmountCents > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: data.shippingAmountCents,
          tax_behavior: "exclusive",
          product_data: { name: "Print shipping (Lulu)", tax_code: "txcd_92010001" },
        },
      });
    }

    if (lineItems.length === 0) throw new Error("No valid items to charge.");

    const origin = new URL(data.origin ?? "http://localhost:8080").origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      automatic_tax: { enabled: true },
      billing_address_collection: "auto",
      ...(hasPrint
        ? {
            shipping_address_collection: {
              allowed_countries: ["US", "CA", "GB", "HT", "FR", "DO"],
            },
          }
        : {}),
      success_url: `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=1`,
      metadata: {
        promo: data.promoCode ?? "",
        items: JSON.stringify(data.items.map((i) => `${i.id}:${i.format}x${i.quantity}`)),
      },
    });

    return { url: session.url!, sessionId: session.id };
  });

export const getStripeSessionStatus = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ sessionId: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) throw new Error("STRIPE_NOT_CONFIGURED");
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId);
    return {
      paid: session.payment_status === "paid",
      email: session.customer_details?.email ?? null,
      amountTotal: (session.amount_total ?? 0) / 100,
      status: session.status ?? "unknown",
    };
  });
