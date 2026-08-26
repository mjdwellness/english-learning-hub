import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/data/books";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/account/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const { orders, printOrders } = useStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">My Orders</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Paid digital orders release downloads to My Library immediately. Print orders ship through
        our print partner.
      </p>

      {orders.length === 0 && printOrders.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-bold text-navy">No orders yet</p>
          <Button asChild variant="navy" size="lg" className="mt-5">
            <Link to="/books">Shop Books</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-navy">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-green/12 px-3 py-1 text-xs font-semibold text-brand-green">
                  <CheckCircle2 className="size-3.5" /> Paid
                </span>
              </div>
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                {order.bookIds.map((id) => (
                  <li key={id} className="truncate text-muted-foreground">
                    {getBookById(id)?.title ?? id}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-lg font-extrabold text-navy">
                  {formatPrice(order.total)}
                </span>
                <Button asChild variant="navySoft" size="sm">
                  <Link to="/account/library">View in library</Link>
                </Button>
              </div>
            </li>
          ))}

          {printOrders.map((order) => (
            <li key={order.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-navy">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-navy">
                  <Package className="size-3.5" /> {order.status}
                </span>
              </div>
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                {order.line_items.map((item, idx) => (
                  <li key={idx} className="truncate text-muted-foreground">
                    <Package className="mr-1.5 inline size-3.5" />
                    {(item as { title: string }).title}
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                {order.lulu_print_job_id && (
                  <p>
                    Lulu print job: <span className="font-mono text-navy">{order.lulu_print_job_id}</span>
                  </p>
                )}
                <p className="flex items-center gap-1.5">
                  <Truck className="size-3.5" /> {order.shipping_level}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-lg font-extrabold text-navy">
                  {formatPrice(order.total)}
                </span>
                <Button asChild variant="navySoft" size="sm">
                  <Link to="/account/library">View digital items</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
