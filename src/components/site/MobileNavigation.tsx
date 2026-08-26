import { Link } from "@tanstack/react-router";
import { BookOpen, Home, Package, User } from "lucide-react";

const items = [
  { label: "Home", to: "/", icon: Home },
  { label: "Books", to: "/books", icon: BookOpen },
  { label: "Bundles", to: "/bundles", icon: Package },
  { label: "Account", to: "/account", icon: User },
] as const;

export function MobileNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-navy" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold"
            >
              <Icon className="size-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
