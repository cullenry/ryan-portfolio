import { getGithubActivity } from "@/lib/github";

type GithubActivityProps = {
  username: string;
};

function contributionLabel(date: string, count: number) {
  const contributionText = count === 1 ? "contribution" : "contributions";

  return `${date}: ${count} ${contributionText}`;
}

export async function GithubActivity({ username }: GithubActivityProps) {
  const calendar = await getGithubActivity(username);

  return (
    <aside
      aria-labelledby="github-activity-heading"
      className="w-full border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.45)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
            Proof of Life
          </p>

          <h2
            className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950"
            id="github-activity-heading"
          >
            GitHub activity
          </h2>
        </div>

        <a
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-950 hover:decoration-slate-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
          href={`https://github.com/${username}`}
          rel="noreferrer"
          target="_blank"
        >
          @{username}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      {calendar ? (
        <div
          className="mt-6"
          role="group"
          aria-label={`GitHub contribution activity for ${username}`}
        >
          <div>
            <div className="grid aspect-[7/5] w-full min-w-0 grid-flow-col grid-rows-5 auto-cols-fr gap-px sm:gap-0.5">
              {calendar.weeks
                .flatMap((week) => week.contributionDays)
                .slice(-35)
                .map((day) => (
                  <span
                    aria-label={contributionLabel(
                      day.date,
                      day.contributionCount,
                    )}
                    className="contribution-day group relative block size-full rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
                    key={day.date}
                    role="img"
                    tabIndex={0}
                    title={contributionLabel(
                      day.date,
                      day.contributionCount,
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="contribution-day-fill block size-full rounded-[2px] transition-transform duration-150 ease-out group-hover:scale-125 group-focus:scale-125 motion-reduce:transition-none"
                      style={{ backgroundColor: day.color }}
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 rounded border border-slate-200 bg-slate-950 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100 motion-reduce:transition-none"
                    >
                      {contributionLabel(
                        day.date,
                        day.contributionCount,
                      )}
                    </span>
                  </span>
                ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-500">
            <span>Recent activity</span>
            <span>Last 35 days</span>
          </div>
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-slate-200 px-4 py-10 text-sm leading-6 text-slate-500">
          Activity data is temporarily unavailable.
        </div>
      )}
    </aside>
  );
}