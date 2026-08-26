import { createFileRoute } from "@tanstack/react-router";
import { BundleCard } from "@/components/site/BundleCard";
import { bundles } from "@/data/books";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Book Bundles — Save on English-Learning Sets | English Books" },
      {
        name: "description",
        content:
          "Buy English-learning books together and save. Beginner Bundle, Grammar Mastery and the Complete English Learning collection.",
      },
      { property: "og:title", content: "Book Bundles — Save on English-Learning Sets" },
      {
        property: "og:description",
        content: "Discounted bundles of 3, 4 or 6 English-learning books with instant download.",
      },
    ],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  return (
    <>
      <section className="bg-sky py-10 lg:py-14">
        <div className="container-page">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Home / Bundles
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Bundles
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Combine books into a complete learning path and pay significantly less than buying each
            title separately.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>
    </>
  );
}
