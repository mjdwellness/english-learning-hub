import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { formatPrice, useStore, type PrintOrderRecord } from "@/lib/store";
import { getStripeSessionStatus } from "@/lib/stripe.functions";
import { createPrintOrder } from "@/lib/lulu.functions";

const PENDING_PRINT_KEY = "pending-print-order";

export const Route = createFileRoute("/checkout/confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search["session_id"] === "string" ? (search["session_id"] as string) : "",
  }),
  head: () => ({
    meta: [{ title: "Order Confirmation — Yorlens English School" }],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { session_id } = Route.useSearch();
  const { cart, completeCheckout, clearCart, addPrintOrder } = useStore();
  const getStatus = useServerFn(getStripeSessionStatus);
  const placePrintOrder = useServerFn(createPrintOrder);
  const [state, setState] = useState<"loading" | "paid" | "failed">("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const fulfilled = useRef(false);

  useEffect(() => {
    if (!session_id || fulfilled.current) return;
    fulfilled.current = true;
    (async () => {
      try {
        const result = await getStatus({ data: { sessionId: session_id } });
        setEmail(result.email);
        setAmount(result.amountTotal);
        if (result.paid) {
          const hasDigital = cart.some((i) => i.format === "digital");
          const hasPrint = cart.some((i) => i.format === "print");

          // Create the Lulu print job now that payment is confirmed.
          const pendingRaw = sessionStorage.getItem(PENDING_PRINT_KEY);
          if (hasPrint && pendingRaw) {
            sessionStorage.removeItem(PENDING_PRINT_KEY);
            try {
              const pending = JSON.parse(pendingRaw);
              const { record } = await placePrintOrder({ data: pending });
              addPrintOrder(record as PrintOrderRecord);
            } catch {
              toast.error("Payment succeeded, but the print job failed — contact hello@yorlens.com");
            }
          }

          if (hasDigital) completeCheckout();
          else if (hasPrint) clearCart();
          setState("paid");
        } else {
          setState("failed");
        }
      } catch {
        setState("failed");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session_id]);

  return (
    <section className="container-page section-y">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        {state === "loading" && (
          <>
            <LoaderCircle className="mx-auto size-10 animate-spin text-navy" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy">
              Confirming your payment…
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please wait while we verify your order with Stripe.
            </p>
          </>
        )}
        {state === "paid" && (
          <>
            <CheckCircle2 className="mx-auto size-10 text-brand-green" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy">
              Payment successful!
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatPrice(amount)} paid{email ? ` — receipt sent to ${email}` : ""}. Digital books
              are now in your library; print books are queued with our print partner.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="green" size="lg">
                <Link to="/account/library">Go to My Library</Link>
              </Button>
              <Button asChild variant="navySoft" size="lg">
                <Link to="/books">Keep Shopping</Link>
              </Button>
            </div>
          </>
        )}
        {state === "failed" && (
          <>
            <XCircle className="mx-auto size-10 text-destructive" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy">
              We couldn't confirm your payment
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If you were charged, contact us at hello@yorlens.com. Otherwise, try checkout again.
            </p>
            <Button asChild variant="navy" size="lg" className="mt-6">
              <Link to="/checkout">Back to Checkout</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
