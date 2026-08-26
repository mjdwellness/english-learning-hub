import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky text-navy">
        <BookOpen className="size-5" />
      </span>
      <span className="min-w-0 font-display text-[1.05rem] leading-[1.05] font-extrabold text-navy">
        English
        <br />
        Books
      </span>
    </Link>
  );
}
