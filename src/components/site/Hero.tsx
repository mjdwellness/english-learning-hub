import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner-5-liv.jpg.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sky">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-[28rem] rounded-full bg-background/50 blur-3xl"
      />
      <div className="container-page relative py-10 lg:py-14">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border shadow-card">
          <img
            src={heroBanner.url}
            alt="Men 5 Liv Anglè-kreyòl ak tout pwononsiyasyon — Yorlens English School book collection"
            width={1080}
            height={608}
            className="w-full object-cover"
            fetchPriority="high"
          />
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center text-center">
          <h1 className="font-display text-3xl leading-[1.1] font-extrabold text-navy sm:text-4xl lg:text-5xl">
            Better English.
            <span className="text-brand-green"> Brighter</span> Future.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Practical books to help you learn English, improve your skills, and achieve your goals.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="navy" size="xl">
              <Link to="/books">Shop Books</Link>
            </Button>
            <Button asChild variant="navySoft" size="xl">
              <Link to="/bundles">Explore Bundles</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["A", "M", "K", "S"].map((initial, i) => (
                <span
                  key={initial}
                  className="grid size-10 place-items-center rounded-full border-2 border-background bg-navy text-xs font-bold text-navy-foreground"
                  style={{ opacity: 1 - i * 0.12 }}
                >
                  {initial}
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-star text-star" />
                ))}
              </div>
              <p className="mt-1 text-sm font-semibold text-navy">
                Trusted by English learners worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
