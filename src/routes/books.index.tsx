import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookFilters, type FilterState } from "@/components/site/BookFilters";
import { BookGrid } from "@/components/site/BookGrid";
import { books } from "@/data/books";

interface BooksSearch {
  q?: string | undefined;
}

export const Route = createFileRoute("/books/")({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    q: typeof search['q'] === "string" && search['q'].length > 0 ? search['q'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All English-Learning Books — English Books" },
      {
        name: "description",
        content:
          "Browse every English-learning book: grammar, vocabulary, speaking, writing, reading and conversation. Filter by level and price.",
      },
      { property: "og:title", content: "All English-Learning Books — English Books" },
      {
        property: "og:description",
        content: "Filter our full catalogue by category, level and price. Instant digital download.",
      },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const { q } = Route.useSearch();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterState>({
    query: q ?? "",
    categories: [],
    levels: [],
    maxPrice: 20,
    sort: "popular",
  });

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const filtered = books.filter((book) => {
      const matchesQuery =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.subtitle.toLowerCase().includes(query) ||
        book.categories.some((c) => c.toLowerCase().includes(query));
      const matchesCategory =
        filters.categories.length === 0 ||
        book.categories.some((c) => filters.categories.includes(c));
      const matchesLevel = filters.levels.length === 0 || filters.levels.includes(book.level);
      const matchesPrice = book.price <= filters.maxPrice;
      return matchesQuery && matchesCategory && matchesLevel && matchesPrice;
    });

    switch (filters.sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [filters]);

  return (
    <>
      <section className="bg-navy py-10 text-navy-foreground lg:py-14">
        <div className="container-page">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70">
            Home / Books
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">All Books</h1>
          <p className="mt-3 max-w-xl text-sm opacity-80 sm:text-base">
            Browse our collection of practical English-learning books — every title is a digital
            download you keep forever.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <BookFilters
          state={filters}
          onChange={setFilters}
          layout={layout}
          onLayoutChange={setLayout}
          resultCount={results.length}
        />
        <div className="mt-8">
          <BookGrid books={results} layout={layout} />
        </div>
      </section>
    </>
  );
}
