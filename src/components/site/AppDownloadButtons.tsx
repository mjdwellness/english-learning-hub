import { Apple, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppDownloadButtons({
  className,
  layout = "row",
}: {
  className?: string;
  layout?: "row" | "column";
}) {
  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "column" ? "flex-col" : "flex-col sm:flex-row",
        className,
      )}
    >
      <a
        href="https://play.google.com/store/apps/details?id=com.yorlingo.com&hl=en_US"
        target="_blank"
        rel="noreferrer"
        className="flex h-13 items-center gap-3 rounded-xl bg-foreground px-5 text-background transition-transform hover:-translate-y-0.5"
      >
        <Play className="size-5 fill-brand-green text-brand-green" />
        <span className="text-left leading-tight">
          <span className="block text-[0.6rem] tracking-widest uppercase opacity-70">Get it on</span>
          <span className="block text-sm font-semibold">Google Play</span>
        </span>
      </a>
      <a
        href="https://apps.apple.com/us/app/yorlingo/id6788203388"
        target="_blank"
        rel="noreferrer"
        className="flex h-13 items-center gap-3 rounded-xl bg-foreground px-5 text-background transition-transform hover:-translate-y-0.5"
      >
        <Apple className="size-5" />
        <span className="text-left leading-tight">
          <span className="block text-[0.6rem] tracking-widest uppercase opacity-70">
            Download on the
          </span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </a>
    </div>
  );
}

export function QrCodePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid size-24 shrink-0 place-items-center rounded-xl border border-border bg-background p-2",
        className,
      )}
      aria-label="QR code to download Yorlingo"
    >
      <svg viewBox="0 0 29 29" className="size-full text-navy" role="presentation">
        {Array.from({ length: 29 }).map((_, y) =>
          Array.from({ length: 29 }).map((__, x) => {
            const finder =
              (x < 7 && y < 7) || (x > 21 && y < 7) || (x < 7 && y > 21)
                ? (x % 6 === 0 || y % 6 === 0 || (x > 1 && x < 5 && y > 1 && y < 5)) &&
                  x <= 28 &&
                  y <= 28
                : ((x * 7 + y * 13) % 5 < 2);
            return finder ? (
              <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
            ) : null;
          }),
        )}
      </svg>
    </div>
  );
}
