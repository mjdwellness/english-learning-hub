import { Link } from "@tanstack/react-router";
import { Eye, Heart } from "lucide-react";
import type { Book } from "@/data/books";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import { Price } from "./Price";
import { Rating } from "./Rating";

interface BookCardProps {
  book: Book;
  layout?: "grid" | "list";
}

export function BookCard({ book, layout = "grid" }: BookCardProps) {
  const { toggleWishlist, isInWishlist } = useStore();
  const wished = isInWishlist(book.id);

  const wishlistButton = (
    <button
      type="button"
      onClick={() => toggleWishlist(book.id)}
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className="grid size-9 place-items-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:text-navy"
    >
      <Heart className={cn("size-4", wished && "fill-destructive text-destructive")} />
    </button>
  );

  if (layout === "list") {
    return (
      <article className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-6 sm:p-5">
        <Link to="/books/$slug" params={{ slug: book.slug }} className="block">
          <img
            src={book.cover}
            alt={`${book.title} book cover`}
            loading="lazy"
            className="w-full rounded-lg object-contain"
          />
        </Link>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <Link to="/books/$slug" params={{ slug: book.slug }}>
                <h3 className="text-base font-bold text-navy sm:text-lg">{book.title}</h3>
              </Link>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{book.subtitle}</p>
            </div>
            <div className="shrink-0">{wishlistButton}</div>
          </div>
          <Rating value={book.rating} count={book.reviewCount} />
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
            <Price value={book.price} compareAt={book.compareAtPrice} size="md" />
            <AddToCartButton itemId={book.id} itemTitle={book.title} size="sm" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative bg-surface p-4 pb-2">
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          {wishlistButton}
          <Link
            to="/books/$slug"
            params={{ slug: book.slug }}
            aria-label={`Quick view ${book.title}`}
            className="grid size-9 place-items-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:text-navy"
          >
            <Eye className="size-4" />
          </Link>
        </div>
        <Link to="/books/$slug" params={{ slug: book.slug }} className="block">
          <img
            src={book.cover}
            alt={`${book.title} book cover`}
            loading="lazy"
            className="mx-auto aspect-[3/4] w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 pt-3">
        <Rating value={book.rating} count={book.reviewCount} />
        <Link to="/books/$slug" params={{ slug: book.slug }}>
          <h3 className="text-[0.95rem] leading-snug font-bold text-navy">{book.title}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{book.level} · {book.format}</p>
        <Price value={book.price} compareAt={book.compareAtPrice} className="mt-1" />
        <AddToCartButton
          itemId={book.id}
          itemTitle={book.title}
          className="mt-2 w-full"
          size="sm"
        />
      </div>
    </article>
  );
}
