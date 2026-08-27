import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/yorlens-logo.webp.asset.json";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center", className)}>
      <img
        src={logoAsset.url}
        alt="Yorlens English School"
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
}
