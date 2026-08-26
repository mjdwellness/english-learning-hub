import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BookGrid } from "@/components/site/BookGrid";
import { getBookById, type Book } from "@/data/books";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist
    .map((id) => getBookById(id))
    .filter((book): book is Book => Boolean(book));

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">Books you saved for later.</p>

      <div className="mt-6">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="font-bold text-navy">Your wishlist is empty</p>
            <Button asChild variant="navy" size="lg" className="mt-5">
              <Link to="/books">Browse books</Link>
            </Button>
          </div>
        ) : (
          <BookGrid books={items} />
        )}
      </div>
    </div>
  );
}
