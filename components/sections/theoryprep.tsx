import Image from "next/image";
import { Quiz } from "@/components/ui/quiz";
import { portfolio, theoryPrep } from "@/data/portfolio";

function LPlate({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
      <rect fill="var(--tp-green)" height="32" rx="7" width="32" />
      <rect fill="#fff" height="20" rx="2.5" width="20" x="6" y="6" />
      <path d="M12 10h3.4v9.2H21V22h-9z" fill="#c8102e" />
    </svg>
  );
}

export function TheoryPrepFeature() {
  const project = portfolio.projects[0];
  const maxTopic = Math.max(...theoryPrep.topics.map((topic) => topic.count));

  return (
    <section aria-labelledby="theoryprep-heading" className="supplement relative z-1 mt-6 outline-none" id="theoryprep" tabIndex={-1}>
      <div aria-hidden="true" className="perforated" />
      <div className="wrap pt-8 pb-16 font-sans sm:pt-10 lg:pb-24">
        {/* Supplement masthead */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[var(--tp-ink)] pb-4">
          <p className="flex items-center gap-2.5 text-2xl font-bold tracking-[-0.03em]">
            <LPlate className="size-8" />
            <span>
              Theory<span className="text-[var(--tp-green)]">Prep</span>
            </span>
          </p>
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--tp-muted)] uppercase [font-stretch:80%]">
            Pull-out supplement <span className="font-mono tracking-normal">· p.02</span>
          </p>
        </div>

        <div className="reveal grid gap-10 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-[var(--tp-green)]">{project.kicker}</p>
            <h2
              className="mt-3 text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[0.92] font-bold tracking-[-0.045em]"
              id="theoryprep-heading"
            >
              Free practice for the test
              <span className="block text-[var(--tp-red)]">every learner has to pass.</span>
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-[var(--tp-muted)]">{project.summary}</p>
          </div>
          <div className="relative self-end lg:col-span-5">
            <Image
              alt="TheoryPrep's mascot: a shaggy dog in a green bandana driving a red convertible with an L-plate."
              className="h-auto w-full drop-shadow-[0_18px_18px_rgb(23_35_29/0.12)]"
              height={494}
              sizes="(min-width: 1024px) 38vw, 90vw"
              src="/projects/theoryprep-mascot.webp"
              width={900}
            />
          </div>
        </div>

        {/* Stat strip */}
        <dl className="mt-12 grid grid-cols-2 border-y-2 border-[var(--tp-ink)] lg:grid-cols-4">
          {theoryPrep.stats.map((stat, index) => (
            <div
              className={`reveal flex flex-col-reverse justify-end gap-2 border-[var(--tp-line)] py-5 pr-3 ${index % 2 === 1 ? "border-l pl-4 sm:pl-5" : ""} ${index >= 2 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l lg:pl-5" : ""}`}
              key={stat.label}
            >
              <dt className="text-sm leading-snug text-[var(--tp-muted)]">{stat.label}</dt>
              <dd className="text-[clamp(2.8rem,6.5vw,4.4rem)] leading-none font-bold tracking-[-0.04em] text-[var(--tp-green)] [font-stretch:80%]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* What I built */}
          <div className="reveal lg:col-span-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em]">What I built</h3>
            <ul className="mt-5 space-y-3">
              {project.details.map((detail) => (
                <li className="flex gap-3 leading-relaxed" key={detail}>
                  <span aria-hidden="true" className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--tp-green-soft)] text-xs font-bold text-[var(--tp-green)]">
                    ✓
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-[var(--tp-line)] bg-[var(--tp-line)] text-sm sm:grid-cols-2">
              {[
                ["Role", project.role],
                ["Stack", project.stack.join(" · ")],
                ["Status", project.outcome ?? "Live"],
                ["Independence", "Based on official RSA material. Not affiliated with or endorsed by the RSA."],
              ].map(([term, value]) => (
                <div className="bg-[var(--tp-card)] p-4" key={term}>
                  <dt className="text-xs font-semibold tracking-[0.1em] text-[var(--tp-muted)] uppercase">{term}</dt>
                  <dd className="mt-1 leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Quiz */}
          <div className="reveal lg:col-span-6">
            <Quiz ctaHref={theoryPrep.url} questions={theoryPrep.quiz} />
            <p className="mt-3 text-xs leading-relaxed text-[var(--tp-muted)]">
              Sample questions written for this page in the style of the test. They aren&apos;t from TheoryPrep&apos;s bank or the official RSA material.
            </p>
          </div>
        </div>

        {/* Screens and topic breakdown */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="reveal flex justify-center gap-4 sm:gap-6 lg:col-span-6">
            <figure className="w-[46%] max-w-64">
              <Image
                alt="A TheoryPrep practice question on a phone, answered: the wrong choice is marked in red, the correct one in green, with an explanation below."
                className="h-auto w-full rounded-[22px] border-[5px] border-[#17231d] dark:border-[#33433a] shadow-[0_20px_40px_-20px_rgb(23_35_29/0.45)]"
                height={1688}
                sizes="(min-width: 1024px) 16rem, 46vw"
                src="/projects/theoryprep-question.webp"
                width={780}
              />
              <figcaption className="mt-3 text-center text-xs text-[var(--tp-muted)]">Instant feedback, every question</figcaption>
            </figure>
            <figure className="mt-12 w-[46%] max-w-64">
              <Image
                alt="TheoryPrep's mock test screen on a phone: a full mock of 40 questions in 45 minutes, plus 20- and 10-question quick tests."
                className="h-auto w-full rounded-[22px] border-[5px] border-[#17231d] dark:border-[#33433a] shadow-[0_20px_40px_-20px_rgb(23_35_29/0.45)]"
                height={1688}
                sizes="(min-width: 1024px) 16rem, 46vw"
                src="/projects/theoryprep-mock.webp"
                width={780}
              />
              <figcaption className="mt-3 text-center text-xs text-[var(--tp-muted)]">Mock exams against the clock</figcaption>
            </figure>
          </div>

          <figure className="reveal lg:col-span-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em]">Where the 805 questions sit</h3>
            <figcaption className="mt-1 text-sm text-[var(--tp-muted)]">Questions per topic area in TheoryPrep&apos;s bank, October 2026.</figcaption>
            <table className="mt-6 w-full border-collapse text-sm">
              <caption className="sr-only">Number of practice questions in each topic area</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Topic</th>
                  <th scope="col">Questions</th>
                </tr>
              </thead>
              <tbody>
                {theoryPrep.topics.map((topic) => (
                  <tr className="grid grid-cols-1 gap-x-3 gap-y-0.5 py-1 sm:grid-cols-[16rem_1fr] sm:items-center sm:py-[3px]" key={topic.name}>
                    <th className="text-left leading-snug font-normal" scope="row">
                      {topic.name}
                    </th>
                    <td className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-4 rounded-r-[4px] bg-[var(--tp-green)]"
                        style={{ width: `${(topic.count / maxTopic) * 82}%` }}
                      />
                      <span className="tnum font-mono text-xs text-[var(--tp-muted)]">{topic.count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        </div>

        {/* Call to action */}
        <div className="reveal mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--tp-green)] p-6 text-white sm:flex-row sm:items-center sm:p-9 dark:text-[#0f2219]">
          <p className="max-w-xl text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-bold tracking-[-0.03em]">
            Free to start, with no account needed. Go and pass the thing.
          </p>
          <a
            className="inline-flex min-h-13 shrink-0 items-center gap-3 rounded-lg bg-[var(--tp-card)] px-6 text-lg font-bold text-[var(--tp-ink)] shadow-[0_4px_0_rgb(0_0_0/0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            href={theoryPrep.url}
            rel="noreferrer"
            target="_blank"
          >
            Visit TheoryPrep <span aria-hidden="true">↗</span>
            <span className="sr-only">(theoryprep.ie, opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="perforated rotate-180" />
    </section>
  );
}
