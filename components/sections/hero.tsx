import { GithubActivity } from "@/components/ui/github-activity";
import { ProfileLink } from "@/components/ui/profile-link";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-slate-200"
      id="top"
    >
      <div className="mx-auto grid min-h-[calc(100svh-129px)] max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] lg:gap-20 lg:py-32">
        <div className="max-w-3xl">
          <p className="hero-reveal hero-reveal--1 mb-6 text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Dublin, Ireland
          </p>
          <h1
            className="hero-reveal hero-reveal--2 max-w-3xl text-5xl font-semibold tracking-[-0.065em] text-slate-950 sm:text-7xl lg:text-8xl"
            id="hero-heading"
          >
            {portfolio.name}
          </h1>
          <p className="hero-reveal hero-reveal--3 mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            {portfolio.introduction}
          </p>
          <p className="hero-reveal hero-reveal--4 mt-5 text-sm font-medium text-slate-800 sm:text-base">
            Studying{" "}
            <a
              className="underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-600 hover:decoration-slate-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
              href={portfolio.education.courseUrl}
              rel="noreferrer"
              target="_blank"
            >
              {portfolio.education.degree}
              <span className="sr-only"> course page (opens in a new tab)</span>
            </a>{" "}
            at {portfolio.education.institution}.
          </p>
          <div className="hero-reveal hero-reveal--5 mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-600">
            <span aria-hidden="true" className="status-indicator size-1.5 rounded-full bg-emerald-500" />
            {portfolio.status}
          </div>
          <div className="hero-reveal hero-reveal--6 mt-10 flex flex-wrap gap-3" aria-label="Profile links">
            <ProfileLink link={portfolio.links.github} variant="primary" />
            <ProfileLink link={portfolio.links.linkedin} />
            <ProfileLink link={portfolio.links.cv} />
          </div>
          <p className="hero-reveal hero-reveal--6 mt-5 text-xs leading-5 text-slate-500">
            Get in touch: cullenry@tcd.ie
          </p>
        </div>
        <div className="hero-reveal hero-reveal--4">
          <GithubActivity username="cullenry" />
        </div>
      </div>
    </section>
  );
}
