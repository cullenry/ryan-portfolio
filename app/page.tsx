import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Activity } from "@/components/sections/activity";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { ExperienceLedger } from "@/components/sections/experience";
import { FrontPage } from "@/components/sections/front-page";
import { Projects } from "@/components/sections/projects";
import { TheoryPrepFeature } from "@/components/sections/theoryprep";
import { CommandIndex } from "@/components/ui/command-index";
import { JsonLd } from "@/components/ui/json-ld";
import { TestDrive } from "@/components/ui/test-drive";
import { Ticker } from "@/components/ui/ticker";
import { portfolio, theoryPrep } from "@/data/portfolio";
import { activitySummary, getGithubActivity } from "@/lib/github";
import { build, siteDescription, siteUrl } from "@/lib/site";

type Quote = { symbol: string; value: string; note: string; trend?: "up" | "flat" };

export default async function Home() {
  const calendar = await getGithubActivity(portfolio.githubUsername);
  const summary = calendar ? activitySummary(calendar) : null;

  const quotes: Quote[] = [
    { symbol: "TPREP", value: "805", note: "practice questions", trend: "up" },
    { symbol: "MOCK", value: "40 Q · 45 MIN", note: "35 to pass" },
    ...(summary
      ? [
          { symbol: "GH.12M", value: summary.total.toLocaleString("en-IE"), note: "contributions", trend: "up" as const },
          { symbol: "GH.4W", value: String(summary.last4), note: "last four weeks", trend: summary.last4 >= summary.prior4 ? ("up" as const) : ("flat" as const) },
        ]
      : []),
    { symbol: "TCD", value: "YR 2", note: "Computer Science & Business" },
    { symbol: "LC", value: "602", note: "points" },
    { symbol: "DUB", value: "53.34°N", note: "6.26°W" },
    { symbol: "SHIP", value: "theoryprep.ie", note: "live", trend: "up" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: portfolio.name,
        url: siteUrl,
        email: `mailto:${portfolio.email}`,
        jobTitle: portfolio.role,
        description: siteDescription,
        address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
        alumniOf: portfolio.educationHistory.map((entry) => ({ "@type": "EducationalOrganization", name: entry.institution })),
        affiliation: { "@type": "CollegeOrUniversity", name: "Trinity College Dublin", url: "https://www.tcd.ie" },
        knowsLanguage: portfolio.spokenLanguages,
        knowsAbout: ["Software development", "Algorithmic trading", "Data visualisation", "Next.js", "Python", "Java"],
        sameAs: [portfolio.links.github.href, portfolio.links.linkedin.href],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: portfolio.name,
        description: siteDescription,
        inLanguage: "en-IE",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "WebApplication",
        "@id": `${theoryPrep.url}/#app`,
        name: "TheoryPrep",
        url: theoryPrep.url,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description: "Free Irish driving theory test practice with 805 questions, topic practice and timed 40-question mock tests.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        creator: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Ticker label="Ticker">
        {quotes.map((quote) => (
          <li className="flex items-center gap-2 border-r border-on-ink/20 px-4 py-2 font-mono text-[0.72rem] whitespace-nowrap" key={quote.symbol}>
            <span className="font-semibold">{quote.symbol}</span>
            <span>{quote.value}</span>
            {quote.trend === "up" && (
              <span aria-label="rising" className="text-[var(--heat-2)]">
                ▲
              </span>
            )}
            <span className="opacity-75">{quote.note}</span>
          </li>
        ))}
      </Ticker>
      <SiteHeader />
      <main id="main">
        <FrontPage printedAt={build.date} />
        <TheoryPrepFeature />
        <Projects />
        <Activity calendar={calendar} />
        <ExperienceLedger />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
      <CommandIndex />
      <TestDrive />
    </>
  );
}
