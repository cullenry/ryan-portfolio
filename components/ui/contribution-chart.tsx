"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { ContributionCalendar } from "@/lib/github";

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30;
const TOP = 18;

const dayFormat = new Intl.DateTimeFormat("en-IE", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en-IE", { month: "short", timeZone: "UTC" });
const monthYearFormat = new Intl.DateTimeFormat("en-IE", { month: "long", year: "numeric", timeZone: "UTC" });

function describe(date: string, count: number) {
  return `${dayFormat.format(new Date(`${date}T00:00:00Z`))} · ${count === 0 ? "No" : count} contribution${count === 1 ? "" : "s"}`;
}

export function ContributionChart({ calendar, username }: { calendar: ContributionCalendar; username: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const weeks = calendar.weeks;
  const lastWeek = weeks.length - 1;
  const lastDay = weeks[lastWeek]?.contributionDays.at(-1);
  const [selected, setSelected] = useState<{ week: number; weekday: number } | null>(null);

  const width = LEFT + weeks.length * STEP;
  const height = TOP + 7 * STEP;

  const months = useMemo(() => {
    const labels: Array<{ x: number; label: string }> = [];
    let previous = "";
    weeks.forEach((week, index) => {
      const first = week.contributionDays[0];
      if (!first) return;
      const month = first.date.slice(0, 7);
      if (month !== previous) {
        // Skip a label that would collide with the previous one.
        if (!labels.length || index * STEP - (labels.at(-1)!.x - LEFT) > STEP * 2.5) {
          labels.push({ x: LEFT + index * STEP, label: monthFormat.format(new Date(`${first.date}T00:00:00Z`)) });
        }
        previous = month;
      }
    });
    return labels;
  }, [weeks]);

  const monthlyTotals = useMemo(() => {
    const totals = new Map<string, number>();
    for (const day of weeks.flatMap((week) => week.contributionDays)) {
      const key = day.date.slice(0, 7);
      totals.set(key, (totals.get(key) ?? 0) + day.contributionCount);
    }
    return [...totals.entries()];
  }, [weeks]);

  // Start scrolled to the most recent weeks on narrow screens.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollLeft = node.scrollWidth;
  }, []);

  const findDay = (week: number, weekday: number) =>
    weeks[week]?.contributionDays.find((day) => day.weekday === weekday) ?? null;

  const active = selected ? findDay(selected.week, selected.weekday) : null;
  const readout = active
    ? describe(active.date, active.contributionCount)
    : lastDay
      ? `Latest: ${describe(lastDay.date, lastDay.contributionCount)}`
      : "";

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const current = selected ?? { week: lastWeek, weekday: lastDay?.weekday ?? 0 };

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const week = event.key === "Home" ? 0 : lastWeek;
      const day = event.key === "Home" ? weeks[0]?.contributionDays[0] : lastDay;
      setSelected({ week, weekday: day?.weekday ?? 0 });
      return;
    }

    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const week = Math.max(0, Math.min(lastWeek, current.week + move[0]));
    const weekday = Math.max(0, Math.min(6, current.weekday + move[1]));
    if (findDay(week, weekday)) {
      setSelected({ week, weekday });
      const node = scrollRef.current;
      if (node) {
        const x = LEFT + week * STEP;
        const scale = node.scrollWidth / width;
        if (x * scale < node.scrollLeft + 40 || x * scale > node.scrollLeft + node.clientWidth - 40) {
          node.scrollLeft = x * scale - node.clientWidth / 2;
        }
      }
    }
  };

  return (
    <figure className="m-0">
      <div
        aria-describedby={`${id}-readout`}
        aria-label={`GitHub contribution calendar for @${username}. Use the arrow keys to read each day.`}
        className="overflow-x-auto pb-2 outline-offset-4"
        onKeyDown={onKeyDown}
        onPointerLeave={() => setSelected(null)}
        ref={scrollRef}
        role="group"
        tabIndex={0}
      >
        <svg
          aria-hidden="true"
          className="block h-auto w-full min-w-[40rem]"
          viewBox={`0 0 ${width} ${height}`}
        >
          {months.map((month) => (
            <text className="fill-ink-3 font-mono" fontSize="9" key={`${month.x}-${month.label}`} x={month.x} y={10}>
              {month.label}
            </text>
          ))}
          {[1, 3, 5].map((weekday) => (
            <text className="fill-ink-3 font-mono" fontSize="9" key={weekday} x={0} y={TOP + weekday * STEP + CELL - 2}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][weekday]}
            </text>
          ))}
          {weeks.map((week, weekIndex) =>
            week.contributionDays.map((day) => {
              const isSelected = selected?.week === weekIndex && selected.weekday === day.weekday;
              const isLatest = day.date === lastDay?.date;
              return (
                <rect
                  height={CELL}
                  key={day.date}
                  onPointerEnter={() => setSelected({ week: weekIndex, weekday: day.weekday })}
                  rx={2}
                  stroke={isSelected ? "var(--ink)" : isLatest ? "var(--press)" : "none"}
                  strokeWidth={isSelected || isLatest ? 1.5 : 0}
                  style={{ fill: `var(--heat-${day.level})` }}
                  width={CELL}
                  x={LEFT + weekIndex * STEP}
                  y={TOP + day.weekday * STEP}
                />
              );
            }),
          )}
        </svg>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p aria-live="polite" className="meta min-h-5 text-ink-2" id={`${id}-readout`}>
          {readout}
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[0.7rem] text-ink-3">
          <span>Fewer</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span aria-hidden="true" className="size-3 rounded-[2px]" key={level} style={{ background: `var(--heat-${level})` }} />
          ))}
          <span>More</span>
          <span className="ml-3 inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="size-3 rounded-[2px] border-[1.5px] border-press" /> Latest day
          </span>
        </div>
      </figcaption>
      <details className="group mt-4 border-t border-rule pt-3">
        <summary className="kicker inline-flex min-h-11 cursor-pointer list-none items-center gap-2 hover:text-press [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="transition-transform group-open:rotate-90">
            ▸
          </span>
          View as table
        </summary>
        <table className="mt-2 w-full max-w-md border-collapse font-sans text-sm">
          <caption className="sr-only">Contributions per month</caption>
          <thead>
            <tr className="border-b border-ink text-left">
              <th className="py-1.5 font-semibold" scope="col">
                Month
              </th>
              <th className="py-1.5 text-right font-semibold" scope="col">
                Contributions
              </th>
            </tr>
          </thead>
          <tbody>
            {monthlyTotals.map(([month, total]) => (
              <tr className="border-b border-rule-soft" key={month}>
                <th className="py-1.5 text-left font-normal" scope="row">
                  {monthYearFormat.format(new Date(`${month}-01T00:00:00Z`))}
                </th>
                <td className="tnum py-1.5 text-right font-mono">{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
