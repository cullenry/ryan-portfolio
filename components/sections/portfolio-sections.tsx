import { portfolio } from "@/data/portfolio";

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 max-w-xl">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-[#5b7cfa] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171a21] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export function PortfolioSections() {
  return (
    <div className="border-t border-[#e5e7eb]">
      <section className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32" id="about">
        <SectionIntro eyebrow="01 / About" title="A little about me." />
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:gap-24">
          <p className="max-w-2xl text-lg leading-9 text-[#6b7280]">{portfolio.about}</p>
          <div id="skills">
            <p className="mb-5 text-xs font-semibold tracking-[0.16em] text-[#171a21] uppercase">Currently</p>
            <dl className="grid gap-4 border-t border-[#e5e7eb] pt-5 text-sm">
              {portfolio.currently.map((item) => (
                <div className="grid grid-cols-[5.5rem_1fr] gap-4" key={item.label}>
                  <dt className="text-[#6b7280]">{item.label}</dt>
                  <dd className="font-medium text-[#171a21]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-20 grid gap-8 border-t border-[#e5e7eb] pt-8 md:grid-cols-3">
          {Object.entries(portfolio.skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold text-[#171a21]">{category}</h3>
              <p className="text-sm leading-7 text-[#6b7280]">{skills.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-[#e5e7eb]" id="projects">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionIntro eyebrow="02 / Projects" title="Things I've been exploring." />
          <div className="grid gap-4 md:grid-cols-2">
            {portfolio.projects.map((project, index) => (
              <article
                className="group relative flex min-h-[25rem] flex-col overflow-hidden border border-[#e5e7eb] bg-white/72 p-7 shadow-[0_18px_45px_-34px_rgba(23,26,33,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c8d6fa] hover:bg-white/90 hover:shadow-[0_24px_55px_-30px_rgba(91,124,250,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-9"
                key={project.name}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-50 bg-[#d9e4ff] transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-6">
                  <p className="text-xs font-semibold tracking-[0.12em] text-[#5b7cfa]">
                    0{index + 1}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-1 size-2 rounded-full bg-[#d9e4ff] ring-4 ring-[#eef3ff] transition-colors group-hover:bg-[#5b7cfa]"
                  />
                </div>

                <div className="mt-14">
                  <h3 className="max-w-sm text-xl font-semibold tracking-[-0.03em] text-[#171a21]">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-[11px] font-semibold tracking-[0.12em] text-[#6b7280] uppercase">
                    {project.stack}
                  </p>
                </div>

                <p className="mt-7 max-w-lg text-sm leading-7 text-[#6b7280]">
                  {project.description}
                </p>

                <ul className="mt-auto space-y-2 border-t border-[#eef0f4] pt-6 text-sm leading-6 text-[#171a21]">
                  {project.details.map((detail) => (
                    <li
                      className="before:mr-2 before:text-[#5b7cfa] before:content-['+']"
                      key={detail}
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32" id="experience">
        <SectionIntro eyebrow="03 / Experience" title="Learning through doing." />
        <div className="border-t border-[#e5e7eb]">
          {portfolio.experience.map((item) => (
            <div className="grid gap-2 border-b border-[#e5e7eb] py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8" key={`${item.company}-${item.role}`}>
              <div><h3 className="font-semibold text-[#171a21]">{item.company}</h3><p className="mt-1 text-sm text-[#6b7280]">{item.role}</p></div>
              {item.date && <p className="text-sm text-[#6b7280]">{item.date}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-[#e5e7eb]" id="education">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionIntro eyebrow="04 / Education" title="What I'm studying." />
          <div className="grid gap-8 md:grid-cols-2">
            {portfolio.educationHistory.map((item) => (
              <article className="border-t-2 border-[#d9e4ff] pt-5" key={item.institution}>
                <div className="flex items-baseline justify-between gap-4"><h3 className="font-semibold text-[#171a21]">{item.institution}</h3><p className="text-sm text-[#6b7280]">{item.date}</p></div>
                <p className="mt-2 text-sm text-[#6b7280]">{item.course}</p>
                <p className="mt-5 text-sm font-medium text-[#171a21]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-[#e5e7eb]" id="contact">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-[#5b7cfa] uppercase">05 / Contact</p>
            <h2 className="text-5xl font-semibold tracking-[-0.06em] text-[#171a21] sm:text-7xl">Let&apos;s talk.</h2>
            <p className="editorial mt-7 text-lg leading-8 text-[#6b7280]">Whether it&apos;s a project, an opportunity, or you just want to say hello, feel free to get in touch.</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm font-medium">
              <a
                className="text-[#171a21] underline decoration-[#d9e4ff] underline-offset-8 transition-colors hover:text-[#5b7cfa]"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cullenry%40tcd.ie"
                rel="noreferrer"
                target="_blank"
              >
                cullenry@tcd.ie
              </a>
              <a className="text-[#6b7280] transition-colors hover:text-[#5b7cfa]" href={portfolio.links.github.href} rel="noreferrer" target="_blank">GitHub</a>
              <a className="text-[#6b7280] transition-colors hover:text-[#5b7cfa]" href={portfolio.links.linkedin.href} rel="noreferrer" target="_blank">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}