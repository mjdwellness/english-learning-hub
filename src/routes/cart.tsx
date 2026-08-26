import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { coverOf, formatLabel, formatPrice, priceOf, titleOf, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — English Books" },
      { name: "description", content: "Review your English-learning books before checkout." },
      { property: "og:title", content: "Your Cart — English Books" },
      { property: "og:description", content: "Review your selected books and bundles." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const {
    cart,
    setQuantity,
    removeFromCart,
    subtotal,
    discount,
    total,
    promoCode,
    applyPromo,
  } = useStore();
  const [code, setCode] = useState("");

  if (cart.length === 0) {
    return (
      <section className="container-page section-y">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-card">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-sky text-navy">
            <ShoppingBag className="size-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-extrabold text-navy">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse the catalogue and add a book or bundle to get started.
          </p>
          <Button asChild variant="navy" size="lg" className="mt-6">
            <Link to="/books">Shop Books</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page section-y">
      <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Your Cart</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={`${item.id}-${item.format}`}
              className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:items-center"
            >
              <img
                src={coverOf(item)}
                alt=""
                loading="lazy"
                className="w-full rounded-md object-contain"
              />
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-navy sm:text-base">
                  {titleOf(item)}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">{formatLabel(item)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-input">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(item.id, item.quantity - 1, item.format)}
                      className="grid size-9 place-items-center text-navy"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(item.id, item.quantity + 1, item.format)}
                      className="grid size-9 place-items-center text-navy"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id, item.format)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" /> Remove
                  </button>
                </div>
              </div>
              <p className="col-span-2 text-right font-display text-lg font-extrabold text-navy sm:col-span-1">
                {formatPrice(priceOf(item) * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-extrabold text-navy">Order summary</h2>

          <div className="mt-5 flex gap-2">
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
              variant="navySoft"
              size="lg"
              onClick={() =>
                applyPromo(code)
                  ? toast.success("Promo code applied")
                  : toast.error("That code isn't valid")
              }
            >
              Apply
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Try ENGLISH10 for 10% off.</p>

          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
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
              <dd className="font-display text-xl font-extrabold text-navy">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <Button asChild variant="navy" size="xl" className="mt-6 w-full">
            <Link to="/checkout">Checkout</Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Digital delivery — download links appear in My Library right after payment.
          </p>
        </aside>
      </div>
    </section>
  );
}
