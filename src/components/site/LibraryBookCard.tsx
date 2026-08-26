import { BookOpen, Check, Download } from "lucide-react";
import type { Book } from "@/data/books";
import { Button } from "@/components/ui/button";
import { useStore, type LibraryEntry } from "@/lib/store";
import { toast } from "sonner";

export function LibraryBookCard({ book, entry }: { book: Book; entry: LibraryEntry }) {
  const { markDownloaded, setProgress } = useStore();
  const readLabel = entry.progress === 0 ? "Read" : entry.progress >= 100 ? "Read Again" : "Continue";

  return (
    <article className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-[80px_minmax(0,1fr)_auto] sm:gap-5">
      <img
        src={book.cover}
        alt={`${book.title} cover`}
        loading="lazy"
        className="w-full rounded-md object-contain"
      />
      <div className="min-w-0">
        <h3 className="truncate text-sm font-bold text-navy sm:text-base">{book.title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {book.format} · {book.pages} pages · {book.fileSize}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 w-full max-w-40 overflow-hidden rounded-full bg-sky-strong">
            <div
              className="h-full rounded-full bg-brand-green transition-all"
              style={{ width: `${entry.progress}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-semibold text-muted-foreground">
            {entry.progress}%
          </span>
        </div>
      </div>
      <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:flex-col">
        <Button
          variant="navy"
          size="sm"
          onClick={() => setProgress(book.id, Math.min(100, entry.progress + 25))}
        >
          <BookOpen /> {readLabel}
        </Button>
        <Button
          variant={entry.downloaded ? "greenSoft" : "navySoft"}
          size="sm"
          onClick={() => {
            markDownloaded(book.id);
            toast.success(`${book.title} downloaded`);
          }}
        >
          {entry.downloaded ? <Check /> : <Download />}
          {entry.downloaded ? "Downloaded" : "Download"}
        </Button>
      </div>
    </article>
  );
}
