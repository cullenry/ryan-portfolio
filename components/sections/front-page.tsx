import Image from "next/image";
import Link from "next/link";
import { portfolio, theoryPrep } from "@/data/portfolio";
import { editionNumber, formatEditionDate } from "@/lib/site";

export function FrontPage({ printedAt }: { printedAt: Date }) {
  const lead = portfolio.projects[0];

  return (
    <section aria-labelledby="nameplate" className="relative z-1 outline-none" id="top" tabIndex={-1}>
      <div className="wrap pt-5 sm:pt-7">
        {/* Edition line */}
        <div className="press-fade grid grid-cols-2 items-baseline gap-2 pb-2 font-mono text-[0.7rem] tracking-wide text-ink-2 uppercase sm:grid-cols-3 sm:text-xs">
          <p>
            Vol. II <span className="text-ink-3">·</span> No. {editionNumber(printedAt)}
          </p>
          <p className="text-right sm:text-center">
            <time dateTime={printedAt.toISOString().slice(0, 10)}>{formatEditionDate(printedAt)}</time>
          </p>
          <p className="hidden text-right sm:block">Dublin edition</p>
        </div>
        <div className="press-rule rule" />

        <h1
          className="press-ink press-d1 -ml-[0.04em] pt-[0.16em] pb-[0.24em] sm:pb-[0.3em] font-serif text-[clamp(4.6rem,17.2vw,15.5rem)] leading-[0.82] font-[400] tracking-[-0.045em]"
          id="nameplate"
        >
          <span className="block sm:inline">Ryan</span> <span className="block font-[300] italic sm:inline">Cullen</span>
        </h1>

        <div className="press-rule press-d2 rule-double" />

        {/* Strapline */}
        <div className="press-fade press-d3 col-rules lg-col-rules grid lg:grid-cols-12">
          <p className="py-4 font-sans text-[0.95rem] leading-snug font-medium lg:col-span-4 lg:pr-6">
            <a className="link" href={portfolio.education.courseUrl} rel="noreferrer" target="_blank">
              {portfolio.education.degree}
              <span className="sr-only"> course page (opens in a new tab)</span>
            </a>
            <br />
            <span className="text-ink-2">
              {portfolio.education.year}, {portfolio.education.institution}
            </span>
          </p>
          <p className="py-4 font-serif text-xl leading-snug text-ink-2 italic lg:col-span-5 lg:px-6">{portfolio.tagline}</p>
          <a
            className="group flex items-start gap-3 py-4 lg:col-span-3 lg:pl-6"
            href={portfolio.status.href}
          >
            <span aria-hidden="true" className="live-dot live-dot-pulse mt-1.5" />
            <span>
              <span className="kicker block text-press">{portfolio.status.label}</span>
              <span className="mt-0.5 block font-serif text-2xl leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {portfolio.status.project} <span aria-hidden="true" className="arrow arrow-right text-lg">→</span>
              </span>
            </span>
          </a>
        </div>
        <div className="rule" />

        {/* Front-page grid */}
        <div className="grid gap-x-10 lg:grid-cols-12">
          <article className="press-fade press-d4 border-b border-rule py-8 lg:col-span-8 lg:border-b-0 lg:py-10">
            <p className="kicker flex items-center gap-3">
              <span className="bg-press px-1.5 py-0.5 text-paper dark:text-on-ink">Lead story</span>
              <span>Live at {theoryPrep.displayUrl}</span>
            </p>
            <h2 className="mt-4 max-w-[22ch] font-serif text-[clamp(2.1rem,5vw,4.1rem)] leading-[0.98] font-[450] tracking-[-0.025em]">
              {lead.headline}
            </h2>
            <p className="mt-5 max-w-[60ch] font-serif text-lg leading-relaxed text-ink-2 sm:text-xl">
              {portfolio.name} built <strong className="font-semibold text-ink">TheoryPrep</strong>, a free, independent
              place to practise for the Irish driving theory test, with 805 questions, timed mock exams and an explanation for every answer.
            </p>
            <figure className="mt-7">
              <div className="overflow-hidden rounded-sm bg-paper-2 shadow-[0_18px_40px_-24px_rgb(26_23_18/0.45)]">
                <Image
                  alt="TheoryPrep homepage: the headline 'Irish Driving Test, Pass First Time' beside a shaggy dog in a green bandana driving a red convertible with an L-plate."
                  className="h-auto w-full"
                  height={900}
                  loading="eager"
                  sizes="(min-width: 1472px) 940px, (min-width: 1024px) 64vw, 100vw"
                  src="/projects/theoryprep-home.webp"
                  width={1440}
                />
              </div>
              <figcaption className="meta mt-3 flex justify-between gap-4">
                <span>theoryprep.ie, as it looks today.</span>
                <span className="hidden sm:inline">Screenshot · Oct 2026</span>
              </figcaption>
            </figure>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn btn-ink" href="#theoryprep">
                Read the feature <span aria-hidden="true" className="arrow arrow-right">↓</span>
              </a>
              <a className="btn btn-line" href={theoryPrep.url} rel="noreferrer" target="_blank">
                Visit TheoryPrep <span aria-hidden="true" className="arrow">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </article>

          <aside aria-label="From the editor" className="press-fade press-d4 py-8 lg:col-span-4 lg:py-10 lg:pl-6">
            <p className="kicker">From the editor</p>
            <div className="mt-4 space-y-4 font-serif text-[1.075rem] leading-relaxed">
              {portfolio.about.map((paragraph, index) => (
                <p className={index === 0 ? "dropcap" : "text-ink-2"} key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-4 font-serif text-xl italic">— R.C.</p>

            <div className="mt-8 border-t border-ink pt-5">
              <p className="kicker">In this edition</p>
              <ol className="mt-3 font-serif text-lg">
                {portfolio.navigation.slice(1).map((item) => (
                  <li className="border-b border-rule-soft" key={item.href}>
                    <a className="group flex min-h-11 items-baseline gap-2 py-2 hover:text-press" href={item.href}>
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="mx-1 flex-1 translate-y-[-0.3em] border-b border-dotted border-ink-3" />
                      <span className="meta group-hover:text-press">p.{item.page}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-line" href={portfolio.links.github.href} rel="noreferrer" target="_blank">
                GitHub <span aria-hidden="true" className="arrow">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a className="btn btn-line" href={portfolio.links.linkedin.href} rel="noreferrer" target="_blank">
                LinkedIn <span aria-hidden="true" className="arrow">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Link className="btn btn-line" href="/cv">
                CV <span aria-hidden="true" className="arrow arrow-right">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
