import Link from "next/link";
import { CopyButton } from "@/components/ui/copy-button";
import { portfolio } from "@/data/portfolio";

export function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="relative z-1 mt-20 border-t-[3px] border-ink bg-tint-yellow pt-2 pb-16 outline-none sm:mt-28 sm:pb-24" id="contact" tabIndex={-1}>
      <div className="wrap">
        <div className="reveal grid gap-10 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">Contact · p.08</p>
            <h2 className="mt-2 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-[400] tracking-[-0.03em]" id="contact-heading">
              Letters to the <span className="highlighter-press italic">editor</span>
            </h2>
            <p className="mt-5 max-w-sm font-serif text-lg leading-relaxed text-ink-2">
              Internships, projects or a question about TheoryPrep. Whatever it is, I&apos;d love to hear from you.
            </p>
          </div>
          <div className="lg:col-span-8 lg:border-l lg:border-ink/30 lg:pl-10">
            <p className="meta">Write to</p>
            <a
              className="group mt-2 block font-serif text-[clamp(2rem,7.4vw,6rem)] leading-[0.95] font-[300] tracking-[-0.035em] break-words transition-colors hover:text-press"
              href={portfolio.links.email.href}
            >
              {portfolio.email.split("@")[0]}
              <span className="text-ink-3 italic transition-colors group-hover:text-press">@{portfolio.email.split("@")[1]}</span>
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="btn btn-ink" href={portfolio.links.email.href}>
                Send an email <span aria-hidden="true" className="arrow arrow-right">→</span>
              </a>
              <CopyButton text={portfolio.email} />
              <a className="btn btn-line" href={portfolio.links.linkedin.href} rel="noreferrer" target="_blank">
                LinkedIn <span aria-hidden="true" className="arrow">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a className="btn btn-line" href={portfolio.links.github.href} rel="noreferrer" target="_blank">
                GitHub <span aria-hidden="true" className="arrow">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Link className="btn btn-line" href="/cv">
                CV <span aria-hidden="true" className="arrow arrow-right">→</span>
              </Link>
            </div>
            <p className="meta mt-6">Based in {portfolio.location}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
