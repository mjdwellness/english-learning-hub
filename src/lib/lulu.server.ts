import { Buffer } from "buffer";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface LuluConfig {
  apiBase: string;
  clientKey: string;
  clientSecret: string;
}

function getConfig(): LuluConfig {
  const apiBase = process.env["LULU_API_BASE"];
  const clientKey = process.env["LULU_CLIENT_KEY"];
  const clientSecret = process.env["LULU_CLIENT_SECRET"];
  if (!apiBase || !clientKey || !clientSecret) {
    throw new Error("Lulu API credentials are not configured.");
  }
  return { apiBase, clientKey, clientSecret };
}

async function fetchAccessToken(config: LuluConfig): Promise<TokenResponse> {
  const tokenUrl = `${config.apiBase}/auth/realms/glasstree/protocol/openid-connect/token`;
  const auth = Buffer.from(`${config.clientKey}:${config.clientSecret}`).toString("base64");
  const body = new URLSearchParams({ grant_type: "client_credentials" });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lulu token request failed (${res.status}): ${text}`);
  }
  return (await res.json()) as TokenResponse;
}

export async function luluFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const config = getConfig();
  const token = await fetchAccessToken(config);
  const url = `${config.apiBase}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `${token.token_type} ${token.access_token}`);
  headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");

  const res = await fetch(url, {
    ...init,
    headers,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Lulu API error (${res.status}): ${text}`);
  }
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export interface LuluLineItem {
  title: string;
  quantity: number;
  pod_package_id: string;
  interior: { source_url: string };
  cover: { source_url: string };
}

export interface LuluShippingAddress {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  postcode: string;
  phone_number?: string;
}

export interface LuluPrintJobRequest {
  contact_email: string;
  external_id?: string;
  line_items: LuluLineItem[];
  shipping_address: LuluShippingAddress;
  shipping_level: string;
}

export interface LuluPrintJob {
  id: string;
  status: {
    name: string;
    message?: string;
  };
  line_items: Array<{
    id: string;
    title: string;
    quantity: number;
    page_count?: number;
  }>;
  shipping_address: LuluShippingAddress;
  shipping_level: string;
  shipping_option?: {
    name: string;
    level: string;
    cost: string;
    currency: string;
  };
  tracking_number?: string;
  tracking_urls?: string[];
  contact_email: string;
  cost?: string;
  total_cost?: string;
  total_cost_plus_tax?: string;
}

export interface LuluCostCalculation {
  line_item_costs: Array<{
    line_item_id: string;
    cost: string;
    cost_excl_discount: string;
  }>;
  shipping_cost: {
    cost_excl_discount: string;
    cost: string;
    level_name: string;
    level: string;
  };
  total_cost_excl_discount: string;
  total_discount: string;
  total_cost: string;
}

export interface LuluShippingOption {
  level: string;
  name: string;
  cost: string;
  currency: string;
}
