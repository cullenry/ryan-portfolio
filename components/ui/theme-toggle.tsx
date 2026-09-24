"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const light = savedTheme === "light" || (!savedTheme && prefersLight);

    document.documentElement.classList.toggle("light", light);
    const timer = window.setTimeout(() => setIsLight(light), 0);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextIsLight = !isLight;
    document.documentElement.classList.toggle("light", nextIsLight);
    window.localStorage.setItem("portfolio-theme", nextIsLight ? "light" : "dark");
    setIsLight(nextIsLight);
  };

  return (
    <button
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <span aria-hidden="true">{isLight ? "🌙" : "☀️"}</span>
      <span className="sr-only">{isLight ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
