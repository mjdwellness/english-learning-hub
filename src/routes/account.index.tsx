import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Heart, LibraryBig, Receipt } from "lucide-react";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/account/")({
  component: AccountDashboard,
});

function AccountDashboard() {
  const { library, orders, wishlist } = useStore();
  const downloaded = library.filter((entry) => entry.downloaded).length;

  const stats = [
    { label: "Books owned", value: library.length, icon: LibraryBig, to: "/account/library" },
    { label: "Orders", value: orders.length, icon: Receipt, to: "/account/orders" },
    { label: "Downloads", value: downloaded, icon: Download, to: "/account/downloads" },
    { label: "Wishlist", value: wishlist.length, icon: Heart, to: "/account/wishlist" },
  ] as const;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">My Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Everything you have bought, saved and downloaded in one place.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-sky text-navy">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 font-display text-2xl font-extrabold text-navy">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card">
        <h2 className="font-display text-lg font-extrabold text-navy">Recent orders</h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No orders yet — your purchases will appear here with instant download links.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {orders.slice(0, 4).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()} · {order.bookIds.length} books
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-navy">
                  {formatPrice(order.total)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
