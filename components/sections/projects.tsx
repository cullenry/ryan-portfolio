import type { ReactNode } from "react";
import { NetflixArt, PortfolioArt, ServerArt, TradingArt } from "@/components/illustrations/project-art";
import { portfolio, type Project } from "@/data/portfolio";

function Stack({ items }: { items: string[] }) {
  return (
    <ul aria-label="Stack" className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li className="border border-ink-3 px-2 py-0.5 font-mono text-[0.72rem] text-ink-2" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Notes({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 font-serif leading-relaxed text-ink-2">
      {items.map((item) => (
        <li className="grid grid-cols-[1.25rem_1fr]" key={item}>
          <span aria-hidden="true" className="text-ink-3">
            –
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.links.length) return null;
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm font-semibold">
      {project.links.map((link) => (
        <a className="link" href={link.href} key={link.href} rel="noreferrer" target="_blank">
          {link.label} <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </p>
  );
}

function Art({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="m-0">
      {children}
      <figcaption className="meta mt-2">{caption}</figcaption>
    </figure>
  );
}

export function Projects() {
  const [, trading, netflix, server, site] = portfolio.projects;

  return (
    <section aria-labelledby="projects-heading" className="relative z-1 pt-20 outline-none sm:pt-28" id="projects" tabIndex={-1}>
      <div className="wrap">
        <header className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Projects · p.04</p>
            <h2 className="mt-2 font-serif text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] font-[400] tracking-[-0.035em]" id="projects-heading">
              Also in this <span className="italic">edition</span>
            </h2>
          </div>
          <p className="max-w-sm font-serif text-lg text-ink-2 italic">Things I&apos;ve built to understand the systems behind the interface.</p>
        </header>
        <div className="reveal-rule rule-double mt-6" />

        {/* Markets: the widest story */}
        <article aria-labelledby="p-trading" className="reveal grid gap-8 border-b border-rule py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
          <div className="lg:col-span-5">
            <p className="kicker text-market">{trading.kicker}</p>
            <h3 className="mt-3 font-serif text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] font-[450] tracking-[-0.02em]" id="p-trading">
              {trading.headline}
            </h3>
            <p className="mt-2 font-sans text-sm font-semibold">{trading.name}</p>
            <p className="mt-5 font-serif text-lg leading-relaxed">{trading.summary}</p>
            <div className="mt-5">
              <Notes items={trading.details} />
            </div>
            <div className="mt-6">
              <Stack items={trading.stack} />
            </div>
          </div>
          <div className="lg:col-span-7 lg:border-l lg:border-rule lg:pl-12">
            <div className="flex items-baseline justify-between border-b border-ink pb-2 font-mono text-xs">
              <span className="font-semibold">STRATEGY.BACKTEST</span>
              <span className="text-ink-3">daily · indicators</span>
            </div>
            <div className="mt-4">
              <Art caption="Illustration of a backtest view with moving averages. Not real trading results.">
                <TradingArt />
              </Art>
            </div>
          </div>
        </article>

        {/* Two stories, deliberately different shapes */}
        <div className="grid border-b border-rule lg:grid-cols-12">
          <article aria-labelledby="p-netflix" className="reveal border-b border-rule py-10 lg:col-span-5 lg:border-b-0 lg:py-14 lg:pr-12">
            <Art caption="Illustration. The chart shapes are not the project's real findings.">
              <NetflixArt />
            </Art>
            <p className="kicker mt-8">{netflix.kicker}</p>
            <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.05] font-[450] tracking-[-0.015em]" id="p-netflix">
              {netflix.headline}
            </h3>
            <p className="mt-4 font-serif leading-relaxed text-ink-2">{netflix.summary}</p>
            <div className="mt-4">
              <Notes items={netflix.details} />
            </div>
            <div className="mt-5">
              <Stack items={netflix.stack} />
            </div>
          </article>

          <article aria-labelledby="p-server" className="reveal py-10 lg:col-span-7 lg:border-l lg:border-rule lg:py-14 lg:pl-12">
            <p className="kicker">{server.kicker}</p>
            <h3 className="mt-3 max-w-[18ch] font-serif text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.02] font-[450] tracking-[-0.02em]" id="p-server">
              {server.headline}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-serif leading-relaxed">{server.summary}</p>
                <div className="mt-4">
                  <Notes items={server.details} />
                </div>
              </div>
              <div>
                <Art caption="Illustration of a server console.">
                  <ServerArt />
                </Art>
                <div className="mt-5">
                  <Stack items={server.stack} />
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Colophon brief */}
        <article aria-labelledby="p-site" className="reveal grid items-center gap-8 py-10 sm:grid-cols-12 lg:py-12">
          <div className="sm:col-span-4 lg:col-span-3">
            <PortfolioArt />
          </div>
          <div className="sm:col-span-8 lg:col-span-6">
            <p className="kicker">{site.kicker}</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight font-[450]" id="p-site">
              {site.headline}
            </h3>
            <p className="mt-3 font-serif leading-relaxed text-ink-2">{site.summary}</p>
          </div>
          <div className="space-y-4 sm:col-span-12 lg:col-span-3">
            <Stack items={site.stack} />
            <Links project={site} />
          </div>
        </article>
      </div>
    </section>
  );
}
