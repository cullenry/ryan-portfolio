"use client";

import { useState, type ReactNode } from "react";

/** Switches between the full and one-page CV, and offers a print/PDF button. */
export function CvView({ full, simple }: { full: ReactNode; simple: ReactNode }) {
  const [view, setView] = useState<"full" | "simple">("full");

  return (
    <>
      <div className="no-print wrap flex flex-wrap items-center justify-between gap-4 py-6">
        <div aria-label="CV length" className="inline-flex border border-ink p-1" role="group">
          {(
            [
              ["full", "Full CV"],
              ["simple", "One page"],
            ] as const
          ).map(([value, label]) => (
            <button
              aria-pressed={view === value}
              className={`min-h-10 px-4 font-sans text-sm font-semibold transition-colors ${view === value ? "bg-ink text-on-ink" : "text-ink-2 hover:text-press"}`}
              key={value}
              onClick={() => setView(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <button className="btn btn-ink" onClick={() => window.print()} type="button">
          Print or save as PDF <span aria-hidden="true">⎙</span>
        </button>
      </div>
      <div className="wrap pb-16 print:p-0">
        <div className="mx-auto max-w-[62rem] border border-ink bg-paper p-6 shadow-[8px_8px_0_var(--rule-soft)] sm:p-10 lg:p-14 print:max-w-none print:border-0 print:p-0 print:shadow-none">
          {view === "full" ? full : simple}
        </div>
      </div>
    </>
  );
}
