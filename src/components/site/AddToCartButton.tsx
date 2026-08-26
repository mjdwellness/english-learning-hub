import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useStore, type CartItemKind } from "@/lib/store";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  itemId: string;
  kind?: CartItemKind;
  label?: string;
  itemTitle: string;
}

export function AddToCartButton({
  itemId,
  kind = "book",
  label = "Add to Cart",
  itemTitle,
  variant = "navy",
  ...props
}: AddToCartButtonProps) {
  const { addToCart, cart, isOwned } = useStore();
  const inCart = cart.some((i) => i.id === itemId);
  const owned = kind === "book" && isOwned(itemId);

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
        addToCart(itemId, kind);
        toast.success(`${itemTitle} added to cart`);
      }}
      {...props}
    >
      <ShoppingCart /> {inCart ? "Added — add again" : label}
    </Button>
  );
}
