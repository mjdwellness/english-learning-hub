import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText, GraduationCap, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: ListChecks,
    title: "Level test",
    text: "Find out whether to start with beginner, intermediate or advanced material.",
  },
  {
    icon: FileText,
    title: "Free sample chapters",
    text: "Read a chapter from each book before you buy.",
  },
  {
    icon: GraduationCap,
    title: "Study plans",
    text: "Four-week and twelve-week plans that combine books with Yorlingo practice.",
  },
  {
    icon: Download,
    title: "Printable worksheets",
    text: "Grammar and vocabulary worksheets you can print and reuse.",
  },
];

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Free English Learning Resources — English Books" },
      {
        name: "description",
        content:
          "Free level tests, sample chapters, study plans and printable worksheets to support your English learning.",
      },
      { property: "og:title", content: "Free English Learning Resources" },
      {
        property: "og:description",
        content: "Level tests, sample chapters, study plans and printable worksheets.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <>
      <section className="bg-sky py-10 lg:py-14">
        <div className="container-page">
          <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Resources</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Free material to help you choose the right book and study consistently.
          </p>
        </div>
      </section>

      <section className="container-page section-y grid gap-4 sm:grid-cols-2 lg:gap-6">
        {resources.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-sky text-navy">
              <Icon className="size-5" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold text-navy">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            <Button asChild variant="navySoft" size="sm" className="mt-4">
              <Link to="/books">Browse books</Link>
            </Button>
          </article>
        ))}
      </section>
    </>
  );
}
