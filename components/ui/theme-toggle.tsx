"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "portfolio-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextIsDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.requestAnimationFrame(() => setIsDark(nextIsDark));
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;

    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem(THEME_KEY, nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle inline-flex size-9 items-center justify-center border border-[#e5e7eb] bg-white/70 text-[#171a21] transition-colors hover:border-[#c8d6fa] hover:text-[#5b7cfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b7cfa]"
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      {isDark ? (
        <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
          <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.05 16.95l-1.41 1.41m12.72 0-1.42-1.41M7.05 7.05 5.64 5.64" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.7 15.4A8.5 8.5 0 0 1 8.6 3.3 8.5 8.5 0 1 0 20.7 15.4Z" />
        </svg>
      )}
    </button>
  );
}