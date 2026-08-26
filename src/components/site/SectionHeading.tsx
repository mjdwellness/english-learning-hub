import { Link } from "@tanstack/react-router";

interface SectionHeadingProps {
  title: string;
  description?: string | undefined;
  actionLabel?: string | undefined;
  actionTo?: "/books" | "/bundles" | "/reviews" | "/yorlingo" | undefined;
}

export function SectionHeading({
  title,
  description,
  actionLabel,
  actionTo,
}: SectionHeadingProps) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
        )}
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="shrink-0 text-sm font-semibold text-brand-green hover:underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
