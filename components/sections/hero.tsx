import type { CSSProperties } from "react";
import { DoorStreet } from "@/components/sections/door-street";
import { ArrowUpRightIcon, PinIcon } from "@/components/ui/icons";
import { ProfileLink } from "@/components/ui/profile-link";
import { portfolio } from "@/data/portfolio";
import { splitHighlights } from "@/lib/highlight";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const gulls = [
  { x: "58%", y: "5%", size: "1.6rem", className: "" },
  { x: "65%", y: "2.5%", size: "1.1rem", className: "" },
  { x: "7%", y: "70%", size: "1.4rem", className: "max-sm:hidden" },
];

const stars = [
  { x: "4%", y: "12%", delay: "0s" },
  { x: "11%", y: "64%", delay: "1.1s" },
  { x: "24%", y: "7%", delay: "2.3s" },
  { x: "41%", y: "3%", delay: "0.6s" },
  { x: "52%", y: "58%", delay: "1.8s" },
  { x: "58%", y: "17%", delay: "0.3s" },
  { x: "67%", y: "42%", delay: "2.8s" },
  { x: "93%", y: "56%", delay: "1.4s" },
  { x: "97%", y: "8%", delay: "0.9s" },
];

/** Sun, gulls and (after dark) a crescent moon and stars above the street. */
function HeroSky() {
  return (
    <div aria-hidden="true" className="sky">
      <span className="sky__sun" />
      {gulls.map((gull) => (
        <svg
          className={`sky__gull ${gull.className}`}
          fill="none"
          key={gull.x}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
          style={{ "--x": gull.x, "--y": gull.y, "--size": gull.size } as CSSProperties}
          viewBox="0 0 24 10"
        >
          <path d="M1 7c3-4 7-4 11 0 4-4 8-4 11 0" />
        </svg>
      ))}
      {stars.map((star) => (
        <span
          className="sky__star"
          key={star.x}
          style={{ "--x": star.x, "--y": star.y, "--delay": star.delay } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const introduction = splitHighlights(portfolio.introduction, ["good systems"]);

  return (
    <section aria-labelledby="hero-heading" className="relative isolate scroll-mt-24 overflow-hidden" id="top">
      <HeroSky />
      <div className="mx-auto max-w-[76rem] px-5 pt-12 sm:px-8 sm:pt-16 lg:pt-20">
        <p className="rise font-hand text-[2rem] leading-none text-tomato-ink sm:text-[2.6rem]" style={delay(0)}>
          <span className="inline-block -rotate-3">
            <span lang="ga">Dia duit!</span> I&apos;m
          </span>
        </p>

        <h1
          className="rise display mt-3 text-[clamp(3.7rem,13.4vw,10.25rem)] leading-[0.9] font-semibold"
          id="hero-heading"
          style={delay(80)}
        >
          Ryan <span className="italic">Cullen</span>
          <span className="text-tomato">.</span>
        </h1>

        <p
          className="rise mt-6 inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] text-ink-soft uppercase"
          style={delay(160)}
        >
          <PinIcon className="size-4 text-tomato-ink" />
          Based in {portfolio.location}
        </p>

        <div className="mt-10 grid gap-9 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <p className="rise font-serif text-[1.35rem] leading-[1.5] sm:text-[1.7rem]" style={delay(240)}>
              {introduction.map((part) =>
                part.highlight === undefined ? (
                  part.text
                ) : (
                  <span className="squiggle" key={part.text}>
                    {part.text}
                  </span>
                ),
              )}
            </p>
            <p className="rise mt-5 max-w-xl text-[0.95rem] leading-7 font-medium sm:text-base" style={delay(320)}>
              Studying{" "}
              <a
                className="group font-semibold whitespace-nowrap underline decoration-marigold decoration-[3px] underline-offset-[5px] transition-colors hover:text-tomato-ink hover:decoration-tomato"
                href={portfolio.education.courseUrl}
                rel="noreferrer"
                target="_blank"
              >
                {portfolio.education.degree}
                <ArrowUpRightIcon className="ml-0.5 inline-block size-3.5 align-[0.05em] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only"> course page (opens in a new tab)</span>
              </a>{" "}
              at {portfolio.education.institution}.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <p
              className="rise inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong bg-card px-4 py-2 text-sm font-medium"
              style={delay(400)}
            >
              <span aria-hidden="true" className="status-dot size-2 rounded-full bg-clover" />
              {portfolio.status}
            </p>
            <div aria-label="Profile links" className="rise flex flex-wrap gap-3" role="group" style={delay(480)}>
              <ProfileLink link={portfolio.links.github} variant="primary" />
              <ProfileLink link={portfolio.links.linkedin} />
              <ProfileLink link={portfolio.links.cv} />
            </div>
          </div>
        </div>
      </div>

      <DoorStreet className="mt-10 sm:mt-12" />
    </section>
  );
}
