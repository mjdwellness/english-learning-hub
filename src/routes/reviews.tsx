import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Testimonials } from "@/components/site/Testimonials";
import { books } from "@/data/books";
import { Rating } from "@/components/site/Rating";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Learners Say | English Books" },
      {
        name: "description",
        content:
          "Ratings and reviews from learners using our English-learning books for grammar, speaking, writing and reading.",
      },
      { property: "og:title", content: "Reviews — What Learners Say" },
      { property: "og:description", content: "Verified ratings and reviews from English learners." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const totalReviews = books.reduce((sum, book) => sum + book.reviewCount, 0);
  const average =
    books.reduce((sum, book) => sum + book.rating * book.reviewCount, 0) / totalReviews;

  return (
    <>
      <section className="bg-sky py-10 lg:py-14">
        <div className="container-page grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
          <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-card">
            <p className="font-display text-4xl font-extrabold text-navy">{average.toFixed(1)}</p>
            <div className="mt-2 flex justify-center gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-4 fill-star text-star" />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{totalReviews} reviews</p>
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Reviews</h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Feedback from learners who use the books every week.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <Testimonials />

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-extrabold text-navy">Ratings by book</h2>
          <ul className="mt-4 divide-y divide-border">
            {books.map((book) => (
              <li key={book.id} className="flex items-center justify-between gap-4 py-3">
                <span className="min-w-0 truncate text-sm font-semibold text-navy">
                  {book.title}
                </span>
                <Rating value={book.rating} count={book.reviewCount} className="shrink-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
