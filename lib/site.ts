import { portfolio } from "@/data/portfolio";

const defaultSiteUrl = "https://ryan-portfolio-three-beryl.vercel.app";

function normaliseUrl(value: string | undefined) {
  if (!value) return null;
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is added. */
export const siteUrl = normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? defaultSiteUrl;

export const siteTitle = `${portfolio.name} · ${portfolio.education.degree}, Trinity College Dublin`;

export const siteDescription =
  "Ryan Cullen is a Computer Science & Business student at Trinity College Dublin who builds software where code meets markets. Builder of TheoryPrep, free Irish driving theory test practice.";

/** Build stamp shown in the footer colophon. Frozen at build time for static pages. */
export const build = {
  date: new Date(),
  commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
};

const dublinDate = new Intl.DateTimeFormat("en-IE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Dublin",
});

export function formatEditionDate(date: Date) {
  return dublinDate.format(date);
}

export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Dublin",
  }).format(date);
}

/** Day of the year, used as the edition number in the masthead. */
export function editionNumber(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - start) / 86_400_000);
}
