import { getGithubActivity } from "@/lib/github";

type GithubActivityProps = {
  username: string;
};

function contributionLabel(date: string, count: number) {
  const contributionText = count === 1 ? "contribution" : "contributions";

  return `${date}: ${count} ${contributionText}`;
}

function contributionColor(color: string, count: number, isToday: boolean) {
  if (count === 0) {
    return isToday ? "#164e63" : "#16253a";
  }

  return color;
}

export async function GithubActivity({ username }: GithubActivityProps) {
  const calendar = await getGithubActivity(username);

  return (
    <aside
      aria-labelledby="github-activity-heading"
      className="glass-panel w-full p-5 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2
            className="text-lg font-semibold tracking-[-0.03em] text-white"
            id="github-activity-heading"
          >
            GitHub activity
          </h2>
        </div>

        <a
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 underline decoration-violet-400/60 underline-offset-4 transition-colors hover:text-violet-300 hover:decoration-violet-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
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
                .map((day) => {
                  const isToday =
                    day.date === new Date().toISOString().slice(0, 10) ||
                    day.date === calendar.weeks.at(-1)?.contributionDays.at(-1)?.date;

                  return (
                  <span
                    aria-label={contributionLabel(
                      day.date,
                      day.contributionCount,
                    )}
                    className={`contribution-day group relative block size-full rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300${isToday ? " contribution-day--today" : ""}`}
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
                      className="contribution-day-fill block size-full rounded-[2px] transition-[filter] duration-150 ease-out group-hover:brightness-90 group-focus:brightness-90 motion-reduce:transition-none"
                      style={{ backgroundColor: contributionColor(day.color, day.contributionCount, isToday) }}
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 rounded border border-white/10 bg-[#0b1728] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100 motion-reduce:transition-none"
                    >
                      {day.contributionCount}{" "}
                      {day.contributionCount === 1
                        ? "contribution"
                        : "contributions"}
                    </span>

                  </span>
                  );
                })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-500">
            <span>Recent activity</span>
            <span>Last 35 days</span>
          </div>
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-white/15 px-4 py-10 text-sm leading-6 text-slate-500">
          Activity data is temporarily unavailable.
        </div>
      )}
    </aside>
  );
}