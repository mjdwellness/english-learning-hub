import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, levels, type Category, type Level } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FilterState {
  query: string;
  categories: Category[];
  levels: Level[];
  maxPrice: number;
  sort: "popular" | "price-asc" | "price-desc" | "rating";
}

interface BookFiltersProps {
  state: FilterState;
  onChange: (next: FilterState) => void;
  layout: "grid" | "list";
  onLayoutChange: (layout: "grid" | "list") => void;
  resultCount: number;
}

const sortLabels: Record<FilterState["sort"], string> = {
  popular: "Popular",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Highest rated",
};

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
        active
          ? "border-brand-green bg-brand-green/12 text-brand-green"
          : "border-border bg-background text-muted-foreground hover:border-navy/30 hover:text-navy",
      )}
    >
      {children}
    </button>
  );
}

export function BookFilters({
  state,
  onChange,
  layout,
  onLayoutChange,
  resultCount,
}: BookFiltersProps) {
  const toggle = <T,>(list: T[], value: T) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const hasFilters =
    state.query || state.categories.length > 0 || state.levels.length > 0 || state.maxPrice < 20;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={state.query}
            onChange={(e) => onChange({ ...state, query: e.target.value })}
            placeholder="Search by title or topic..."
            aria-label="Search books"
            className="h-11 rounded-xl bg-surface pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="sort">
            Sort by
          </label>
          <select
            id="sort"
            value={state.sort}
            onChange={(e) => onChange({ ...state, sort: e.target.value as FilterState["sort"] })}
            className="h-11 min-w-0 flex-1 rounded-xl border border-input bg-background px-3 text-sm font-semibold text-navy lg:flex-none"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                Sort by: {label}
              </option>
            ))}
          </select>
          <div className="hidden shrink-0 items-center gap-1 rounded-xl border border-input p-1 sm:flex">
            <button
              type="button"
              onClick={() => onLayoutChange("grid")}
              aria-label="Grid view"
              className={cn(
                "grid size-9 place-items-center rounded-lg",
                layout === "grid" ? "bg-sky text-navy" : "text-muted-foreground",
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => onLayoutChange("list")}
              aria-label="List view"
              className={cn(
                "grid size-9 place-items-center rounded-lg",
                layout === "list" ? "bg-sky text-navy" : "text-muted-foreground",
              )}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-navy uppercase">
            <SlidersHorizontal className="size-3.5" /> Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Chip
                key={category}
                active={state.categories.includes(category)}
                onClick={() => onChange({ ...state, categories: toggle(state.categories, category) })}
              >
                {category}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wide text-navy uppercase">Level</p>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Chip
                key={level}
                active={state.levels.includes(level)}
                onClick={() => onChange({ ...state, levels: toggle(state.levels, level) })}
              >
                {level}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[auto_minmax(0,20rem)] sm:items-center">
          <p className="text-xs font-bold tracking-wide text-navy uppercase">
            Max price: ${state.maxPrice}
          </p>
          <input
            type="range"
            min={5}
            max={20}
            step={1}
            value={state.maxPrice}
            aria-label="Maximum price"
            onChange={(e) => onChange({ ...state, maxPrice: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-sky-strong accent-navy"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? "book" : "books"}
        </p>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onChange({ query: "", categories: [], levels: [], maxPrice: 20, sort: "popular" })
            }
          >
            <X /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
