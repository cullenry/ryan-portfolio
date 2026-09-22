import { GithubActivity } from "@/components/ui/github-activity";
import { ProfileLink } from "@/components/ui/profile-link";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-[#e5e7eb]"
      id="top"
    >
      <div className="mx-auto grid min-h-[calc(100svh-129px)] max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] lg:gap-20 lg:py-32">
        <div className="max-w-3xl">
          <h1
            className="hero-reveal hero-reveal--1 max-w-3xl text-5xl font-semibold tracking-[-0.065em] text-[#171a21] sm:text-7xl lg:text-[7.25rem] lg:leading-[0.92]"
            id="hero-heading"
          >
            <span className="name-drift name-drift--ryan">Ryan</span>{" "}
            <span className="name-drift name-drift--cullen">Cullen</span>
          </h1>
          <p className="hero-reveal hero-reveal--2 mt-5 text-[11px] font-semibold tracking-[0.18em] text-[#6b7280] uppercase">
            Based in Dublin, Ireland
          </p>
          <p className="hero-reveal hero-reveal--3 editorial mt-8 max-w-xl text-lg leading-8 text-[#6b7280] sm:text-xl">
            {portfolio.introduction}
          </p>
          <p className="hero-reveal hero-reveal--4 mt-6 max-w-xl text-sm font-medium leading-7 text-[#171a21] sm:text-base">
            Studying{" "}
            <a
              aria-label={`${portfolio.education.degree} course page (opens in a new tab)`}
              className="group underline decoration-[#b9c9f4] underline-offset-4 transition-colors hover:text-[#5b7cfa] hover:decoration-[#5b7cfa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b7cfa]"
              href={portfolio.education.courseUrl}
              rel="noreferrer"
              target="_blank"
            >
              {portfolio.education.degree}
              <svg
                aria-hidden="true"
                className="ml-1 inline-block size-3.5 align-[0.05em] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5 3h8v8M13 3 3 13"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </a>{" "}
            at {portfolio.education.institution}.
          </p>
          <div className="hero-reveal hero-reveal--5 mt-8 inline-flex items-center gap-2 border border-[#d9e4ff] bg-[#eef3ff]/80 px-3 py-2 text-xs font-medium text-[#5b7cfa]">
            <span aria-hidden="true" className="status-indicator size-1.5 rounded-full bg-[#5b7cfa]" />
            {portfolio.status}
          </div>
          <div className="hero-reveal hero-reveal--6 mt-10 flex flex-wrap gap-3" aria-label="Profile links">
            <ProfileLink link={portfolio.links.github} variant="primary" />
            <ProfileLink link={portfolio.links.linkedin} />
            <ProfileLink link={portfolio.links.cv} />
          </div>
        </div>
        <div className="hero-reveal hero-reveal--4">
          <GithubActivity username="cullenry" />
        </div>
      </div>
    </section>
  );
}
