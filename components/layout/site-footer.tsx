import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { build, formatShortDate } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="no-print relative z-1 mt-24 bg-ink text-on-ink">
      <div className="wrap py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-tight">
              Ryan <span className="italic">Cullen</span>
            </p>
            <p className="mt-4 max-w-sm font-serif text-lg leading-snug text-on-ink/80">
              Printed in Dublin. No trees were harmed, but a fair few semicolons were.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 font-sans text-sm md:col-span-6 md:grid-cols-3">
            <div>
              <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.14em] text-on-ink/70 uppercase [font-stretch:80%]">Elsewhere</p>
              <ul className="space-y-2">
                {[portfolio.links.github, portfolio.links.linkedin, portfolio.links.theoryprep].map((link) => (
                  <li key={link.href}>
                    <a className="underline decoration-on-ink/30 underline-offset-4 hover:decoration-on-ink" href={link.href} rel="noreferrer" target="_blank">
                      {link.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.14em] text-on-ink/70 uppercase [font-stretch:80%]">On file</p>
              <ul className="space-y-2">
                <li>
                  <Link className="underline decoration-on-ink/30 underline-offset-4 hover:decoration-on-ink" href="/cv">
                    Curriculum vitae
                  </Link>
                </li>
                <li>
                  <a className="underline decoration-on-ink/30 underline-offset-4 hover:decoration-on-ink" href={portfolio.links.email.href}>
                    {portfolio.email}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.14em] text-on-ink/70 uppercase [font-stretch:80%]">Colophon</p>
              <p className="leading-relaxed text-on-ink/80">
                Set in Newsreader, Instrument Sans and JetBrains Mono. Built with Next.js. Press <kbd className="font-mono">/</kbd> for the index. Some keys do more than you&apos;d expect.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-on-ink/25 pt-5 font-mono text-xs text-on-ink/70">
          <p>
            Last updated <time dateTime={build.date.toISOString()}>{formatShortDate(build.date)}</time>
            {build.commit && <> · build {build.commit}</>}
          </p>
          <p>© {build.date.getFullYear()} {portfolio.name}</p>
        </div>
      </div>
    </footer>
  );
}
