import { Link } from "@tanstack/react-router";
import { BookOpen, Mail } from "lucide-react";
import { AppDownloadButtons } from "./AppDownloadButtons";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Books", to: "/books" },
      { label: "Bundles", to: "/bundles" },
      { label: "Reviews", to: "/reviews" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Resources", to: "/resources" },
      { label: "Yorlingo App", to: "/yorlingo" },
      { label: "About Us", to: "/about" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Library", to: "/account/library" },
      { label: "My Orders", to: "/account/orders" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:py-16">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-navy text-navy-foreground">
              <BookOpen className="size-5" />
            </span>
            <span className="font-display text-lg leading-tight font-extrabold text-navy">
              English Books
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Practical English-learning books and the Yorlingo app — structured material plus daily
            practice, made for real progress.
          </p>
          <AppDownloadButtons className="mt-6" />
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-bold tracking-wide text-navy uppercase">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} English Books. All rights reserved.</p>
          <a href="mailto:hello@englishbooks.com" className="flex items-center gap-2 hover:text-navy">
            <Mail className="size-4" /> hello@englishbooks.com
          </a>
        </div>
      </div>
    </footer>
  );
}
