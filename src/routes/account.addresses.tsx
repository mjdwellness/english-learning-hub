import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account/addresses")({
  component: AddressesPage,
});

function AddressesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Addresses</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Billing addresses used for invoices on digital purchases.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-brand-green uppercase">
            <MapPin className="size-3.5" /> Default billing
          </span>
          <p className="mt-3 text-sm font-bold text-navy">Alex Learner</p>
          <p className="mt-1 text-sm text-muted-foreground">
            12 Riverside Avenue
            <br />
            Lisbon, 1200-109
            <br />
            Portugal
          </p>
          <Button variant="navySoft" size="sm" className="mt-4">
            Edit address
          </Button>
        </article>

        <button
          type="button"
          className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-border bg-surface p-5 text-sm font-semibold text-muted-foreground hover:text-navy"
        >
          <span className="flex flex-col items-center gap-2">
            <Plus className="size-5" /> Add new address
          </span>
        </button>
      </div>
    </div>
  );
}
