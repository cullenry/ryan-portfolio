import { ContributionChart } from "@/components/ui/contribution-chart";
import { portfolio } from "@/data/portfolio";
import { Sparkline } from "@/components/ui/sparkline";
import { activitySummary, weeklyTotals, type ContributionCalendar } from "@/lib/github";

const shortDate = new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function Activity({ calendar }: { calendar: ContributionCalendar | null }) {
  const username = portfolio.githubUsername;
  const summary = calendar ? activitySummary(calendar) : null;
  const delta = summary ? summary.last4 - summary.prior4 : 0;

  return (
    <section aria-labelledby="activity-heading" className="defer-render relative z-1 pt-20 outline-none sm:pt-28" id="activity" tabIndex={-1}>
      <div className="wrap">
        <header className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Market report · p.05</p>
            <h2 className="mt-2 font-serif text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] font-[400] tracking-[-0.035em]" id="activity-heading">
              The commit <span className="italic">index</span>
            </h2>
          </div>
          <a className="meta link text-ink-2" href={`https://github.com/${username}`} rel="noreferrer" target="_blank">
            github.com/{username} ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </header>
        <div className="reveal-rule rule-double mt-6" />

        {summary && calendar ? (
          <>
            <dl className="reveal col-rules lg-col-rules grid lg:grid-cols-12">
              <div className="py-6 lg:col-span-5 lg:pr-8">
                <dt className="font-sans text-sm text-ink-2">Contributions, last 12 months</dt>
                <dd className="mt-2 flex items-end justify-between gap-6">
                  <span className="figure text-[clamp(3.5rem,8vw,5.5rem)]">{summary.total.toLocaleString("en-IE")}</span>
                  <Sparkline className="mb-2 h-14 w-36 shrink-0" values={weeklyTotals(calendar).map((week) => week.total)} />
                </dd>
              </div>
              <div className="py-6 lg:col-span-3 lg:px-8">
                <dt className="font-sans text-sm text-ink-2">Last 4 weeks</dt>
                <dd className="mt-2">
                  <span className="figure text-[clamp(3.5rem,8vw,5.5rem)]">{summary.last4}</span>
                  <span className={`mt-1 block font-mono text-sm ${delta > 0 ? "text-market" : delta < 0 ? "text-press" : "text-ink-3"}`}>
                    {delta > 0 ? "▲ +" : delta < 0 ? "▼ " : "■ "}
                    {delta} <span className="font-sans text-ink-3">vs the 4 weeks before</span>
                  </span>
                </dd>
              </div>
              <div className="py-6 lg:col-span-4 lg:pl-8">
                <dt className="kicker">Reading the index</dt>
                <dd className="mt-2 font-serif leading-relaxed text-ink-2">
                  Each square is a day of public GitHub activity, darker for busier days. Hover over a day, or focus the chart and use the arrow keys, to read the exact count.
                </dd>
              </div>
            </dl>
            <div className="reveal border-t border-ink pt-6">
              <ContributionChart calendar={calendar} username={username} />
              {summary.busiest && summary.busiest.contributionCount > 0 && (
                <p className="mt-4 max-w-2xl font-serif text-ink-2 italic">
                  Busiest day: {shortDate.format(new Date(`${summary.busiest.date}T00:00:00Z`))}, with {summary.busiest.contributionCount} contributions.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="mt-8 border border-dashed border-ink-3 p-8 font-serif text-lg text-ink-2">
            <p className="font-semibold text-ink">The wires are down.</p>
            <p className="mt-1">GitHub activity couldn&apos;t be fetched just now, so here&apos;s the source instead:{" "}
              <a className="link" href={`https://github.com/${username}`} rel="noreferrer" target="_blank">
                github.com/{username}
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
