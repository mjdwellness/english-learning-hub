import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  CreditCard,
  Download,
  Heart,
  LibraryBig,
  LogOut,
  MapPin,
  Receipt,
  Settings,
  User,
} from "lucide-react";

const links = [
  { label: "My Library", to: "/account/library", icon: LibraryBig },
  { label: "My Orders", to: "/account/orders", icon: Receipt },
  { label: "Downloads", to: "/account/downloads", icon: Download },
  { label: "Wishlist", to: "/account/wishlist", icon: Heart },
  { label: "Addresses", to: "/account/addresses", icon: MapPin },
  { label: "Payment Methods", to: "/account/payment-methods", icon: CreditCard },
  { label: "Profile", to: "/account/profile", icon: User },
  { label: "Settings", to: "/account/settings", icon: Settings },
] as const;

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — English Books" },
      {
        name: "description",
        content: "Manage your library, orders, downloads, wishlist and account details.",
      },
      { property: "og:title", content: "My Account — English Books" },
      { property: "og:description", content: "Your library, orders and account settings." },
    ],
  }),
  component: AccountLayout,
});

function AccountLayout() {
  return (
    <section className="container-page section-y">
      <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <aside className="h-fit rounded-3xl border border-border bg-card p-4 shadow-card lg:sticky lg:top-24">
          <div className="flex min-w-0 items-center gap-3 border-b border-border px-2 pb-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sky text-navy">
              <User className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy">Welcome back</p>
              <p className="truncate text-xs text-muted-foreground">learner@example.com</p>
            </div>
          </div>
          <nav className="mt-3">
            <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {links.map(({ label, to, icon: Icon }) => (
                <li key={to} className="shrink-0 lg:shrink">
                  <Link
                    to={to}
                    activeProps={{ className: "bg-sky text-navy" }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold whitespace-nowrap hover:text-navy"
                  >
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="mt-3 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
