import { portfolio } from "@/data/portfolio";

export function ExperienceLedger() {
  return (
    <section aria-labelledby="experience-heading" className="relative z-1 pt-20 outline-none sm:pt-28" id="experience" tabIndex={-1}>
      <div className="wrap">
        <header className="reveal grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker">Experience · p.06</p>
            <h2 className="mt-2 font-serif text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] font-[400] tracking-[-0.035em]" id="experience-heading">
              The <span className="italic">ledger</span>
            </h2>
          </div>
          <p className="self-end font-serif text-lg text-ink-2 italic lg:col-span-4">
            Every entry a lesson in customers, teams and keeping things moving under pressure.
          </p>
        </header>

        <div className="reveal mt-6 border-t-[3px] border-ink">
          <div aria-hidden="true" className="hidden grid-cols-12 gap-6 border-b border-ink py-2 font-mono text-[0.7rem] tracking-wider text-ink-3 uppercase md:grid">
            <span className="col-span-3">Period</span>
            <span className="col-span-4">Employer · Position</span>
            <span className="col-span-5">Entries</span>
          </div>
          <ol>
            {portfolio.experience.map((item, index) => (
              <li
                className="group grid gap-x-6 gap-y-3 border-b border-rule py-6 transition-colors hover:bg-paper-2/60 md:grid-cols-12"
                key={`${item.company}-${item.role}`}
              >
                <p className="flex items-baseline gap-3 font-mono text-sm md:col-span-3 md:block">
                  <span className="text-ink-3">{String(portfolio.experience.length - index).padStart(2, "0")}</span>
                  <span className="md:mt-1 md:block">
                    {item.date ?? <span className="text-ink-2">{item.context}</span>}
                  </span>
                  {item.current && (
                    <span className="inline-flex items-center border border-ink px-1.5 py-0.5 font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase md:mt-2 md:w-fit">
                      Current
                    </span>
                  )}
                </p>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl leading-tight font-[450] sm:text-[1.7rem]">{item.company}</h3>
                  <p className="mt-1 font-sans text-[0.95rem] font-semibold text-ink-2">{item.role}</p>
                  {item.descriptor && <p className="mt-0.5 font-sans text-sm text-ink-3">{item.descriptor}</p>}
                </div>
                <ul className="space-y-1.5 font-serif leading-relaxed text-ink-2 md:col-span-5">
                  {item.details.map((detail) => (
                    <li className="grid grid-cols-[1.25rem_1fr]" key={detail}>
                      <span aria-hidden="true" className="text-ink-3">
                        –
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="rule-double" />
          <p className="mt-3 flex justify-between gap-4 font-mono text-xs text-ink-3">
            <span>Balance carried forward</span>
            <span>Still learning ▲</span>
          </p>
        </div>
      </div>
    </section>
  );
}
