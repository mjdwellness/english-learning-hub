import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BookOpen, Check, FileText, Globe, HardDrive, Heart, Layers, Zap } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AddToCartButton } from "@/components/site/AddToCartButton";
import { BookGrid } from "@/components/site/BookGrid";
import { Price } from "@/components/site/Price";
import { Rating } from "@/components/site/Rating";
import { SectionHeading } from "@/components/site/SectionHeading";
import { books, getBookBySlug, testimonials } from "@/data/books";
import { formatPrice, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = getBookBySlug(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Book not found — English Books" }, { name: "robots", content: "noindex" }],
      };
    }
    const { book } = loaderData;
    return {
      meta: [
        { title: `${book.title} — English Books` },
        { name: "description", content: book.subtitle },
        { property: "og:title", content: `${book.title} — English Books` },
        { property: "og:description", content: book.subtitle },
      ],
    };
  },
  component: BookDetails,
});

function BookDetails() {
  const { book } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();
  const related = books.filter((b) => b.id !== book.id).slice(0, 4);
  const alsoBought = books.filter((b) => b.id !== book.id).slice(0, 2);
  const bundleTotal = [book, ...alsoBought].reduce((sum, b) => sum + b.price, 0);

  const specs = [
    { icon: FileText, label: "Format", value: book.format },
    { icon: Layers, label: "Pages", value: String(book.pages) },
    { icon: Globe, label: "Language", value: book.language },
    { icon: HardDrive, label: "File Size", value: book.fileSize },
    { icon: BookOpen, label: "Level", value: book.level },
  ];

  return (
    <>
      <div className="border-b border-border bg-surface py-4">
        <div className="container-page flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-navy">
            Home
          </Link>
          <span>/</span>
          <Link to="/books" className="hover:text-navy">
            Books
          </Link>
          <span>/</span>
          <span className="font-semibold text-navy">{book.title}</span>
        </div>
      </div>

      <section className="container-page py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="rounded-3xl bg-sky p-6 sm:p-10">
            <img
              src={book.cover}
              alt={`${book.title} book cover`}
              width={720}
              height={928}
              className="mx-auto w-full max-w-sm drop-shadow-2xl"
            />
          </div>

          <div className="min-w-0">
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{book.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Rating value={book.rating} count={book.reviewCount} size="md" />
              <span className="rounded-full bg-sky px-3 py-1 text-xs font-semibold text-navy">
                {book.level}
              </span>
            </div>

            <Price value={book.price} compareAt={book.compareAtPrice} size="lg" className="mt-6" />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                itemId={book.id}
                itemTitle={book.title}
                size="xl"
                className="flex-1"
              />
              <Button
                variant="green"
                size="xl"
                className="flex-1"
                onClick={() => {
                  addToCart(book.id);
                  navigate({ to: "/checkout" });
                }}
              >
                <Zap /> Buy Now
              </Button>
              <Button
                variant="navySoft"
                size="xl"
                aria-label="Add to wishlist"
                onClick={() => toggleWishlist(book.id)}
              >
                <Heart
                  className={cn(isInWishlist(book.id) && "fill-destructive text-destructive")}
                />
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-navy">What you'll learn</h2>
              <ul className="mt-4 space-y-3">
                {book.learn.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-green/15 text-brand-green">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <dt className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="size-4 shrink-0" /> {label}
                  </dt>
                  <dd className="shrink-0 text-sm font-semibold text-navy">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <h2 className="font-display text-xl font-extrabold text-navy">Full description</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground">{book.description}</p>

            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="preview">
                <AccordionTrigger className="text-sm font-semibold text-navy">
                  Preview / sample chapters
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {book.sample.map((line) => (
                      <li key={line} className="rounded-lg bg-surface px-3 py-2">
                        {line}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reviews">
                <AccordionTrigger className="text-sm font-semibold text-navy">
                  Reviews ({book.reviewCount})
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4">
                    {testimonials.map((review) => (
                      <li key={review.name} className="rounded-xl bg-surface p-4">
                        <Rating value={review.rating} />
                        <p className="mt-2 text-sm text-foreground">“{review.quote}”</p>
                        <p className="mt-2 text-xs font-semibold text-navy">
                          {review.name} · {review.role}
                        </p>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-extrabold text-navy">
              Frequently bought together
            </h2>
            <div className="mt-4 flex items-end gap-3">
              {[book, ...alsoBought].map((item) => (
                <img
                  key={item.id}
                  src={item.cover}
                  alt={`${item.title} cover`}
                  loading="lazy"
                  className="h-28 w-auto rounded-md border border-border object-contain"
                />
              ))}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[book, ...alsoBought].map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span className="min-w-0 truncate">{item.title}</span>
                  <span className="shrink-0 font-semibold text-navy">{formatPrice(item.price)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-display text-2xl font-extrabold text-navy">
              {formatPrice(bundleTotal)}
            </p>
            <Button
              variant="navy"
              size="lg"
              className="mt-4 w-full"
              onClick={() => [book, ...alsoBought].forEach((item) => addToCart(item.id))}
            >
              Add all three to cart
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <SectionHeading title="Related books" actionLabel="View all" actionTo="/books" />
        <BookGrid books={related} />
      </section>
    </>
  );
}
