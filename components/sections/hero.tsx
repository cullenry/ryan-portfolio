import { GithubActivity } from "@/components/ui/github-activity";
import { CommandCenter } from "@/components/ui/command-center";
import { ProfileLink } from "@/components/ui/profile-link";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-white/10"
      id="top"
    >
      <div className="mx-auto grid min-h-[calc(100svh-92px)] max-w-7xl items-start gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)] lg:gap-20 lg:py-32">
        <div className="max-w-3xl">
          <h1
            className="hero-reveal hero-reveal--1 max-w-3xl text-5xl font-semibold tracking-[-0.075em] text-white sm:text-7xl lg:text-[7.5rem] lg:leading-[0.88]"
            id="hero-heading"
          >
            <span className="name-pulse">
              <span className="name-drift name-drift--first">Ryan</span>{" "}
              <span className="name-drift name-drift--last">Cullen</span>
            </span>
          </h1>
          <p className="hero-reveal hero-reveal--2 mt-6 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
            <span className="text-teal-300">📍</span> Based in Dublin, IE <span className="text-slate-600">/</span> Trinity College Dublin
          </p>
          <p className="hero-reveal hero-reveal--3 mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            {portfolio.introduction}
          </p>
          <p className="hero-reveal hero-reveal--4 mt-6 max-w-xl text-sm font-medium leading-7 text-slate-400 sm:text-base">
            Studying{" "}
            <a
              aria-label={`${portfolio.education.degree} course page (opens in a new tab)`}
              className="group text-slate-100 underline decoration-violet-400/60 underline-offset-4 transition-colors hover:text-violet-300 hover:decoration-violet-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
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
          <div className="hero-reveal hero-reveal--5 mt-10 flex flex-wrap gap-3" aria-label="Profile links">
            <ProfileLink link={portfolio.links.github} variant="primary" />
            <ProfileLink link={portfolio.links.linkedin} />
            <ProfileLink link={portfolio.links.cv} />
          </div>
        </div>
        <div className="hero-reveal hero-reveal--4 space-y-5">
          <CommandCenter />
          <GithubActivity username="cullenry" />
        </div>
      </div>
    </section>
  );
}
