export type Theme = "light" | "dark";

const storageKey = "portfolio-theme";

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  };

  // Cross-fade the whole page where View Transitions are supported.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "startViewTransition" in document) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

export function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
