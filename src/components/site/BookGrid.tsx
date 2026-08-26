import type { Book } from "@/data/books";
import { BookCard } from "./BookCard";

interface BookGridProps {
  books: Book[];
  layout?: "grid" | "list";
}

export function BookGrid({ books, layout = "grid" }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-semibold text-navy">No books match your filters</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try clearing a filter or searching for another topic.
        </p>
      </div>
    );
  }

  if (layout === "list") {
    return (
      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
