import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/data/books";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account/downloads")({
  component: DownloadsPage,
});

function DownloadsPage() {
  const { library, markDownloaded } = useStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Downloads</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Every book you own is available to download again at any time.
      </p>

      {library.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-bold text-navy">Nothing to download yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Download links appear after an order has been paid.
          </p>
          <Button asChild variant="navy" size="lg" className="mt-5">
            <Link to="/books">Shop Books</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-3xl border border-border bg-card px-5 shadow-card">
          {library.map((entry) => {
            const book = getBookById(entry.bookId);
            if (!book) return null;
            return (
              <li key={entry.bookId} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy">{book.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {book.format} · {book.fileSize}
                  </p>
                </div>
                <Button
                  variant="navySoft"
                  size="sm"
                  onClick={() => {
                    markDownloaded(book.id);
                    toast.success(`${book.title} downloaded`);
                  }}
                >
                  <Download /> Download
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
