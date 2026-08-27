import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import logoAsset from "@/assets/yorlens-logo.webp.asset.json";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container-page flex flex-col items-center gap-6 py-10 text-center">
        <Link to="/">
          <img
            src={logoAsset.url}
            alt="Yorlens English School"
            className="h-12 w-auto object-contain"
          />
        </Link>
        <p className="max-w-md text-sm text-muted-foreground">
          Practical English-learning books and the Yorlingo app.
        </p>
        <a href="mailto:hello@yorlens.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy">
          <Mail className="size-4" /> hello@yorlens.com
        </a>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Yorlens English School. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
