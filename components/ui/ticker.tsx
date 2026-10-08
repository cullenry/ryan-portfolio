"use client";

import { useState, type ReactNode } from "react";

/**
 * A market-style ticker. Server-rendered items are passed in as children and
 * duplicated once so the CSS marquee loops seamlessly. Pausable (WCAG 2.2.2).
 */
export function Ticker({ children, label }: { children: ReactNode; label: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="flex items-stretch border-b border-ink bg-band text-on-band">
      <p className="hidden shrink-0 items-center gap-2 border-r border-on-band/25 px-3 font-mono text-[0.7rem] font-semibold tracking-wider uppercase sm:flex">
        <span aria-hidden="true" className="live-dot" />
        Live
      </p>
      <section aria-label={label} className="ticker min-w-0 flex-1" data-paused={paused}>
        <div className="ticker-track">
          <ul className="flex shrink-0">{children}</ul>
          <ul aria-hidden="true" className="ticker-dupe flex shrink-0">
            {children}
          </ul>
        </div>
      </section>
      <button
        aria-label={paused ? "Play the ticker" : "Pause the ticker"}
        aria-pressed={paused}
        className="no-print grid w-11 shrink-0 place-items-center border-l border-on-band/25 transition-colors hover:bg-press hover:text-paper motion-reduce:hidden"
        onClick={() => setPaused((value) => !value)}
        type="button"
      >
        {paused ? (
          <svg aria-hidden="true" className="size-3" viewBox="0 0 12 12">
            <path d="M2.5 1.5v9l8-4.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg aria-hidden="true" className="size-3" viewBox="0 0 12 12">
            <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
