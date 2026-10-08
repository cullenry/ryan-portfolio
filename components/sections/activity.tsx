import { ContributionChart } from "@/components/ui/contribution-chart";
import { portfolio } from "@/data/portfolio";
import type { ContributionCalendar } from "@/lib/github";

export function Activity({ calendar }: { calendar: ContributionCalendar | null }) {
  const username = portfolio.githubUsername;

  return (
    <section aria-labelledby="activity-heading" className="relative z-1 pt-20 outline-none sm:pt-24" id="activity" tabIndex={-1}>
      <div className="wrap">
        <div className="reveal">
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b-2 border-ink pb-3">
            <div className="flex items-baseline gap-4">
              <h2 className="font-sans text-2xl font-bold tracking-[-0.01em] uppercase [font-stretch:80%] sm:text-3xl" id="activity-heading">
                Commit index
              </h2>
              <p className="kicker hidden sm:block">Market data · p.05</p>
            </div>
            <a className="meta link text-ink-2" href={`https://github.com/${username}`} rel="noreferrer" target="_blank">
              github.com/{username} ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </header>

          <div className="pt-5">
            {calendar ? (
              <>
                <p className="mb-4 font-mono text-xs text-ink-2">
                  Public GitHub contributions, last 12 months ·{" "}
                  <span className="text-ink">{calendar.totalContributions.toLocaleString("en-IE")} total</span>
                </p>
                <ContributionChart calendar={calendar} username={username} />
              </>
            ) : (
              <p className="font-serif text-lg text-ink-2">
                <span className="font-semibold text-ink">The wires are down.</span> GitHub activity couldn&apos;t be fetched just now. See{" "}
                <a className="link" href={`https://github.com/${username}`} rel="noreferrer" target="_blank">
                  github.com/{username}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
