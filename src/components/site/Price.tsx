import { formatPrice } from "@/lib/store";
import { cn } from "@/lib/utils";

interface PriceProps {
  value: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-3xl",
} as const;

export function Price({ value, compareAt, size = "sm", className }: PriceProps) {
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-display font-extrabold text-navy", sizes[size])}>
        {formatPrice(value)}
      </span>
      {compareAt && compareAt > value && (
        <span className="text-sm text-muted-foreground line-through">{formatPrice(compareAt)}</span>
      )}
    </span>
  );
}
