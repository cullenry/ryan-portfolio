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
      className="w-full border border-[#e5e7eb] bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(23,26,33,0.42)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#eef0f3] pb-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#6b7280] uppercase">
          </p>

          <h2
            className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#171a21]"
            id="github-activity-heading"
          >
            GitHub activity
          </h2>
        </div>

        <a
          className="inline-flex items-center gap-1 text-sm font-medium text-[#6b7280] underline decoration-[#d9e4ff] underline-offset-4 transition-colors hover:text-[#5b7cfa] hover:decoration-[#5b7cfa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b7cfa]"
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
                    className="contribution-day group relative block size-full rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b7cfa]"
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