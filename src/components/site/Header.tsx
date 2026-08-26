import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { Logo } from "./Logo";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Books", to: "/books" },
  { label: "Bundles", to: "/bundles" },
  { label: "Resources", to: "/resources" },
  { label: "Reviews", to: "/reviews" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cartCount } = useStore();
  const navigate = useNavigate();

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    navigate({ to: "/books", search: { q: query || undefined } });
    setMobileSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-16 items-center gap-4 lg:h-20">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
          className="grid size-10 shrink-0 place-items-center rounded-lg text-navy hover:bg-sky lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Logo className="shrink-0" />

        <nav className="ml-6 hidden min-w-0 flex-1 items-center gap-1 xl:gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-navy after:scale-x-100" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="relative rounded-md px-3 py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:bg-brand-green after:transition-transform hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <form onSubmit={submitSearch} className="hidden lg:block">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books..."
                aria-label="Search books"
                className="h-10 w-56 rounded-full border-border bg-surface pl-9"
              />
            </div>
          </form>

          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Search"
            className="grid size-10 place-items-center rounded-lg text-navy hover:bg-sky lg:hidden"
          >
            <Search className="size-5" />
          </button>

          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative grid size-10 place-items-center rounded-lg text-navy hover:bg-sky"
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0.5 grid size-5 place-items-center rounded-full bg-brand-green text-[0.65rem] font-bold text-brand-green-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/account"
            aria-label="Account"
            className="hidden size-10 place-items-center rounded-lg text-navy hover:bg-sky sm:grid"
          >
            <User className="size-5" />
          </Link>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-border bg-background p-4 lg:hidden">
          <form onSubmit={submitSearch} className="flex gap-2">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books..."
              aria-label="Search books"
              className="h-11 rounded-xl bg-surface"
            />
            <Button type="submit" variant="navy" size="lg">
              Search
            </Button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="border-t border-border bg-background lg:hidden">
          <ul className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-navy bg-sky" }}
                  inactiveProps={{ className: "text-foreground" }}
                  className="block rounded-lg px-3 py-3 text-base font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/yorlingo"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block rounded-lg bg-brand-green/10 px-3 py-3 text-base font-semibold text-brand-green"
              >
                Yorlingo App
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
