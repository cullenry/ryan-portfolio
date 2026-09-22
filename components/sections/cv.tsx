"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AmbientBackground } from "@/components/ui/ambient-background";

type TimelineItemProps = {
  children: ReactNode;
  last?: boolean;
};

type SimpleEntryProps = {
  title: string;
  subtitle?: string;
  date?: string;
};

type CvSectionProps = {
  title: string;
  children: ReactNode;
};

function TimelineItem({ children, last = false }: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      {!last && (
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-3 h-full w-px bg-slate-200"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute left-0 top-2 size-4 rounded-full border-4 border-white bg-slate-300 shadow-[0_0_0_1px_rgba(203,213,225,0.8)]"
      />

      {children}
    </div>
  );
}

function CvSection({ title, children }: CvSectionProps) {
  return (
    <section className="break-inside-avoid">
      <div className="flex items-center gap-4">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
          {title}
        </h2>

        <div className="h-px flex-1 bg-slate-200" />
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
    <div className="flex flex-col gap-1 border-b border-slate-100 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <h3 className="font-semibold text-slate-950">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {date && (
        <p className="shrink-0 text-sm text-slate-500">
          {date}
        </p>
      )}
    </div>
  );
}

import { Fragment } from 'react'; // 1. Add this import at the top of your file

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
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
      {skills.map((skill) => (
        /* 2. Replace the empty <> with <Fragment key={skill}> */
        <Fragment key={skill}>
          {/* Force a new line by inserting a full-width element right before Digital Literacy */}
          {skill === "Digital Literacy" && <div className="h-0 w-full" />}
          
          <span className="before:mr-2 before:text-slate-300 before:content-['•']">
            {skill}
          </span>
        </Fragment>
      ))}
    </div>
  );
}



function SimplifiedCv() {
  return (
    <article className="overflow-hidden border border-slate-200 bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.45)] print:border-0 print:shadow-none">
      <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        {/* Header */}
        <header>
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Curriculum Vitae
          </p>

          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-5xl font-semibold tracking-[-0.065em] text-slate-950 sm:text-6xl">
                Ryan Cullen
              </h1>

              <p className="mt-3 text-sm font-medium tracking-wide text-slate-500">
                COMPUTER SCIENCE &amp; BUSINESS STUDENT
              </p>
            </div>

            <div className="space-y-1 text-left text-sm text-slate-500 sm:text-right">
              <p>Lucan, Co. Dublin</p>

              <a
                href="mailto:ryancullen172@gmail.com"
                className="block transition-colors hover:text-slate-950"
              >
                ryancullen172@gmail.com
              </a>

            </div>
          </div>

          <div className="mt-8 h-px bg-slate-200" />

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
            <span>Business &amp; Computer Science</span>
            <span>Trinity College Dublin</span>
            <span>Dublin, Ireland</span>
          </div>
        </header>

        {/* Content */}
        <div className="mt-12 space-y-12">
          <CvSection title="Work Experience">
            <div className="space-y-6">
              <SimpleEntry
                title="SuperValu"
                subtitle="Pick and Pack"
                date="May 2026 – Present"
              />

              <SimpleEntry
                title="Brown Thomas Dublin"
                subtitle="Online Pick and Pack"
                date="October 2025 – December 2025"
              />

              <SimpleEntry
                title="Dunnes Stores"
                subtitle="Floor Staff | TY Work Experience"
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

          <CvSection title="Education">
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

          <CvSection title="Skills">
            <SimpleSkills />
          </CvSection>

          <CvSection title="Languages">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              <span>• English</span>
              <span>• Irish</span>
              <span>• Java</span>
              <span>• Python</span>
              <span>• Arm Assembly</span>
            </div>
          </CvSection>

          <CvSection title="Hobbies">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
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
    <article className="overflow-hidden border border-slate-200 bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.45)] print:border-0 print:shadow-none">
      {/* Header */}
      <header className="border-b border-slate-200 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Curriculum Vitae
            </p>

            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.065em] text-slate-950 sm:text-6xl">
              Ryan Cullen
            </h1>

            <p className="mt-3 text-sm font-medium tracking-wide text-slate-500">
              COMPUTER SCIENCE &amp; BUSINESS STUDENT
            </p>
          </div>

          <div className="space-y-2 text-left text-sm text-slate-600 sm:text-right">
            <p>Lucan, Co. Dublin</p>

            <a
              href="mailto:ryancullen172@gmail.com"
              className="block transition-colors hover:text-slate-950"
            >
              ryancullen172@gmail.com
            </a>

          </div>
        </div>

        <div className="mt-8 h-px bg-slate-200" />

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
          <span>Business &amp; Computer Science</span>
          <span>Trinity College Dublin</span>
          <span>Dublin, Ireland</span>
        </div>
      </header>

      {/* Main CV grid */}
      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="border-b border-slate-200 bg-[#f8f9fb] px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r lg:px-8">
          <div className="space-y-10">
            {/* Contact */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                Contact
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <a
                  href="mailto:ryancullen172@gmail.com"
                  className="block min-w-0 max-w-full break-all text-[clamp(0.65rem,1.2vw,0.875rem)] leading-5 transition-colors hover:text-slate-950"
                >
                  ryancullen172@gmail.com
                </a>

                <p>Lucan, Co. Dublin</p>
              </div>
            </section>

            {/* Skills */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                Skills
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm text-slate-600 marker:text-slate-400">
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
              <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                Languages
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 marker:text-slate-400">
                <li>English</li>
                <li>Irish</li>
                <li>Java</li>
                <li>Python</li>
                <li>Arm Assembly</li>
              </ul>
            </section>

            {/* Hobbies */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                Hobbies
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 marker:text-slate-400">
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
          <CvSection title="Profile">
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              I am a second-year undergraduate student at Trinity College
              Dublin studying Computer Science and Business. I am a confident,
              adaptable, and motivated individual with strong analytical and
              problem-solving skills. Skilled at communicating effectively and
              working well under pressure. Keen to gain professional
              experience and contribute positively in a dynamic workplace.
            </p>
          </CvSection>

          {/* Work Experience */}
          <CvSection title="Work Experience">
            <div className="space-y-8">
              {/* SuperValu */}
              <TimelineItem>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      SuperValu
                    </h3>

                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500">
                      Pick and Pack
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-slate-500">
                    May 2026 – Present
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-slate-400">
                  <li>
                    Online order picking and packing while maintaining
                    accuracy and efficiency.
                  </li>

                  <li>
                    Working effectively with colleagues in a fast-paced retail
                    environment.
                  </li>

                  <li>
                    Supporting customers and maintaining high standards of
                    organisation and service.
                  </li>
                </ul>
              </TimelineItem>

              {/* Brown Thomas */}
              <TimelineItem>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Brown Thomas Dublin
                    </h3>

                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500">
                      Online Pick and Pack
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-slate-500">
                    October 2025 – December 2025
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-slate-400">
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
              <TimelineItem>
                <div>
                  <h3 className="font-semibold text-slate-950">
                    Dunnes Stores
                  </h3>

                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500">
                    Floor Staff | TY Work Experience
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-slate-400">
                  <li>Stocking shelves and receiving deliveries.</li>
                  <li>Helping customers with their enquiries.</li>
                </ul>
              </TimelineItem>

              {/* Saint Helens */}
              <TimelineItem>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Saint Helens Bay Golf Resort
                    </h3>

                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500">
                      Kitchen Porter
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-slate-500">
                    June 2022 – August 2022
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-slate-400">
                  <li>Food preparation and kitchen support.</li>

                  <li>Managed inventory levels.</li>

                  <li>
                    Communicated effectively with colleagues and worked well
                    under pressure.
                  </li>

                  <li>
                    Reference: Damian Long (083-107-5823) – Manager.
                  </li>
                </ul>
              </TimelineItem>

              {/* Vertical.ie */}
              <TimelineItem last>
                <div>
                  <h3 className="font-semibold text-slate-950">
                    Vertical.ie – The Access Platform Hire, Sales &amp; Service
                    Company
                  </h3>

                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500">
                    Managed Construction Vehicles | TY Work Experience
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-slate-400">
                  <li>
                    Managed construction vehicles, including painting,
                    refuelling and testing functionality.
                  </li>

                  <li>
                    Reference: Colm Brennan (086-388-9819).
                  </li>
                </ul>
              </TimelineItem>
            </div>
          </CvSection>

          {/* Education */}
          <CvSection title="Education">
            <div className="space-y-8">
              <TimelineItem>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Trinity College Dublin
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Bachelor of Science (Joint Honours), Business and
                      Computer Science
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      College Green, Dublin 2
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-slate-500">
                    2025 – Present
                  </p>
                </div>

                <p className="mt-3 text-xs font-medium tracking-wide text-slate-400 uppercase">
                  Second year · Expected graduation: 2029
                </p>
              </TimelineItem>

              <TimelineItem last>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Institute Of Education
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Leaving Certificate Examination
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      79–85 Lower Leeson Street, Dublin 2
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-slate-500">
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

export function Cv() {
  const [view, setView] = useState<"full" | "simple">("full");

  return (
    <>
      <AmbientBackground />
      <main className="cv-shell min-h-screen bg-transparent text-[#171a21]">
      {/* Toolbar */}
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 print:hidden">
        <Link
          href="/"
          className="w-fit text-sm font-semibold tracking-[-0.02em] text-[#171a21] transition-colors hover:text-[#5b7cfa]"
        >
          Ryan Cullen<span className="text-slate-400">.</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center gap-1 border border-[#e5e7eb] bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setView("full")}
              aria-pressed={view === "full"}
              className={`rounded-full px-3.5 py-2 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b7cfa] ${
                view === "full"
                  ? "bg-[#171a21] text-white shadow-sm hover:bg-[#2b3038]"
                  : "text-[#6b7280] hover:bg-[#eef3ff] hover:text-[#5b7cfa] hover:shadow-sm"
              }`}
            >
              Full CV
            </button>

            <button
              type="button"
              onClick={() => setView("simple")}
              aria-pressed={view === "simple"}
              className={`rounded-full px-3.5 py-2 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b7cfa] ${
                view === "simple"
                  ? "bg-[#171a21] text-white shadow-sm hover:bg-[#2b3038]"
                  : "text-[#6b7280] hover:bg-[#eef3ff] hover:text-[#5b7cfa] hover:shadow-sm"
              }`}
            >
              Simplified CV
            </button>
          </div>

          {/* Print */}
          <button
            type="button"
            onClick={() => window.print()}
            className="border border-[#e5e7eb] bg-white px-4 py-2.5 text-xs font-medium text-[#171a21] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#5b7cfa] hover:text-[#5b7cfa] hover:shadow-md"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* CV */}
      <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-20 print:px-0 print:pb-0">
        {view === "full" ? <FullCv /> : <SimplifiedCv />}
      </div>

      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          html,
          body {
            background: white !important;
          }

          body {
            color: #020617 !important;
          }

          a {
            color: inherit !important;
            text-decoration: none !important;
          }

          .break-inside-avoid {
            break-inside: avoid;
          }

          section {
            break-inside: avoid;
          }

          button {
            display: none !important;
          }
        }
      `}</style>
      </main>
    </>
  );
}