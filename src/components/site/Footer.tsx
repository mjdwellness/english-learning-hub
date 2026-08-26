import { Link } from "@tanstack/react-router";
import { BookOpen, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container-page flex flex-col items-center gap-6 py-10 text-center">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-navy text-navy-foreground">
            <BookOpen className="size-5" />
          </span>
          <span className="font-display text-lg leading-tight font-extrabold text-navy">
            English Books
          </span>
        </Link>
        <p className="max-w-md text-sm text-muted-foreground">
          Practical English-learning books and the Yorlingo app.
        </p>
        <a href="mailto:hello@englishbooks.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy">
          <Mail className="size-4" /> hello@englishbooks.com
        </a>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} English Books. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
