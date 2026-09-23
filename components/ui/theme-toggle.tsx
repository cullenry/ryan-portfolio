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
      className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white/80 text-[#171a21] shadow-[0_1px_0_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#c8d6fa] hover:bg-[#d9e4ff]/90 hover:text-[#171a21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b7cfa]"
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <span className="relative inline-flex size-4 items-center justify-center">
        {isDark ? (
          <svg
            aria-hidden="true"
            className="theme-toggle__icon theme-toggle__icon--moon block size-4 transition-all duration-300 ease-out"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.8A8.5 8.5 0 0 1 11.2 3a8.5 8.5 0 1 0 9.8 9.8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="theme-toggle__icon theme-toggle__icon--sun block size-4 transition-all duration-300 ease-out"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
        )}
      </span>
    </button>
  );
}