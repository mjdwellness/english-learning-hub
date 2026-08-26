import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, Tag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { coverOf, formatPrice, titleOf, useStore } from "@/lib/store";

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
  const { cart, subtotal, discount, total, promoCode, applyPromo, completeCheckout } = useStore();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    const order = completeCheckout();
    toast.success(`Payment complete — order ${order.id}`);
    navigate({ to: "/account/library" });
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
                <Input id="email" type="email" required placeholder="you@example.com" className="mt-1.5 h-11" />
              </div>
              <div>
                <Label htmlFor="first">First name</Label>
                <Input id="first" required className="mt-1.5 h-11" />
              </div>
              <div>
                <Label htmlFor="last">Last name</Label>
                <Input id="last" required className="mt-1.5 h-11" />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-lg font-extrabold text-navy">
              Billing information
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required className="mt-1.5 h-11" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" required className="mt-1.5 h-11" />
              </div>
              <div>
                <Label htmlFor="zip">Postal code</Label>
                <Input id="zip" required className="mt-1.5 h-11" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" required className="mt-1.5 h-11" />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-lg font-extrabold text-navy">Payment</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="card">Card number</Label>
                <div className="relative mt-1.5">
                  <CreditCard className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="card" required placeholder="4242 4242 4242 4242" className="h-11 pl-9" />
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
              Payments are not yet connected — this form completes a demo order so you can see the
              digital delivery flow.
            </p>
          </fieldset>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-extrabold text-navy">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
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
            <div className="flex justify-between border-t border-border pt-3">
              <dt className="font-bold text-navy">Total</dt>
              <dd className="font-display text-xl font-extrabold text-navy">{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button type="submit" variant="green" size="xl" className="mt-6 w-full" disabled={submitting}>
            <Lock /> Pay {formatPrice(total)}
          </Button>
        </aside>
      </form>
    </section>
  );
}
