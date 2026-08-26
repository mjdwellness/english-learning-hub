import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBooks from "@/assets/hero-books.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sky">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-[28rem] rounded-full bg-background/50 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <h1 className="font-display text-4xl leading-[1.05] font-extrabold text-navy sm:text-5xl lg:text-6xl">
            Better English.
            <br />
            <span className="text-brand-green">Brighter</span> Future.
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
            Practical books to help you learn English, improve your skills, and achieve your goals.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            <div>
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

        <div className="relative">
          <img
            src={heroBooks}
            alt="Speak English Confidently, English Grammar Made Easy and English Writing Step by Step books on a display stand"
            width={1200}
            height={912}
            className="w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
