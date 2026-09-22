import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { PortfolioSections } from "@/components/sections/portfolio-sections";
import { AmbientBackground } from "@/components/ui/ambient-background";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <SiteHeader />
      <main>
        <Hero />
        <PortfolioSections />
      </main>
    </>
  );
}
