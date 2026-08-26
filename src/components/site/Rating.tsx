import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, count, size = "sm", className }: RatingProps) {
  const starSize = size === "sm" ? "size-3.5" : "size-4";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i <= Math.round(value) ? "fill-star text-star" : "fill-border text-border",
            )}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs font-medium text-muted-foreground">({count})</span>
      )}
      <span className="sr-only">
        Rated {value} out of 5{count !== undefined ? ` from ${count} reviews` : ""}
      </span>
    </div>
  );
}
