import type { ReactNode } from "react";
import { portfolio, theoryPrep } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

const displayUrl = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="flex break-after-avoid items-center gap-3 font-sans text-[0.7rem] font-bold tracking-[0.18em] text-ink uppercase [font-stretch:80%]">
        {title}
        <span aria-hidden="true" className="h-px flex-1 bg-ink" />
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Entry({ title, subtitle, meta, date, children }: { title: string; subtitle?: string; meta?: string; date?: string; children?: ReactNode }) {
  return (
    <div className="print-break-avoid">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:items-baseline print:justify-between">
        <h3 className="font-serif text-[1.2rem] leading-tight font-semibold print:text-[11.5pt]">{title}</h3>
        {date && <p className="shrink-0 font-mono text-xs text-ink-2 print:text-[8.5pt]">{date}</p>}
      </div>
      {subtitle && <p className="mt-0.5 font-sans text-sm font-semibold text-ink-2 print:text-[9.5pt]">{subtitle}</p>}
      {meta && <p className="font-sans text-sm text-ink-3 print:text-[9pt]">{meta}</p>}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 font-serif text-[0.98rem] leading-snug text-ink-2 print:text-[10pt]">
      {items.map((item) => (
        <li className="grid grid-cols-[1rem_1fr]" key={item}>
          <span aria-hidden="true">–</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Header({ compact = false }: { compact?: boolean }) {
  const contacts = [
    { label: portfolio.email, href: portfolio.links.email.href },
    { label: displayUrl(portfolio.links.github.href), href: portfolio.links.github.href },
    { label: "LinkedIn", href: portfolio.links.linkedin.href },
    { label: displayUrl(siteUrl), href: siteUrl },
  ];

  return (
    <header>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:flex-row print:items-end print:justify-between">
        <div>
          <p className="kicker">Curriculum vitae</p>
          <h1 className={`mt-1 font-serif leading-[0.85] font-[400] tracking-[-0.04em] ${compact ? "text-6xl print:text-[38pt]" : "text-[clamp(3.5rem,9vw,5.5rem)] print:text-[44pt]"}`}>
            Ryan <span className="font-[300] italic">Cullen</span>
          </h1>
        </div>
        <p className="font-sans text-sm leading-snug font-semibold sm:text-right print:text-right print:text-[9.5pt]">
          {portfolio.role}
          <br />
          <span className="font-normal text-ink-2">
            {portfolio.education.institution} · {portfolio.location}
          </span>
        </p>
      </div>
      <div className="rule-double mt-4" />
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-ink-2 print:text-[8.5pt]">
        {contacts.map((contact) => (
          <li key={contact.href}>
            <a className="link" href={contact.href}>
              {contact.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

export function FullCv() {
  return (
    <article className="cv-sheet">
      <Header />
      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-12 print:mt-6 print:grid-cols-[minmax(0,1fr)_42mm] print:gap-8">
        <div className="space-y-9 print:space-y-5">
          <Section title="Profile">
            <p className="max-w-[68ch] font-serif text-[1.05rem] leading-relaxed print:text-[10pt]">{portfolio.cvProfile}</p>
          </Section>

          <Section title="Projects">
            <div className="space-y-5 print:space-y-3">
              {portfolio.projects
                .filter((project) => project.slug !== "portfolio")
                .map((project) => (
                  <Entry
                    date={project.slug === "theoryprep" ? displayUrl(theoryPrep.url) : undefined}
                    key={project.slug}
                    subtitle={project.slug === "theoryprep" ? "Creator & developer · Live product" : project.role}
                    title={project.name}
                  >
                    <p className="font-serif text-[0.98rem] leading-snug text-ink-2 print:text-[10pt]">{project.cvLine}</p>
                  </Entry>
                ))}
            </div>
          </Section>

          <Section title="Work experience">
            <div className="space-y-5 print:space-y-3">
              {portfolio.experience.map((item) => (
                <Entry
                  date={item.date}
                  key={`${item.company}-${item.role}`}
                  meta={[item.descriptor, item.context].filter(Boolean).join(" · ") || undefined}
                  subtitle={item.role}
                  title={item.company}
                >
                  <Bullets items={item.details} />
                </Entry>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="space-y-5 print:space-y-3">
              {portfolio.educationHistory.map((entry) => (
                <Entry
                  date={entry.date}
                  key={entry.institution}
                  meta={entry.award ? entry.detail : entry.figure ? `${entry.figure.value} ${entry.figure.label}` : undefined}
                  subtitle={entry.award ?? entry.detail}
                  title={entry.institution}
                />
              ))}
            </div>
          </Section>
        </div>

        <aside className="space-y-8 md:pl-4 print:space-y-5">
          {Object.entries(portfolio.skills).map(([group, items]) => (
            <Section key={group} title={group}>
              <ul className="space-y-1 font-serif text-[0.98rem] text-ink-2 print:text-[9.5pt]">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          ))}
          <Section title="Spoken languages">
            <p className="font-serif text-ink-2 print:text-[9.5pt]">{portfolio.spokenLanguages.join(", ")}</p>
          </Section>
          <Section title="Interests">
            <p className="font-serif text-ink-2 print:text-[9.5pt]">{portfolio.interests.join(", ")}</p>
          </Section>
        </aside>
      </div>
    </article>
  );
}

export function SimpleCv() {
  return (
    <article className="cv-sheet">
      <Header compact />
      <div className="mt-8 space-y-7 print:mt-6 print:space-y-5">
        <Section title="Profile">
          <p className="max-w-[72ch] font-serif text-[1.05rem] leading-relaxed print:text-[10pt]">{portfolio.cvProfile}</p>
        </Section>
        <Section title="Work experience">
          <div className="space-y-3">
            {portfolio.experience.map((item) => (
              <Entry
                date={item.date ?? item.context}
                key={`${item.company}-${item.role}`}
                subtitle={item.role}
                title={item.company}
              />
            ))}
          </div>
        </Section>
        <Section title="Education">
          <div className="space-y-3">
            {portfolio.educationHistory.map((entry) => (
              <Entry date={entry.date} key={entry.institution} subtitle={entry.award ?? entry.detail} title={entry.institution} />
            ))}
          </div>
        </Section>
        <Section title="Selected projects">
          <ul className="space-y-1.5 font-serif text-ink-2 print:text-[10pt]">
            {portfolio.projects.slice(0, 3).map((project) => (
              <li key={project.slug}>
                <strong className="font-semibold text-ink">{project.name}.</strong> {project.cvLine}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Skills">
          <p className="font-serif text-ink-2 print:text-[10pt]">
            {[...portfolio.skills.Languages, ...portfolio.skills["Frameworks & tools"].slice(0, 6)].join(" · ")}
          </p>
          <p className="mt-2 font-serif text-ink-2 print:text-[10pt]">
            {portfolio.spokenLanguages.join(" and ")} speaker. Interests: {portfolio.interests.join(", ").toLowerCase()}.
          </p>
        </Section>
      </div>
    </article>
  );
}
