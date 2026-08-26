import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import {
  AppDownloadButtons,
  QrCodePlaceholder,
} from "@/components/site/AppDownloadButtons";
import { YorlingoWordmark, yorlingoFeatures } from "@/components/site/YorlingoPromo";
import mascots from "@/assets/yorlingo-mascots.png";
import phoneMockup from "@/assets/yorlingo-phone.png";

export const Route = createFileRoute("/yorlingo")({
  head: () => ({
    meta: [
      { title: "Yorlingo — Learn English the Fun Way" },
      {
        name: "description",
        content:
          "Yorlingo turns English practice into a game: interactive lessons, quiz battles, tournaments, daily challenges and rewards. Free on iOS and Android.",
      },
      { property: "og:title", content: "Yorlingo — Learn English the Fun Way" },
      {
        property: "og:description",
        content:
          "Lessons, quiz battles, challenges and rewards that make learning English exciting. Download Yorlingo free.",
      },
    ],
  }),
  component: YorlingoPage,
});

function YorlingoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sky">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <YorlingoWordmark />
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-extrabold text-navy sm:text-5xl">
              Learn English
              <br />
              the <span className="text-brand-green">Fun Way!</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
              Lessons, quiz battles, challenges and rewards that make learning exciting.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <AppDownloadButtons />
              <QrCodePlaceholder />
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-star text-star" />
                ))}
              </div>
              <p className="text-sm font-semibold text-navy">Loved by learners on iOS & Android</p>
            </div>
          </div>

          <div className="flex items-end justify-center">
            <img
              src={phoneMockup}
              alt="Yorlingo app screens showing lessons, quiz battles and progress"
              width={912}
              height={1104}
              className="w-[60%] max-w-xs drop-shadow-2xl"
            />
            <img
              src={mascots}
              alt="Yorlingo mascots waving"
              loading="lazy"
              width={1008}
              height={912}
              className="w-[48%] max-w-[12rem] -ml-8"
            />
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
          Everything inside Yorlingo
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {yorlingoFeatures.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-green/12 text-brand-green">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid items-center gap-8 rounded-3xl bg-navy p-8 text-navy-foreground sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Books for structure. Yorlingo for daily practice.
            </h2>
            <p className="mt-3 max-w-xl text-sm opacity-80 sm:text-base">
              Study a chapter, then reinforce it with lessons, quiz battles and challenges in the
              app. Download Yorlingo free and keep your streak alive.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <AppDownloadButtons />
              <QrCodePlaceholder className="bg-background" />
            </div>
          </div>
          <img
            src={mascots}
            alt="Yorlingo mascots celebrating"
            loading="lazy"
            width={1008}
            height={912}
            className="mx-auto w-2/3 max-w-xs lg:w-full"
          />
        </div>
      </section>
    </>
  );
}
