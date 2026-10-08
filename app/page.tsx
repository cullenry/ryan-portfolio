import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Activity } from "@/components/sections/activity";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { ExperienceLedger } from "@/components/sections/experience";
import { FrontPage } from "@/components/sections/front-page";
import { Projects } from "@/components/sections/projects";
import { TheoryPrepFeature } from "@/components/sections/theoryprep";
import { JsonLd } from "@/components/ui/json-ld";
import { TestDrive } from "@/components/ui/test-drive";
import { Ticker } from "@/components/ui/ticker";
import { portfolio, theoryPrep } from "@/data/portfolio";
import { getGithubActivity } from "@/lib/github";
import { build, siteDescription, siteUrl } from "@/lib/site";

type Quote = { symbol: string; value: string; note: string };

export default async function Home() {
  const calendar = await getGithubActivity(portfolio.githubUsername);

  const quotes: Quote[] = [
    { symbol: "TPREP", value: "805", note: "practice questions" },
    { symbol: "MOCK", value: "40 Q · 45 MIN", note: "35 to pass" },
    { symbol: "TCD", value: "YR 2", note: "Computer Science & Business" },
    { symbol: "LC", value: "602", note: "points" },
    { symbol: "NOW", value: "BUILDING", note: "theoryprep.ie" },
    { symbol: "DUB", value: "53.34°N", note: "6.26°W" },
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
        alumniOf: { "@type": "EducationalOrganization", name: "Institute of Education" },
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
          <li className="flex items-center gap-2 border-r border-on-band/20 px-4 py-2 font-mono text-[0.72rem] whitespace-nowrap" key={quote.symbol}>
            <span className="font-semibold">{quote.symbol}</span>
            <span>{quote.value}</span>
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
      <TestDrive />
    </>
  );
}
