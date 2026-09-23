"use client";

import Link from "next/link";
import { Fragment, useState, type ReactNode } from "react";
import { DoorMark } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type TimelineItemProps = {
  children: ReactNode;
  color: string;
  last?: boolean;
};

type SimpleEntryProps = {
  title: string;
  subtitle?: string;
  date?: string;
};

type CvSectionProps = {
  title: string;
  color?: string;
  children: ReactNode;
};

function TimelineItem({ children, color, last = false }: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      {!last && (
        <div
          aria-hidden="true"
          className="absolute top-3 left-[7px] h-full w-px bg-line-strong"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute top-1.5 left-0 size-4 rounded-full border-[3px] border-card print:border-white"
        style={{ backgroundColor: color }}
      />

      {children}
    </div>
  );
}

function CvSection({ title, color = "var(--tomato)", children }: CvSectionProps) {
  return (
    <section className="break-inside-avoid">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-3 w-2.5 rounded-t-full"
          style={{ backgroundColor: color }}
        />
        <h2 className="text-xs font-bold tracking-[0.18em] text-ink-soft uppercase">
          {title}
        </h2>

        <div className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-7">{children}</div>
    </section>
  );
}

function SimpleEntry({
  title,
  subtitle,
  date,
}: SimpleEntryProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-line pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <h3 className="font-serif text-lg font-semibold text-ink">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 text-sm text-ink-soft">
            {subtitle}
          </p>
        )}
      </div>

      {date && (
        <p className="shrink-0 text-sm text-ink-soft">
          {date}
        </p>
      )}
    </div>
  );
}

function SimpleSkills() {
  const skills = [
    "Problem Solving",
    "Creative Thinking",
    "Teamwork",
    "Communication",
    "Adaptability",
    "Time Management",
    "Reliability",
    "Digital Literacy",
    "Organisation",
  ];

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
      {skills.map((skill) => (
        <Fragment key={skill}>
          {/* Force a new line by inserting a full-width element right before Digital Literacy */}
          {skill === "Digital Literacy" && <div className="h-0 w-full" />}

          <span className="before:mr-2 before:text-tomato before:content-['•']">
            {skill}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

const cvCardClassName =
  "overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-[0_30px_80px_-55px_rgba(31,27,45,0.45)] print:rounded-none print:border-0 print:shadow-none";

function CvName() {
  return (
    <>
      <h1 className="display mt-3 text-5xl font-semibold text-ink sm:text-6xl">
        Ryan Cullen<span className="text-tomato">.</span>
      </h1>

      <p className="mt-3 text-sm font-semibold tracking-wide text-ink-soft">
        COMPUTER SCIENCE &amp; BUSINESS STUDENT
      </p>
    </>
  );
}

function SimplifiedCv() {
  return (
    <article className={cvCardClassName}>
      <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        {/* Header */}
        <header>
          <p className="text-xs font-bold tracking-[0.18em] text-tomato-ink uppercase">
            Curriculum Vitae
          </p>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <CvName />
            </div>

            <div className="space-y-1 text-left text-sm text-ink-soft sm:text-right">
              <p>Dublin, Ireland</p>

              <a
                href="mailto:cullenry@tcd.ie"
                className="block transition-colors hover:text-tomato-ink"
              >
                cullenry@tcd.ie
              </a>

            </div>
          </div>

          <div className="mt-8 h-px bg-line" />

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft">
            <span>Business &amp; Computer Science</span>
            <span>Trinity College Dublin</span>
            <span>Dublin, Ireland</span>
          </div>
        </header>

        {/* Content */}
        <div className="mt-12 space-y-12">
          <CvSection title="Work Experience" color="var(--tomato)">
            <div className="space-y-6">
              <SimpleEntry
                title="SuperValu"
                subtitle="Retail Assistant"
                date="May 2026 – Present"
              />

              <SimpleEntry
                title="Brown Thomas Dublin"
                subtitle="Online Pick and Pack"
                date="October 2025 – December 2025"
              />

              <SimpleEntry
                title="Dunnes Stores"
                subtitle="Retail Assistant | TY Work Experience"
              />

              <SimpleEntry
                title="Saint Helens Bay Golf Resort"
                subtitle="Kitchen Porter"
                date="June 2022 – August 2022"
              />

              <SimpleEntry
                title="Vertical.ie"
                subtitle="Managed Construction Vehicles | TY Work Experience"
              />
            </div>
          </CvSection>

          <CvSection title="Education" color="var(--cobalt)">
            <div className="space-y-6">
              <SimpleEntry
                title="Trinity College Dublin"
                subtitle="Business and Computer Science · Second Year"
                date="2025 – Present"
              />

              <SimpleEntry
                title="Institute Of Education"
                subtitle="Leaving Certificate Examination"
                date="2023 – 2025"
              />
            </div>
          </CvSection>

          <CvSection title="Skills" color="var(--clover)">
            <SimpleSkills />
          </CvSection>

          <CvSection title="Languages" color="var(--marigold)">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
              <span>• English</span>
              <span>• Irish</span>
              <span>• Java</span>
              <span>• Python</span>
              <span>• Arm Assembly</span>
            </div>
          </CvSection>

          <CvSection title="Hobbies" color="var(--plum)">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
              <span>• Football</span>
              <span>• Reading</span>
              <span>• Playing Piano</span>
            </div>
          </CvSection>
        </div>
      </div>
    </article>
  );
}

function FullCv() {
  return (
    <article className={cvCardClassName}>
      {/* Header */}
      <header className="border-b border-line px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-tomato-ink uppercase">
              Curriculum Vitae
            </p>

            <CvName />
          </div>

          <div className="space-y-2 text-left text-sm text-ink-soft sm:text-right">
            <p>Dublin, Ireland</p>

            <a
              href="mailto:cullenry@tcd.ie"
              className="block transition-colors hover:text-tomato-ink"
            >
              cullenry@tcd.ie
            </a>

          </div>
        </div>

        <div className="mt-8 h-px bg-line" />

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft">
          <span>Business &amp; Computer Science</span>
          <span>Trinity College Dublin</span>
          <span>Dublin, Ireland</span>
        </div>
      </header>

      {/* Main CV grid */}
      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="border-b border-line bg-paper-deep/50 px-6 py-10 sm:px-10 lg:border-r lg:border-b-0 lg:px-8">
          <div className="space-y-10">
            {/* Contact */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold tracking-[0.18em] text-tomato-ink uppercase">
                Contact
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-6 text-ink-soft">
                <a
                  href="mailto:cullenry@tcd.ie"
                  className="block max-w-full min-w-0 text-[clamp(0.65rem,1.2vw,0.875rem)] leading-5 break-all transition-colors hover:text-tomato-ink"
                >
                  cullenry@tcd.ie
                </a>

                <p>Dublin, Ireland</p>
              </div>
            </section>

            {/* Skills */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold tracking-[0.18em] text-clover uppercase dark:text-marigold">
                Skills
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm text-ink-soft marker:text-clover">
                <li>Problem Solving</li>
                <li>Creative Thinking</li>
                <li>Teamwork</li>
                <li>Communication</li>
                <li>Adaptability</li>
                <li>Time Management</li>
                <li>Reliability</li>
                <li>Digital Literacy</li>
                <li>Organisation</li>
              </ul>
            </section>

            {/* Languages */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold tracking-[0.18em] text-cobalt uppercase dark:text-sea">
                Languages
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft marker:text-cobalt">
                <li>English</li>
                <li>Irish</li>
                <li>Java</li>
                <li>Python</li>
                <li>Arm Assembly</li>
              </ul>
            </section>

            {/* Hobbies */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold tracking-[0.18em] text-plum uppercase dark:text-blush">
                Hobbies
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft marker:text-plum">
                <li>Football</li>
                <li>Reading</li>
                <li>Playing Piano</li>
              </ul>
            </section>
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-12 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          {/* Profile */}
          <CvSection title="Profile" color="var(--marigold)">
            <p className="max-w-3xl font-serif text-[1.05rem] leading-8 text-ink">
              I am a second-year undergraduate student at Trinity College
              Dublin studying Computer Science and Business. I am a confident,
              adaptable, and motivated individual with strong analytical and
              problem-solving skills. Skilled at communicating effectively and
              working well under pressure. Keen to gain professional
              experience and contribute positively in a dynamic workplace.
            </p>
          </CvSection>

          {/* Work Experience */}
          <CvSection title="Work Experience" color="var(--tomato)">
            <div className="space-y-8">
              {/* SuperValu */}
              <TimelineItem color="var(--tomato)">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      SuperValu
                    </h3>

                    <p className="mt-1 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                      Retail Assistant
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-ink-soft">
                    May 2026 – Present
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft marker:text-tomato">
                  <li>
                    Supporting customers in a fast-paced retail environment while
                    maintaining a helpful and professional service.
                  </li>

                  <li>
                    Working effectively with colleagues to keep store operations
                    running smoothly and efficiently.
                  </li>

                  <li>
                    Maintaining organisation and attention to detail while
                    supporting day-to-day retail tasks.
                  </li>
                </ul>
              </TimelineItem>

              {/* Brown Thomas */}
              <TimelineItem color="var(--marigold)">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      Brown Thomas Dublin
                    </h3>

                    <p className="mt-1 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                      Online Pick and Pack
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-ink-soft">
                    October 2025 – December 2025
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft marker:text-marigold">
                  <li>
                    Online order picking and packing for dispatch.
                  </li>

                  <li>
                    Assisted customers on the floor and maintained stock
                    accuracy.
                  </li>

                  <li>
                    Communicated effectively with colleagues and worked
                    efficiently under pressure.
                  </li>
                </ul>
              </TimelineItem>

              {/* Dunnes */}
              <TimelineItem color="var(--cobalt)">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    Dunnes Stores
                  </h3>

                  <p className="mt-1 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                    Retail Assistant | TY Work Experience
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft marker:text-cobalt">
                  <li>Stocking shelves and receiving deliveries.</li>
                  <li>Helping customers with their enquiries.</li>
                </ul>
              </TimelineItem>

              {/* Saint Helens */}
              <TimelineItem color="var(--clover)">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      Saint Helens Bay Golf Resort
                    </h3>

                    <p className="mt-1 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                      Kitchen Porter
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-ink-soft">
                    June 2022 – August 2022
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft marker:text-clover">
                  <li>Food preparation and kitchen support.</li>

                  <li>Managed inventory levels.</li>

                  <li>
                    Communicated effectively with colleagues and worked well
                    under pressure.
                  </li>

                </ul>
              </TimelineItem>

              {/* Vertical.ie */}
              <TimelineItem color="var(--plum)" last>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    Vertical.ie – The Access Platform Hire, Sales &amp; Service
                    Company
                  </h3>

                  <p className="mt-1 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                    Managed Construction Vehicles | TY Work Experience
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft marker:text-plum">
                  <li>
                    Managed construction vehicles, including painting,
                    refuelling and testing functionality.
                  </li>

                </ul>
              </TimelineItem>
            </div>
          </CvSection>

          {/* Education */}
          <CvSection title="Education" color="var(--cobalt)">
            <div className="space-y-8">
              <TimelineItem color="var(--cobalt)">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      Trinity College Dublin
                    </h3>

                    <p className="mt-1 text-sm font-medium text-ink-soft">
                      Bachelor of Science (Joint Honours), Business and
                      Computer Science
                    </p>

                    <p className="mt-2 text-sm text-ink-soft">
                      Dublin, Ireland
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-ink-soft">
                    2025 – Present
                  </p>
                </div>

                <p className="mt-3 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                  Second year · Expected graduation: 2029
                </p>
              </TimelineItem>

              <TimelineItem color="var(--blush)" last>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      Institute Of Education
                    </h3>

                    <p className="mt-1 text-sm font-medium text-ink-soft">
                      Leaving Certificate Examination
                    </p>

                    <p className="mt-2 text-sm text-ink-soft">
                      Dublin, Ireland
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-ink-soft">
                    2023 – 2025
                  </p>
                </div>
              </TimelineItem>
            </div>
          </CvSection>
        </div>
      </div>
    </article>
  );
}

const toggleButtonClassName =
  "rounded-full px-3.5 py-2 text-xs font-semibold transition-colors";

export function Cv() {
  const [view, setView] = useState<"full" | "simple">("full");

  return (
    <main className="min-h-screen text-ink">
      {/* Toolbar */}
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 print:hidden">
        <Link
          href="/"
          className="group flex w-fit items-center gap-2.5"
        >
          <DoorMark className="size-8 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="display text-lg font-semibold tracking-tight">
            Ryan Cullen<span className="text-tomato">.</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-full border-[1.5px] border-ink bg-card p-1">
            <button
              type="button"
              onClick={() => setView("full")}
              aria-pressed={view === "full"}
              className={`${toggleButtonClassName} ${
                view === "full"
                  ? "bg-ink text-paper"
                  : "text-ink-soft hover:bg-marigold hover:text-night"
              }`}
            >
              Full CV
            </button>

            <button
              type="button"
              onClick={() => setView("simple")}
              aria-pressed={view === "simple"}
              className={`${toggleButtonClassName} ${
                view === "simple"
                  ? "bg-ink text-paper"
                  : "text-ink-soft hover:bg-marigold hover:text-night"
              }`}
            >
              Simplified CV
            </button>
          </div>

          {/* Print */}
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full border-[1.5px] border-ink bg-tomato px-4 py-2.5 text-xs font-semibold text-cream transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)]"
          >
            Print / Save PDF
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* CV */}
      <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-20 print:px-0 print:pb-0">
        {view === "full" ? <FullCv /> : <SimplifiedCv />}
      </div>
    </main>
  );
}
