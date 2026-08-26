import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LibraryBookCard } from "@/components/site/LibraryBookCard";
import { BookCard } from "@/components/site/BookCard";
import { getBookById } from "@/data/books";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const tabs = ["All Books", "Downloaded", "Wishlist"] as const;

export const Route = createFileRoute("/account/library")({
  component: LibraryPage,
});

function LibraryPage() {
  const { library, wishlist } = useStore();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All Books");

  const entries =
    tab === "Downloaded" ? library.filter((entry) => entry.downloaded) : library;
  const wishlistBooks = wishlist.map((id) => getBookById(id)).filter(Boolean);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">My Library</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Purchased books unlock here as soon as payment completes.
      </p>

      <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 shadow-card">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              tab === item ? "bg-sky text-navy" : "text-muted-foreground hover:text-navy",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Wishlist" ? (
          wishlistBooks.length === 0 ? (
            <EmptyState
              title="Your wishlist is empty"
              text="Tap the heart on any book to save it for later."
            />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {wishlistBooks.map((book) => book && <BookCard key={book.id} book={book} />)}
            </div>
          )
        ) : entries.length === 0 ? (
          <EmptyState
            title="No books here yet"
            text="Downloads unlock automatically once an order is paid — you never get access before payment is complete."
          />
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const book = getBookById(entry.bookId);
              return book ? <LibraryBookCard key={entry.bookId} book={book} entry={entry} /> : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-background text-navy">
        <Lock className="size-5" />
      </span>
      <p className="mt-4 font-bold text-navy">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
      <Button asChild variant="navy" size="lg" className="mt-6">
        <Link to="/books">Browse books</Link>
      </Button>
    </div>
  );
}
