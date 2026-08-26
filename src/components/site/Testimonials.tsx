import { testimonials } from "@/data/books";
import { Rating } from "./Rating";

export function Testimonials() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {testimonials.map((item) => (
        <figure
          key={item.name}
          className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
        >
          <Rating value={item.rating} />
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
            “{item.quote}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky text-sm font-bold text-navy">
              {item.name.charAt(0)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-navy">{item.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{item.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
