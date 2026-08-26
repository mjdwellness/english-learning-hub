import { Check } from "lucide-react";
import {
  bundleBooks,
  bundleOriginalTotal,
  type Bundle,
} from "@/data/books";
import { formatPrice } from "@/lib/store";
import { AddToCartButton } from "./AddToCartButton";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const items = bundleBooks(bundle);
  const original = bundleOriginalTotal(bundle);
  const saved = original - bundle.price;
  const percent = Math.round((saved / original) * 100);

  return (
    <article className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-extrabold text-navy">{bundle.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} books</p>
        </div>
        {bundle.badge && (
          <span className="shrink-0 rounded-full bg-brand-green/12 px-3 py-1 text-xs font-semibold text-brand-green">
            {bundle.badge}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{bundle.tagline}</p>

      <div className="mt-5 flex -space-x-4">
        {items.slice(0, 5).map((book) => (
          <img
            key={book.id}
            src={book.cover}
            alt={`${book.title} cover`}
            loading="lazy"
            className="h-24 w-auto rounded-md border border-border bg-background object-contain shadow-sm"
          />
        ))}
      </div>

      <ul className="mt-5 space-y-2">
        {items.map((book) => (
          <li key={book.id} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-green" />
            <span className="min-w-0">{book.title}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl bg-sky p-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-extrabold text-navy">
            {formatPrice(bundle.price)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(original)}
          </span>
        </div>
        <p className="mt-1 text-sm font-semibold text-brand-green">
          You save {formatPrice(saved)} ({percent}%)
        </p>
      </div>

      <AddToCartButton
        itemId={bundle.id}
        kind="bundle"
        itemTitle={bundle.name}
        label="Buy Bundle"
        size="lg"
        className="mt-4 w-full"
      />
    </article>
  );
}
