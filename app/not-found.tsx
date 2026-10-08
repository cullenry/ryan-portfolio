import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader home={false} />
      <main className="wrap relative z-1 grid min-h-[75dvh] place-items-center py-16" id="main">
        <article className="w-full max-w-2xl border-t-[3px] border-ink pt-6">
          <div className="flex items-baseline justify-between border-b border-ink pb-3">
            <p className="kicker text-press">Correction</p>
            <p className="meta">Error 404</p>
          </div>
          <h1 className="mt-6 font-serif text-[clamp(2.4rem,7vw,4.2rem)] leading-[0.95] font-[400] tracking-[-0.03em]">
            This page <span className="italic">did not run.</span>
          </h1>
          <p className="mt-5 font-serif text-lg leading-relaxed text-ink-2">
            An earlier link pointed readers to a page that doesn&apos;t exist. The Cullen Ledger regrets the error and
            apologises for any inconvenience to readers, recruiters and passing search engines.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-ink" href="/">
              Back to the front page <span aria-hidden="true" className="arrow arrow-right">→</span>
            </Link>
            <Link className="btn btn-line" href="/cv">
              Read the CV
            </Link>
            <a className="btn btn-line" href={portfolio.links.theoryprep.href} rel="noreferrer" target="_blank">
              Practise for your theory test <span aria-hidden="true" className="arrow">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
