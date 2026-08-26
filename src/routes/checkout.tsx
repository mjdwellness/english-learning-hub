import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, Tag, Truck } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { coverOf, formatPrice, titleOf, useStore, type CartItem, type PrintOrderRecord } from "@/lib/store";
import { getBookById } from "@/data/books";
import type { LuluCostCalculation } from "@/lib/lulu.server";
import {
  calculatePrintCost,
  createPrintOrder,
  getLuluShippingOptions,
} from "@/lib/lulu.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — English Books" },
      { name: "description", content: "Complete your purchase and get instant access to your books." },
      { property: "og:title", content: "Secure Checkout — English Books" },
      { property: "og:description", content: "Fast, secure checkout with instant digital delivery." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const {
    cart,
    subtotal,
    discount,
    total,
    promoCode,
    applyPromo,
    completeCheckout,
    addPrintOrder,
    setShippingCost,
  } = useStore();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [printCostLoading, setPrintCostLoading] = useState(false);
  const navigate = useNavigate();
  const getShippingOptions = useServerFn(getLuluShippingOptions);
  const getPrintQuote = useServerFn(calculatePrintCost);
  const placePrintOrder = useServerFn(createPrintOrder);

  const printItems = cart.filter((item) => item.format === "print");
  const digitalItems = cart.filter((item) => item.format === "digital");
  const hasPrint = printItems.length > 0;

  const [form, setForm] = useState({
    email: "",
    first: "",
    last: "",
    address: "",
    city: "",
    zip: "",
    country: "US",
    state: "",
    phone: "",
  });
  const [shippingLevel, setShippingLevel] = useState<string>("");
  const [shippingOptions, setShippingOptions] = useState<
    Array<{ level: string; name: string; cost: string }>
  >([]);
  const [printQuote, setPrintQuote] = useState<LuluCostCalculation | null>(null);

  if (cart.length === 0) {
    return (
      <section className="container-page section-y text-center">
        <h1 className="font-display text-2xl font-extrabold text-navy">Nothing to check out</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add a book to your cart first.</p>
        <Button asChild variant="navy" size="lg" className="mt-6">
          <Link to="/books">Shop Books</Link>
        </Button>
      </section>
    );
  }

  function updateField(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function lineItemsFromCart(items: CartItem[]) {
    return items
      .map((item) => {
        const book = getBookById(item.id);
        if (!book || !book.print || item.kind !== "book") return null;
        return {
          title: book.title,
          quantity: item.quantity,
          pod_package_id: book.print.podPackageId,
          interior_source_url: book.print.interiorSourceUrl,
          cover_source_url: book.print.coverSourceUrl,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }

  function lineItemsForCost(items: CartItem[]) {
    return items
      .map((item) => {
        const book = getBookById(item.id);
        if (!book || !book.print || item.kind !== "book") return null;
        return {
          page_count: book.pages ?? 100,
          quantity: item.quantity,
          pod_package_id: book.print.podPackageId,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }

  async function fetchShippingQuote() {
    if (!hasPrint || !form.email || !form.country) {
      toast.error("Enter email and country to estimate print shipping.");
      return;
    }
    setPrintCostLoading(true);
    try {
      const options = await getShippingOptions();
      setShippingOptions(options);
      const defaultLevel = options[0]?.level ?? "";
      const chosenLevel = shippingLevel || defaultLevel;
      if (!shippingLevel && defaultLevel) setShippingLevel(defaultLevel);

      const lineItems = lineItemsForCost(printItems);
      if (lineItems.length === 0) {
        setPrintCostLoading(false);
        return;
      }
      const quote = await getPrintQuote({
        data: {
          line_items: lineItems,
          shipping_address: {
            email: form.email,
            name: `${form.first} ${form.last}`.trim() || form.email,
            street1: form.address,
            city: form.city,
            state_code: form.state || undefined,
            country_code: form.country,
            postcode: form.zip,
            phone_number: form.phone,
          },
          shipping_level: chosenLevel,
        },
      });
      setPrintQuote(quote);
      setShippingCost(Number.parseFloat(quote.shipping_cost.cost ?? "0"));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Could not get shipping cost";
      toast.error(message);
    } finally {
      setPrintCostLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (hasPrint) {
        if (!shippingLevel) {
          toast.error("Select a shipping option for print books.");
          setSubmitting(false);
          return;
        }
        const lineItems = lineItemsFromCart(printItems);
        const printSubtotal = printItems.reduce((sum, item) => {
          const book = getBookById(item.id);
          return sum + (book?.print?.price ?? 0) * item.quantity;
        }, 0);

        const { record } = await placePrintOrder({
          data: {
            contact_email: form.email,
            external_id: `eb-${Date.now().toString().slice(-8)}`,
            line_items: lineItems,
            shipping_address: {
              email: form.email,
              name: `${form.first} ${form.last}`.trim() || form.email,
              street1: form.address,
              city: form.city,
              state_code: form.state || undefined,
              country_code: form.country,
              postcode: form.zip,
              phone_number: form.phone,
            },
            shipping_level: shippingLevel,
            subtotal: printSubtotal,
          },
        });
        addPrintOrder(record as PrintOrderRecord);
      }

      if (digitalItems.length > 0) {
        const order = completeCheckout();
        toast.success(`Payment complete — order ${order.id}`);
      } else {
        toast.success("Print order placed successfully.");
      }

      navigate({ to: "/account/orders" });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Checkout failed";
      toast.error(message);
      setSubmitting(false);
    }
  }

  return (
    <section className="container-page section-y">
      <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Checkout</h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="size-4 text-brand-green" /> Secure, encrypted checkout — no card details
        are stored.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <div className="space-y-6">
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-lg font-extrabold text-navy">
              Customer information
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1.5 h-11"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="first">First name</Label>
                <Input
                  id="first"
                  required
                  className="mt-1.5 h-11"
                  value={form.first}
                  onChange={(e) => updateField("first", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="last">Last name</Label>
                <Input
                  id="last"
                  required
                  className="mt-1.5 h-11"
                  value={form.last}
                  onChange={(e) => updateField("last", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {hasPrint && (
            <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <legend className="px-2 font-display text-lg font-extrabold text-navy">
                Shipping address
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Street address</Label>
                  <Input
                    id="address"
                    required={hasPrint}
                    className="mt-1.5 h-11"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    required={hasPrint}
                    className="mt-1.5 h-11"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    className="mt-1.5 h-11"
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">Postal code</Label>
                  <Input
                    id="zip"
                    required={hasPrint}
                    className="mt-1.5 h-11"
                    value={form.zip}
                    onChange={(e) => updateField("zip", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country code (2 letters)</Label>
                  <Input
                    id="country"
                    required={hasPrint}
                    minLength={2}
                    maxLength={2}
                    placeholder="US"
                    className="mt-1.5 h-11"
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value.toUpperCase())}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    required={hasPrint}
                    className="mt-1.5 h-11"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
              </div>

              {shippingOptions.length > 0 && (
                <div className="mt-4">
                  <Label>Shipping option</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.level}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                          shippingLevel === opt.level
                            ? "border-brand-green bg-brand-green/10"
                            : "border-border bg-card"
                        }`}
                      >
                        <span className="font-semibold text-navy">{opt.name}</span>
                        <span className="text-muted-foreground">
                          {formatPrice(Number.parseFloat(opt.cost))}
                        </span>
                        <input
                          type="radio"
                          name="shippingLevel"
                          value={opt.level}
                          checked={shippingLevel === opt.level}
                          onChange={() => setShippingLevel(opt.level)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                variant="navySoft"
                size="lg"
                className="mt-4 w-full"
                disabled={printCostLoading}
                onClick={fetchShippingQuote}
              >
                <Truck className="size-4" />{" "}
                {printQuote ? "Refresh shipping cost" : "Calculate shipping"}
              </Button>

              {printQuote && (
                <div className="mt-4 rounded-xl bg-surface p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Print shipping</span>
                    <span className="font-semibold text-navy">
                      {formatPrice(Number.parseFloat(printQuote.shipping_cost.cost ?? "0"))}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-muted-foreground">Print total</span>
                    <span className="font-semibold text-navy">
                      {formatPrice(Number.parseFloat(printQuote.total_cost ?? "0"))}
                    </span>
                  </div>
                </div>
              )}
            </fieldset>
          )}

          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-lg font-extrabold text-navy">Payment</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="card">Card number</Label>
                <div className="relative mt-1.5">
                  <CreditCard className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="card"
                    required
                    placeholder="4242 4242 4242 4242"
                    className="h-11 pl-9"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="exp">Expiry</Label>
                <Input id="exp" required placeholder="MM / YY" className="mt-1.5 h-11" />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" required placeholder="123" className="mt-1.5 h-11" />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Payments are in demo mode — this form places the order so you can see both digital
              delivery and Lulu print-job creation.
            </p>
          </fieldset>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-extrabold text-navy">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {cart.map((item) => (
              <li key={`${item.id}-${item.format}`} className="flex items-center gap-3">
                <img
                  src={coverOf(item)}
                  alt=""
                  loading="lazy"
                  className="h-14 w-auto rounded border border-border object-contain"
                />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-navy">
                  {titleOf(item)}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">×{item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-2 border-t border-border pt-5">
            <div className="relative min-w-0 flex-1">
              <Tag className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Promo code"
                aria-label="Promo code"
                className="h-11 rounded-xl bg-surface pl-9"
              />
            </div>
            <Button
              type="button"
              variant="navySoft"
              size="lg"
              onClick={() =>
                applyPromo(code) ? toast.success("Promo applied") : toast.error("Invalid code")
              }
            >
              Apply
            </Button>
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold text-navy">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Discount {promoCode ? `(${promoCode})` : ""}
              </dt>
              <dd className="font-semibold text-brand-green">-{formatPrice(discount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-semibold text-navy">
                {formatPrice(printQuote ? Number.parseFloat(printQuote.shipping_cost.cost) : 0)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <dt className="font-bold text-navy">Total</dt>
              <dd className="font-display text-xl font-extrabold text-navy">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <Button
            type="submit"
            variant="green"
            size="xl"
            className="mt-6 w-full"
            disabled={submitting || (hasPrint && !printQuote)}
          >
            <Lock /> Pay {formatPrice(total)}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {hasPrint
              ? "Print books ship via Lulu. Digital books appear in My Library after payment."
              : "Digital delivery — download links appear in My Library right after payment."}
          </p>
        </aside>
      </form>
    </section>
  );
}
