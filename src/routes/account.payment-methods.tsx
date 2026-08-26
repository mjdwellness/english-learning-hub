import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account/payment-methods")({
  component: PaymentMethodsPage,
});

function PaymentMethodsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
        Payment Methods
      </h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="size-4 text-brand-green" /> Card details are never stored on this
        site.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <span className="grid size-10 place-items-center rounded-xl bg-sky text-navy">
            <CreditCard className="size-5" />
          </span>
          <p className="mt-4 text-sm font-bold text-navy">Visa •••• 4242</p>
          <p className="text-xs text-muted-foreground">Expires 04 / 29</p>
          <Button variant="navySoft" size="sm" className="mt-4">
            Remove
          </Button>
        </article>

        <button
          type="button"
          className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-border bg-surface p-5 text-sm font-semibold text-muted-foreground hover:text-navy"
        >
          <span className="flex flex-col items-center gap-2">
            <Plus className="size-5" /> Add payment method
          </span>
        </button>
      </div>
    </div>
  );
}
