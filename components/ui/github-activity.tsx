import { ArrowUpRightIcon } from "@/components/ui/icons";
import { getGithubActivity, type ContributionCalendar, type ContributionDay } from "@/lib/github";

type GithubActivityProps = {
  username: string;
  className?: string;
};

const heatLevels = ["var(--heat-0)", "var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)"];

function contributionLabel(date: string, count: number) {
  const contributionText = count === 1 ? "contribution" : "contributions";

  return `${date}: ${count} ${contributionText}`;
}

function getCurrentDateLabel() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleString("en-GB", { month: "long" });
  const year = now.getFullYear();

  return `${day} ${month} ${year}`;
}

function toIsoDate(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

function getLast28DaySequence(calendar: ContributionCalendar | null) {
  if (!calendar) {
    return [];
  }

  const lookup = new Map<string, ContributionDay>();

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      lookup.set(day.date, day);
    }
  }

  const today = new Date();
  const startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 27));
  const days: ContributionDay[] = [];

  for (let offset = 0; offset < 28; offset += 1) {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + offset);
    const isoDate = toIsoDate(date);
    const contribution = lookup.get(isoDate) ?? {
      color: "",
      contributionCount: 0,
      date: isoDate,
      weekday: date.getUTCDay(),
    };

    days.push(contribution);
  }

  return days;
}

/** Buckets a day's count into one of five heat levels, relative to the busiest day. */
function heatLevel(count: number, busiest: number) {
  if (count === 0) {
    return 0;
  }

  return Math.min(heatLevels.length - 1, Math.ceil((count / busiest) * (heatLevels.length - 1)));
}

export async function GithubActivity({ username, className = "" }: GithubActivityProps) {
  const calendar = await getGithubActivity(username);
  const displayDays = getLast28DaySequence(calendar);
  const busiest = Math.max(1, ...displayDays.map((day) => day.contributionCount));
  const total = displayDays.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <aside
      aria-labelledby="github-activity-heading"
      className={`flex flex-col rounded-[1.75rem] border border-line bg-card p-6 sm:p-7 ${className}`}
    >
      <h3 className="display text-[1.65rem] leading-tight font-semibold sm:text-[1.85rem]" id="github-activity-heading">
        GitHub activity
      </h3>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
        <a
          className="inline-flex items-center gap-0.5 font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-tomato-ink hover:decoration-tomato"
          href={`https://github.com/${username}`}
          rel="noreferrer"
          target="_blank"
        >
          @{username}
          <ArrowUpRightIcon className="size-3" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        {calendar && (
          <span>
            {total} {total === 1 ? "contribution" : "contributions"} in 4 weeks
          </span>
        )}
      </p>

      {calendar ? (
        <div className="mt-6 flex flex-1 flex-col" role="group" aria-label={`GitHub contribution activity for ${username}`}>
          <div className="grid grid-cols-7 gap-1.5">
            {displayDays.map((day) => (
              <span
                aria-label={contributionLabel(day.date, day.contributionCount)}
                className="group relative block aspect-square rounded-[5px] focus-visible:outline-offset-2"
                key={day.date}
                role="img"
                tabIndex={0}
                title={contributionLabel(day.date, day.contributionCount)}
              >
                <span
                  aria-hidden="true"
                  className="block size-full rounded-[5px] transition-transform duration-150 ease-out group-hover:scale-110 group-focus:scale-110 motion-reduce:transition-none"
                  style={{ backgroundColor: heatLevels[heatLevel(day.contributionCount, busiest)] }}
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 rounded-md bg-night px-2 py-1 text-[11px] font-medium text-cream opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100 motion-reduce:transition-none"
                >
                  {day.contributionCount} {day.contributionCount === 1 ? "contribution" : "contributions"}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-auto space-y-2 pt-5 text-xs text-ink-soft">
            <p aria-hidden="true" className="flex items-center gap-1">
              Less
              {heatLevels.map((color) => (
                <span className="size-2.5 rounded-[3px]" key={color} style={{ backgroundColor: color }} />
              ))}
              More
            </p>
            <p>Recent activity · {getCurrentDateLabel()}</p>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-1 items-center rounded-2xl border border-dashed border-line-strong px-4 py-10 text-sm leading-6 text-ink-soft">
          Activity data is temporarily unavailable.
        </div>
      )}
    </aside>
  );
}
