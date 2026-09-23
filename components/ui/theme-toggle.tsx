"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

const THEME_KEY = "portfolio-theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  return () => observer.disconnect();
}

const getIsDark = () => document.documentElement.dataset.theme === "dark";
const getServerIsDark = () => false;

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark);

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      root.dataset.theme = nextTheme;

      try {
        window.localStorage.setItem(THEME_KEY, nextTheme);
      } catch {
        // Storage can be unavailable (private mode); the toggle still works for this visit.
      }
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme();
      return;
    }

    // Sweep day into night (or back) as a circle growing out of the button.
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    document.startViewTransition(applyTheme).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      className="group inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-ink bg-card text-ink transition-[translate,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-marigold hover:text-night hover:shadow-[3px_3px_0_var(--ink)] active:translate-y-0 active:shadow-none"
      onClick={toggleTheme}
      title={isDark ? "Switch to day mode" : "Switch to night mode"}
      type="button"
    >
      <SunIcon className="size-[1.1rem] transition-transform duration-500 group-hover:rotate-45 dark:hidden" />
      <MoonIcon className="hidden size-[1.1rem] transition-transform duration-500 group-hover:-rotate-12 dark:block" />
    </button>
  );
}
