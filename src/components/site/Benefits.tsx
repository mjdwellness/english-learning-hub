import { BookOpenCheck, Download, ShieldCheck, Target } from "lucide-react";

const benefits = [
  {
    icon: BookOpenCheck,
    title: "High-Quality Content",
    text: "Well-structured English-learning books written with care and experience.",
  },
  {
    icon: Target,
    title: "Practical & Effective",
    text: "Learn with real examples and practical exercises.",
  },
  {
    icon: Download,
    title: "Instant Download",
    text: "Purchase digital books and access them immediately.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "Safe and secure checkout with multiple options.",
  },
];

export function Benefits() {
  return (
    <section className="container-page -mt-6 lg:-mt-10">
      <div className="grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-card sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:gap-6">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex min-w-0 items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sky text-navy">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-navy">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
