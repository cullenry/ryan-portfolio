"use client";

import { useSyncExternalStore } from "react";
import { getTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "dark" ? "Night edition" : "Day edition";

  return (
    <button
      aria-label={`Switch to ${label.toLowerCase()} (${next} theme)`}
      className={`group inline-flex min-h-11 items-center gap-2 font-sans text-[0.8rem] font-semibold text-ink-2 transition-colors hover:text-press ${className}`}
      onClick={() => setTheme(next)}
      type="button"
    >
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          className="origin-center transition-transform duration-300 group-hover:rotate-180"
          d="M8 1.75a6.25 6.25 0 0 1 0 12.5z"
          fill="currentColor"
        />
      </svg>
      <span className="[font-stretch:80%]">{theme ? label : "Edition"}</span>
    </button>
  );
}
