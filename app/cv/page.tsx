import type { Metadata } from "next";
import { CvView } from "@/components/cv/cv-view";
import { FullCv, SimpleCv } from "@/components/cv/cv-document";
import { SiteHeader } from "@/components/layout/site-header";
import { CommandIndex } from "@/components/ui/command-index";
import { portfolio } from "@/data/portfolio";

const description = `CV of ${portfolio.name}: ${portfolio.role} at Trinity College Dublin. Projects including TheoryPrep, work experience, education and skills.`;

export const metadata: Metadata = {
  title: "CV",
  description,
  alternates: { canonical: "/cv" },
  openGraph: { title: `CV · ${portfolio.name}`, description, url: "/cv" },
  twitter: { title: `CV · ${portfolio.name}`, description },
};

export default function CvPage() {
  return (
    <>
      <SiteHeader home={false} />
      <main id="main">
        <CvView full={<FullCv />} simple={<SimpleCv />} />
      </main>
      <CommandIndex />
    </>
  );
}
