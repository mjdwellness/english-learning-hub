import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Benefits } from "@/components/site/Benefits";
import { BookGrid } from "@/components/site/BookGrid";
import { BundleCard } from "@/components/site/BundleCard";
import { Hero } from "@/components/site/Hero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Testimonials } from "@/components/site/Testimonials";
import { YorlingoPromo } from "@/components/site/YorlingoPromo";
import { books, bundles } from "@/data/books";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yorlens English School — Better English. Brighter Future." },
      {
        name: "description",
        content:
          "Practical English-learning books for grammar, speaking, writing, vocabulary and reading. Instant digital download plus the Yorlingo learning app.",
      },
      { property: "og:title", content: "Yorlens English School — Better English. Brighter Future." },
      {
        property: "og:description",
        content:
          "Practical English-learning books with instant download, discounted bundles, and the Yorlingo app for daily practice.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = books.filter((book) => book.featured);

  return (
    <>
      <Hero />
      <Benefits />

      <section className="container-page section-y">
        <SectionHeading
          title="Featured Books"
          description="Hand-picked titles covering the skills learners ask for most."
          actionLabel="View all"
          actionTo="/books"
        />
        <BookGrid books={featured} />
      </section>

      <section className="bg-surface py-12 lg:py-16">
        <div className="container-page">
          <SectionHeading
            title="Save with bundles"
            description="Package several books together and pay less than buying them separately."
            actionLabel="All bundles"
            actionTo="/bundles"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-y">
        <YorlingoPromo />
      </div>

      <section className="container-page pb-12 lg:pb-20">
        <SectionHeading
          title="Loved by learners"
          description="Real feedback from readers using the books every week."
          actionLabel="All reviews"
          actionTo="/reviews"
        />
        <Testimonials />
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-navy p-8 text-navy-foreground sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Start learning today
            </h2>
            <p className="mt-3 text-sm opacity-80 sm:text-base">
              Buy once, download instantly, and keep every book in your library forever.
            </p>
          </div>
          <Button asChild variant="green" size="xl">
            <Link to="/books">
              Shop all books <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
