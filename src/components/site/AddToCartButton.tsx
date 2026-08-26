import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useStore, type CartItemKind, type CartItemFormat } from "@/lib/store";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  itemId: string;
  kind?: CartItemKind;
  format?: CartItemFormat;
  label?: string;
  itemTitle: string;
}

export function AddToCartButton({
  itemId,
  kind = "book",
  format = "digital",
  label = "Add to Cart",
  itemTitle,
  variant = "navy",
  ...props
}: AddToCartButtonProps) {
  const { addToCart, cart, isOwned } = useStore();
  const resolvedFormat = kind === "bundle" ? "digital" : format;
  const inCart = cart.some((i) => i.id === itemId && i.format === resolvedFormat);
  const owned = kind === "book" && resolvedFormat === "digital" && isOwned(itemId);

  if (owned) {
    return (
      <Button variant="greenSoft" disabled {...props}>
        <Check /> In your library
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={() => {
        addToCart(itemId, kind, resolvedFormat);
        toast.success(`${itemTitle} added to cart`);
      }}
      {...props}
    >
      <ShoppingCart /> {inCart ? "Added — add again" : label}
    </Button>
  );
}
