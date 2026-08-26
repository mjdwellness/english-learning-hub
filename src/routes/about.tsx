import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Yorlens English School" },
      {
        name: "description",
        content:
          "We publish practical English-learning books and build Yorlingo, an app that turns daily practice into a habit.",
      },
      { property: "og:title", content: "About Us — Yorlens English School" },
      {
        property: "og:description",
        content: "The team behind Yorlens English School and the Yorlingo learning app.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-sky py-10 lg:py-14">
        <div className="container-page">
          <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">About Us</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            We make English learning practical. Clear books, real examples, and an app that keeps
            you practising every day.
          </p>
        </div>
      </section>

      <section className="container-page section-y grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Practical first",
            text: "Every chapter is built around situations learners actually face at work, at school and while travelling.",
          },
          {
            title: "Clear structure",
            text: "Short rules, worked examples and exercises with answers — no filler, no theory for its own sake.",
          },
          {
            title: "Books plus practice",
            text: "The books provide the structure; Yorlingo turns it into daily practice with lessons, quizzes and rewards.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-navy">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-start gap-5 rounded-3xl bg-navy p-8 text-navy-foreground sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Ready to start learning?
          </h2>
          <Button asChild variant="green" size="xl">
            <Link to="/books">Shop Books</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
