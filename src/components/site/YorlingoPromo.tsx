import { Link } from "@tanstack/react-router";
import { Award, Coins, Flame, Gamepad2, LineChart, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import phoneMockup from "@/assets/yorlingo-phone.png";
import mascots from "@/assets/yorlingo-mascots.png.asset.json";
import { AppDownloadButtons, QrCodePlaceholder } from "./AppDownloadButtons";

export const yorlingoFeatures = [
  { icon: Gamepad2, title: "Interactive Lessons", text: "Learn English step by step." },
  { icon: Trophy, title: "Quiz Battles", text: "Challenge other learners." },
  { icon: Award, title: "Tournaments", text: "Compete and win rewards." },
  { icon: Flame, title: "Daily Challenges", text: "Build consistent learning habits." },
  { icon: Coins, title: "Earn Rewards", text: "Collect coins, XP and other rewards." },
  { icon: LineChart, title: "Track Progress", text: "See how your English improves over time." },
];

export function YorlingoWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Yor</span>
      <span className="font-display text-3xl font-extrabold text-brand-green sm:text-4xl">
        lingo
      </span>
    </span>
  );
}

export function YorlingoPromo() {
  return (
    <section className="container-page">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-sky p-6 shadow-card sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <h2 className="font-display text-3xl leading-tight font-extrabold text-navy sm:text-4xl">
              Learn. Play. Improve.
              <br />
              All in one app.
            </h2>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
              Take your English learning to the next level with Yorlingo — fun lessons, quiz
              battles, challenges, and rewards that keep you motivated every day.
            </p>

            <YorlingoWordmark className="mt-6 block" />
            <p className="mt-1 text-sm font-semibold text-brand-green">
              Learn English the fun way!
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {yorlingoFeatures.map(({ icon: Icon, title }) => (
                <li key={title} className="flex items-center gap-2.5 text-sm font-semibold text-navy">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-background text-brand-green">
                    <Icon className="size-4" />
                  </span>
                  {title}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <AppDownloadButtons />
              <QrCodePlaceholder />
            </div>

            <Button asChild variant="green" size="xl" className="mt-6">
              <Link to="/yorlingo">Download Yorlingo</Link>
            </Button>
          </div>

          <div className="relative flex items-end justify-center">
            <img
              src={phoneMockup}
              alt="Yorlingo app home screen with daily goal, lessons and quiz battles"
              loading="lazy"
              width={912}
              height={1104}
              className="w-[70%] max-w-xs drop-shadow-2xl"
            />
            <img
              src={mascots.url}
              alt="Yorlingo mascots waving"
              loading="lazy"
              width={1008}
              height={912}
              className="w-[45%] max-w-[11rem] -ml-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
