import type { CSSProperties, ReactNode } from "react";
import { CopyEmail } from "@/components/ui/copy-email";
import { DoorArt, FanlightBars } from "@/components/ui/door";
import { DublinTime } from "@/components/ui/dublin-time";
import { GithubActivity } from "@/components/ui/github-activity";
import { ArrowUpRightIcon, InterestIcon, SunIcon } from "@/components/ui/icons";
import { MiniPiano } from "@/components/ui/mini-piano";
import { portfolio, type Interest } from "@/data/portfolio";
import { splitHighlights } from "@/lib/highlight";

const projectDoors = ["var(--tomato)", "var(--clover)", "var(--cobalt)", "var(--plum)"];
const markColors = ["var(--marigold)", "var(--sea)", "var(--blush)"];
const timelineColors = ["var(--tomato)", "var(--marigold)", "var(--cobalt)", "var(--clover)", "var(--plum)"];
const skillTints: Record<string, string> = {
  Programming: "var(--cobalt)",
  "Frameworks & Tools": "var(--clover)",
  Other: "var(--marigold)",
};
const hobbyIcons: Record<string, Interest["icon"]> = {
  Football: "football",
  Reading: "reading",
  "Playing Piano": "piano",
};

const cardClassName = "reveal relative rounded-[1.75rem] p-6 sm:p-8";
const paperCardClassName = `${cardClassName} border border-line bg-card`;
const cardTitleClassName = "display text-[1.65rem] leading-tight font-semibold sm:text-[1.85rem]";

const cssVars = (vars: Record<string, string>) => vars as CSSProperties;

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[0.7rem] font-bold tracking-[0.2em] uppercase ${className}`}>{children}</p>;
}

export function About() {
  const bio = splitHighlights(portfolio.about, portfolio.aboutHighlights);

  return (
    <section aria-labelledby="about-heading" className="scroll-mt-16" id="about">
      <div className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-28">
        <header className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow className="text-tomato-ink">About</Eyebrow>
            <h2 className="display mt-3 text-[clamp(2.6rem,7vw,4.75rem)] leading-[0.95] font-semibold" id="about-heading">
              A little about me
            </h2>
          </div>
          <p className="font-hand text-2xl text-ink-soft sm:mb-2 sm:-rotate-2">everything, all in one place ↓</p>
        </header>

        <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
          {/* Bio */}
          <article className={`${paperCardClassName} flex flex-col md:col-span-6 lg:col-span-7`}>
            <Eyebrow className="text-tomato-ink">Hello there</Eyebrow>
            <p className="mt-5 font-serif text-[1.3rem] leading-[1.55] sm:text-[1.6rem]">
              {bio.map((part) =>
                part.highlight === undefined ? (
                  part.text
                ) : (
                  <mark
                    className="marker"
                    key={part.text}
                    style={cssVars({ "--mark": markColors[part.highlight % markColors.length] })}
                  >
                    {part.text}
                  </mark>
                ),
              )}
            </p>
            <p className="mt-auto pt-6 font-hand text-3xl text-tomato-ink">
              <span className="inline-block -rotate-3">— Ryan</span>
            </p>
          </article>

          {/* Currently */}
          <article className={`${cardClassName} flex flex-col bg-marigold text-night md:col-span-6 lg:col-span-5`}>
            <div className="flex items-center justify-between gap-4">
              <h3 className={cardTitleClassName}>Currently</h3>
              <SunIcon className="spin-slow size-9 text-night/80" />
            </div>
            <dl className="mt-5 divide-y divide-night/15 border-y border-night/15">
              {portfolio.currently.map((item) => (
                <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-4 py-3.5" key={item.label}>
                  <dt className="text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">{item.label}</dt>
                  <dd className="font-serif text-lg leading-snug font-semibold sm:text-xl">{item.value}</dd>
                </div>
              ))}
            </dl>
            <DublinTime className="mt-auto flex items-center gap-2 pt-6 text-[0.95rem]" />
          </article>

          {/* Projects */}
          <div
            className="flex scroll-mt-24 flex-col gap-1 pt-8 sm:flex-row sm:items-end sm:justify-between md:col-span-6 lg:col-span-12"
            id="projects"
          >
            <h3 className="display text-[clamp(2rem,4.5vw,3rem)] leading-none font-semibold">
              Things I&apos;ve been exploring
            </h3>
            <p className="font-hand text-2xl text-ink-soft">four doors, four projects</p>
          </div>

          {portfolio.projects.map((project, index) => (
            <article
              className="arch-card reveal flex flex-col md:col-span-3 lg:col-span-6 xl:col-span-3"
              key={project.name}
              style={cssVars({ "--door": projectDoors[index % projectDoors.length] })}
            >
              <FanlightBars className="arch-card__fanlight" />
              <span aria-hidden="true" className="arch-card__hub">
                No. {index + 1}
              </span>
              <span aria-hidden="true" className="arch-card__transom" />

              <h4 className="display text-[1.45rem] leading-[1.15] font-semibold">{project.name}</h4>
              <ul aria-label="Built with" className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.split(" · ").map((tool) => (
                  <li
                    className="rounded-full border border-cream/40 px-2.5 py-1 text-[0.7rem] leading-none font-semibold tracking-wide"
                    key={tool}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.95rem] leading-relaxed">{project.description}</p>
              <ul className="mt-auto space-y-2.5 border-t border-cream/30 pt-5 text-sm leading-snug">
                {project.details.map((detail) => (
                  <li className="flex gap-2.5" key={detail}>
                    <span aria-hidden="true" className="mt-px shrink-0 font-semibold">
                      →
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Experience */}
          <article
            className={`${paperCardClassName} scroll-mt-24 md:col-span-6 lg:col-span-7`}
            id="experience"
          >
            <Eyebrow className="text-cobalt dark:text-sea">Work</Eyebrow>
            <h3 className={`${cardTitleClassName} mt-2`}>Learning on the job</h3>
            <ol className="relative mt-7">
              {portfolio.experience.map((job, index) => (
                <li
                  className="relative grid gap-x-6 gap-y-1 pb-6 pl-9 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto]"
                  key={`${job.company}-${job.role}`}
                >
                  {index < portfolio.experience.length - 1 && (
                    <span aria-hidden="true" className="absolute top-5 bottom-0 left-[0.55rem] w-px bg-line-strong" />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 left-0 size-[1.15rem] rounded-full border-[3px] border-card"
                    style={{ backgroundColor: timelineColors[index % timelineColors.length] }}
                  />
                  <div>
                    <h4 className="font-serif text-lg leading-snug font-semibold sm:text-xl">{job.company}</h4>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                      {job.role}
                      {job.note && (
                        <span
                          className="chip rounded-full px-2 py-0.5 text-[0.7rem] font-semibold text-ink"
                          style={cssVars({ "--tint": "var(--plum)" })}
                        >
                          {job.note}
                        </span>
                      )}
                    </p>
                  </div>
                  {job.date && (
                    <p className="flex items-center gap-2 text-sm text-ink-soft sm:justify-end sm:pt-1 sm:text-right">
                      {job.date}
                      {job.date.includes("Present") && (
                        <span className="rounded-full bg-clover px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-cream uppercase">
                          Now
                        </span>
                      )}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </article>

          {/* Education */}
          <article
            className={`${cardClassName} scroll-mt-24 bg-blush text-night md:col-span-6 lg:col-span-5`}
            id="education"
          >
            <Eyebrow className="opacity-75">Study</Eyebrow>
            <h3 className={`${cardTitleClassName} mt-2`}>What I&apos;m studying</h3>
            <div className="mt-6 divide-y divide-dashed divide-night/25">
              {portfolio.educationHistory.map((item) => {
                const points = item.detail.match(/^(\d+) points$/)?.[1];

                return (
                  <div className="py-5 first:pt-0 last:pb-0" key={item.institution}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-serif text-xl font-semibold">{item.institution}</h4>
                      <p className="text-sm font-medium">{item.date}</p>
                    </div>
                    <p className="mt-1 text-sm">{item.course}</p>
                    {item.progress && (
                      <div
                        aria-label={`Year ${item.progress.year} of ${item.progress.of}`}
                        className="mt-4 flex gap-1.5"
                        role="img"
                      >
                        {Array.from({ length: item.progress.of }, (_, year) => (
                          <span
                            className={`h-2.5 flex-1 rounded-full ${
                              year < item.progress.year ? "bg-night" : "border border-night/35"
                            } ${year === item.progress.year - 1 ? "status-dot" : ""}`}
                            key={year}
                          />
                        ))}
                      </div>
                    )}
                    {points ? (
                      <p className="mt-4 flex items-end gap-3">
                        <span className="display text-6xl leading-[0.8] font-semibold">{points}</span>
                        <span className="text-sm leading-tight font-medium">
                          points
                          <span className="block text-xs opacity-75">out of a possible 625</span>
                        </span>
                      </p>
                    ) : (
                      <p className="mt-4 text-sm font-semibold">{item.detail}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </article>

          {/* Skills */}
          <article className={`${paperCardClassName} md:col-span-6 lg:col-span-12 xl:col-span-6`}>
            <Eyebrow className="text-clover dark:text-marigold">Toolkit</Eyebrow>
            <h3 className={`${cardTitleClassName} mt-2`}>What I work with</h3>
            <div className="mt-6 space-y-5">
              {Object.entries(portfolio.skills).map(([category, skills]) => (
                <div key={category} style={cssVars({ "--tint": skillTints[category] ?? "var(--sea)" })}>
                  <h4 className="text-xs font-bold tracking-[0.16em] text-ink-soft uppercase">{category}</h4>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <li className="chip rounded-full px-3 py-1.5 text-sm font-medium" key={skill}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <GithubActivity className="reveal md:col-span-3 lg:col-span-6 xl:col-span-3" username="cullenry" />

          {/* Hobbies */}
          <article className={`${cardClassName} flex flex-col bg-cobalt text-cream [--focus:var(--cream)] md:col-span-3 lg:col-span-6 xl:col-span-3`}>
            <h3 className={cardTitleClassName}>Off the clock</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {portfolio.hobbies.map((hobby) => (
                <li
                  className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1.5 text-sm font-semibold"
                  key={hobby}
                >
                  {hobbyIcons[hobby] && <InterestIcon className="size-4" name={hobbyIcons[hobby]} />}
                  {hobby}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <MiniPiano />
              <p className="mt-3 font-hand text-xl leading-tight">go on, play something ♪</p>
            </div>
          </article>

          {/* Contact */}
          <article
            className={`${cardClassName} scroll-mt-24 overflow-hidden bg-tomato text-cream [--focus:var(--cream)] sm:p-12 md:col-span-6 lg:col-span-12`}
            id="contact"
          >
            <div className="relative z-10 max-w-2xl">
              <p className="font-hand text-2xl sm:text-3xl">
                <span className="inline-block -rotate-2">my door&apos;s always open</span>
              </p>
              <h3 className="display mt-2 text-[clamp(3.5rem,11vw,7.5rem)] leading-[0.9] font-semibold">
                Let&apos;s talk.
              </h3>
              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed sm:text-xl">
                Whether it&apos;s a project, an opportunity, or you just want to say hello, feel free to get in touch.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-cream px-6 text-base font-semibold text-night transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--night)]"
                  href={portfolio.links.email.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {portfolio.email}
                  <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only"> (opens Gmail in a new tab)</span>
                </a>
                <CopyEmail
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border-[1.5px] border-cream/70 px-5 text-sm font-semibold transition-colors hover:border-cream hover:bg-cream/10"
                  email={portfolio.email}
                />
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                {[portfolio.links.github, portfolio.links.linkedin].map((link) => (
                  <a
                    className="inline-flex items-center gap-1 underline decoration-cream/40 underline-offset-4 transition-colors hover:decoration-cream"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <ArrowUpRightIcon className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="door pointer-events-none absolute right-[7%] bottom-0 hidden w-[11.5rem] lg:block xl:right-[10%]"
              data-open="true"
              style={cssVars({ "--door": "var(--cobalt)", "--leaf-open": "76deg" })}
            >
              <DoorArt number="@">
                <span className="door__label">come on in!</span>
              </DoorArt>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
