import { portfolio } from "@/data/portfolio";

// Classified categories get their own colour, like the sections of a real classifieds page.
const classifiedStyles = [
  { head: "bg-market", body: "bg-tint-green" },
  { head: "bg-press", body: "bg-tint-red" },
  { head: "bg-ink", body: "bg-paper-2" },
];

export function Education() {
  const [trinity, school] = portfolio.educationHistory;

  return (
    <section aria-labelledby="education-heading" className="relative z-1 pt-20 outline-none sm:pt-28" id="education" tabIndex={-1}>
      <div className="wrap">
        <header className="reveal">
          <p className="kicker">Education · p.07</p>
          <h2 className="mt-2 max-w-[16ch] font-sans text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.88] font-bold tracking-[-0.03em] uppercase [font-stretch:80%]" id="education-heading">
            Where systems meet strategy
          </h2>
        </header>
        <div className="reveal-rule rule-double mt-6" />

        <div className="col-rules lg-col-rules grid lg:grid-cols-12">
          <article className="reveal py-8 lg:col-span-7 lg:py-10 lg:pr-10">
            <p className="meta">{trinity.date}</p>
            <h3 className="mt-3 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-none font-[450] tracking-[-0.02em]">{trinity.institution}</h3>
            <p className="mt-3 font-sans text-lg font-semibold">
              {trinity.url ? (
                <a className="link" href={trinity.url} rel="noreferrer" target="_blank">
                  <span className="highlighter">{trinity.course}</span>
                  <span className="sr-only"> course page (opens in a new tab)</span>
                </a>
              ) : (
                trinity.course
              )}
            </p>
            <p className="mt-1 font-serif text-ink-2">{trinity.award}</p>
            <p className="mt-6 inline-flex items-center gap-3 border border-market bg-tint-green px-3 py-1.5 font-mono text-xs">
              {trinity.detail}
            </p>
          </article>
          <article className="reveal my-6 flex flex-col justify-between gap-6 bg-tint-green p-6 lg:col-span-5 lg:my-10 lg:ml-10 lg:p-8">
            <div>
              <p className="meta">{school.date}</p>
              <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.8vw,2.3rem)] leading-tight font-[450]">{school.institution}</h3>
              <p className="mt-1 font-sans font-semibold text-ink-2">{school.course}</p>
            </div>
            {school.figure && (
              <p className="flex items-end gap-3 border-t border-market pt-4">
                <span className="figure text-[clamp(4.5rem,11vw,7.5rem)] text-market">{school.figure.value}</span>
                <span className="pb-2 font-sans text-sm text-ink-2">
                  {school.figure.label}
                  <br />
                  in the Leaving Cert
                </span>
              </p>
            )}
          </article>
        </div>

        {/* Classifieds */}
        <div className="reveal mt-16">
          <div className="flex items-baseline justify-between border-b-[3px] border-ink pb-2">
            <h2 className="font-serif text-3xl font-[450] tracking-[-0.02em] sm:text-4xl">Classifieds</h2>
            <p className="meta">Skills & interests</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(portfolio.skills).map(([group, items], index) => (
              <section aria-label={group} className={`border border-ink ${classifiedStyles[index % classifiedStyles.length].body}`} key={group}>
                <h3 className={`px-4 py-2 text-center font-sans text-[0.75rem] font-bold tracking-[0.16em] text-paper uppercase [font-stretch:80%] ${classifiedStyles[index % classifiedStyles.length].head}`}>
                  {group}
                </h3>
                <ul className="flex flex-wrap gap-x-1.5 p-4 font-serif leading-relaxed text-ink-2">
                  {items.map((item, index) => (
                    <li className="whitespace-nowrap" key={item}>
                      {item}
                      {index < items.length - 1 && <span aria-hidden="true" className="text-ink-3"> ·</span>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section aria-label="Also" className="border border-dashed border-ink bg-tint-yellow">
              <h3 className="border-b border-dashed border-ink px-4 py-2 text-center font-sans text-[0.75rem] font-bold tracking-[0.16em] uppercase [font-stretch:80%]">
                Also
              </h3>
              <p className="p-4 font-serif leading-relaxed text-ink-2">
                Speaks {portfolio.spokenLanguages.join(" and ")}. Off the clock: {portfolio.interests.join(", ").toLowerCase()}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
