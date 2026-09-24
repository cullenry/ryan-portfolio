import { portfolio } from "@/data/portfolio";
import { ScrollTypewriter } from "@/components/ui/scroll-typewriter";

function SectionIntro({ eyebrow, title, detail }: { eyebrow: string; title: string; detail?: string }) {
  const sectionName = eyebrow.split(" / ")[1]?.toLowerCase() ?? "section";

  return (
    <div className="mb-10 max-w-2xl">
      <p className="section-prompt mb-3"><span className="text-violet-300">➜</span> cat /{sectionName}.md <span className="section-prompt__meta">{eyebrow.split(" / ")[0]}</span></p>
      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">{title}</h2>
      {detail && <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">{detail}</p>}
    </div>
  );
}

export function PortfolioSections() {
  return (
    <div className="border-t border-white/10">
      <section className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32" id="about">
        <SectionIntro eyebrow="01 / About" title="Who I am." />
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:gap-24">
          <p className="max-w-2xl text-lg leading-9 text-slate-300">{portfolio.about}</p>
          <div className="glass-panel p-6" id="skills">
            <p className="mb-5 font-mono text-xs font-semibold tracking-[0.16em] text-violet-300 uppercase"><span className="text-teal-300">➜</span> cat /currently.json</p>
            <dl className="grid gap-4 border-t border-white/10 pt-5 text-sm">
              {portfolio.currently.map((item) => (
                <div className="grid grid-cols-[5.5rem_1fr] gap-4" key={item.label}>
                  <dt className="text-slate-500">{item.label}</dt>
                  <dd className="font-medium text-slate-100">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-20 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
          {Object.entries(portfolio.skills).map(([category, skills], index) => (
            <div key={category}>
              <p className="mb-4 font-mono text-xs text-slate-500">0{index + 1}</p>
              <h3 className="mb-4 text-sm font-semibold text-white">{category}</h3>
              <p className="text-sm leading-7 text-slate-400">{skills.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-white/10" id="projects">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionIntro eyebrow="02 / Projects" title="My Projects." detail="A selection of things I have built to understand the systems behind the interface." />
          <div className="grid gap-5 md:grid-cols-2">
            {portfolio.projects.map((project, index) => (
              <article className={`project-card group ${index % 2 === 0 ? "project-card--violet" : "project-card--teal"}`} key={project.name}>
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                  <span className="project-dot" aria-hidden="true" />
                </div>
                <div className="mt-14">
                  <span className="project-tag">{index % 2 === 0 ? "TECH / BUILD" : "STRATEGY / SYSTEMS"}</span>
                  <h3 className="mt-4 max-w-sm text-2xl font-semibold tracking-[-0.04em] text-white">{project.name}</h3>
                  <p className="mt-3 text-[11px] font-semibold tracking-[0.12em] text-slate-500 uppercase">{project.stack}</p>
                </div>
                <p className="mt-7 max-w-lg text-sm leading-7 text-slate-400">{project.description}</p>
                <div className="mt-auto border-t border-white/10 pt-6 text-sm leading-6 text-slate-200">
                  <ScrollTypewriter lines={project.details} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32" id="experience">
        <SectionIntro eyebrow="03 / Experience" title="Learning on the job." />
        <div className="border-t border-white/10">
          {portfolio.experience.map((item, index) => (
            <div className="experience-row" key={`${item.company}-${item.role}`}>
              <span className="font-mono text-xs text-teal-300/80">0{index + 1}</span>
              <div><h3 className="font-semibold text-white">{item.company}</h3><p className="mt-1 text-sm text-slate-400">{item.role}</p></div>
              {item.date && <p className="text-sm text-slate-500">{item.date}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-white/10" id="education">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionIntro eyebrow="04 / Education" title="Where systems meet strategy." />
          <div className="grid gap-5 md:grid-cols-2">
            {portfolio.educationHistory.map((item, index) => (
              <article className="glass-panel p-6 sm:p-8" key={item.institution}>
                <div className="flex items-baseline justify-between gap-4"><span className="font-mono text-xs text-violet-300">0{index + 1}</span><p className="text-sm text-slate-500">{item.date}</p></div>
                <h3 className="mt-10 text-xl font-semibold text-white">{item.institution}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.course}</p>
                <p className="mt-5 text-sm font-medium text-teal-200">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-white/10" id="contact">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="contact-panel max-w-4xl">
            <p className="section-prompt"><span className="text-violet-300">➜</span> open /contact <span className="section-prompt__meta">05</span></p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-8xl"><span className="gradient-text">Get in touch.</span></h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">Whether it&apos;s a project, an opportunity, or you just want to say hello, feel free to get in touch.</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm font-medium">
              <a className="text-white underline decoration-teal-300/60 underline-offset-8 transition-colors hover:text-teal-300" href="mailto:cullenry@tcd.ie">cullenry@tcd.ie</a>
              <a className="text-slate-400 transition-colors hover:text-violet-300" href={portfolio.links.github.href} rel="noreferrer" target="_blank">GitHub ↗</a>
              <a className="text-slate-400 transition-colors hover:text-violet-300" href={portfolio.links.linkedin.href} rel="noreferrer" target="_blank">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
