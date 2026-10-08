// All personal content lives here. The homepage, the CV, structured data and the
// OG image read from this file, so facts only need to change in one place.

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavigationItem = {
  label: string;
  href: string;
  page: string;
};

export type ProjectVisual = "theoryprep" | "trading" | "netflix" | "server" | "portfolio";

export type Project = {
  slug: string;
  name: string;
  kicker: string;
  headline: string;
  summary: string;
  role: string;
  stack: string[];
  details: string[];
  outcome?: string;
  links: LinkItem[];
  visual: ProjectVisual;
  /** Short line used on the CV. */
  cvLine: string;
};

export type Experience = {
  company: string;
  descriptor?: string;
  /** Shown in place of a date when there isn't one, e.g. "Transition Year". */
  context?: string;
  role: string;
  /** Free text exactly as it should read, e.g. "May 2026 – Present". */
  date?: string;
  current?: boolean;
  details: string[];
};

export type EducationEntry = {
  institution: string;
  course: string;
  award?: string;
  date: string;
  location: string;
  detail: string;
  figure?: { value: string; label: string };
  url?: string;
};

export type QuizQuestion = {
  prompt: string;
  topic: string;
  options: string[];
  answer: number;
  explanation: string;
};

const theoryPrepUrl = "https://theoryprep.ie";

export const portfolio = {
  name: "Ryan Cullen",
  firstName: "Ryan",
  lastName: "Cullen",
  role: "Computer Science & Business student",
  location: "Dublin, Ireland",
  email: "cullenry@tcd.ie",
  githubUsername: "cullenry",
  tagline: "I build software where code meets markets, from trading engines to a free theory-test trainer for Irish learner drivers.",
  shortBio:
    "Computer Science & Business student at Trinity College Dublin, building software at the point where code meets markets.",
  status: {
    label: "Now building",
    project: "TheoryPrep",
    href: "#theoryprep",
    note: "Free Irish driving theory test practice, live at theoryprep.ie",
  },
  education: {
    degree: "Computer Science & Business",
    institution: "Trinity College Dublin",
    courseUrl:
      "https://www.tcd.ie/business/programmes/undergraduate/computer-science-and-business-degree/",
    year: "Second year",
  },
  navigation: [
    { label: "Front page", href: "#top", page: "01" },
    { label: "TheoryPrep", href: "#theoryprep", page: "02" },
    { label: "Projects", href: "#projects", page: "04" },
    { label: "Experience", href: "#experience", page: "06" },
    { label: "Education", href: "#education", page: "07" },
    { label: "Contact", href: "#contact", page: "08" },
  ] satisfies NavigationItem[],
  about: [
    "Hi, I'm Ryan, a second-year Computer Science & Business student at Trinity College Dublin. I like the places where technology and business meet: the systems behind a market, the product decisions behind an app, and the plain craft of building something people actually use.",
    "Outside lectures, I'm teaching myself system architecture, data structures and what it takes to build fast, real-time algorithms for the markets. I also ship things. The latest is TheoryPrep, a free theory-test trainer for Irish learner drivers.",
  ],
  cvProfile:
    "Second-year Computer Science & Business student at Trinity College Dublin. I build and ship software independently, most recently TheoryPrep, a free Irish driving theory test practice platform. Analytical and adaptable, with customer-facing experience in fast-paced retail and hospitality. I communicate clearly and work well under pressure.",
  projects: [
    {
      slug: "theoryprep",
      name: "TheoryPrep",
      kicker: "Featured project · Live product",
      headline: "A free theory-test trainer for Ireland's learner drivers",
      summary:
        "Learner drivers in Ireland have to pass a 40-question theory test before they can apply for a learner permit, and the most complete practice material often costs money. TheoryPrep is my answer: an independent, free-to-start study platform built around a bank of 805 practice questions, each with an explanation.",
      role: "Solo project: product, content structure, design and build",
      stack: ["Next.js", "Vercel"],
      details: [
        "805 practice questions across 11 topic areas, each with a written explanation.",
        "Full mock exam that mirrors the real test: 40 questions, 45 minutes, 35 to pass, with skip, flag and review.",
        "20- and 10-question quick tests for shorter sessions.",
        "Topic practice, flashcards, a mistakes review and starred questions.",
        "A searchable question library, including the road-sign questions with sign images.",
        "Read-aloud for questions, adjustable text size and a dark mode.",
        "Optional accounts for streaks, daily goals, progress and a test-date countdown.",
      ],
      outcome: "Live at theoryprep.ie and free to start, with no account needed to practise.",
      links: [{ label: "Visit TheoryPrep", href: theoryPrepUrl, external: true }],
      visual: "theoryprep",
      cvLine:
        "Built and launched a free Irish driving theory test platform with 805 practice questions, timed 40-question mock exams, topic practice and progress tracking. Next.js, Vercel.",
    },
    {
      slug: "trading-engine",
      name: "Algorithmic Trading Engine",
      kicker: "Markets",
      headline: "Rules, signals and a backtester to keep me honest",
      summary:
        "A rule-based trading engine for testing strategy ideas against historical data before trusting them with anything real. It is where my interest in real-time systems and the markets started.",
      role: "Personal project",
      stack: ["Python", "Pandas", "CCXT", "Alpaca"],
      details: [
        "Built a rule-based engine driven by technical indicators.",
        "Wrote a backtesting system to run strategy experiments on historical data.",
        "Tested and refined strategy parameters against past market data.",
      ],
      links: [],
      visual: "trading",
      cvLine:
        "Rule-based trading engine with technical indicators and a backtesting system for refining strategies on historical data. Python, Pandas, CCXT, Alpaca.",
    },
    {
      slug: "netflix-visualisation",
      name: "Netflix Data Visualisation",
      kicker: "Data · Leaving Cert",
      headline: "What's actually on Netflix? A Leaving Cert investigation",
      summary:
        "My Leaving Certificate Computer Science project. It explores patterns in Netflix's catalogue with Python and puts the findings in an interactive web interface.",
      role: "Leaving Certificate Computer Science project",
      stack: ["Python", "Pandas", "Plotly", "Flask"],
      details: [
        "Cleaned and analysed the Netflix dataset with Pandas.",
        "Built interactive visualisations with Plotly.",
        "Served the results through a Flask web interface.",
      ],
      links: [],
      visual: "netflix",
      cvLine:
        "Leaving Cert Computer Science project analysing Netflix catalogue data, with interactive Plotly charts served through Flask.",
    },
    {
      slug: "minecraft-server",
      name: "Modded Minecraft Server",
      kicker: "Infrastructure",
      headline: "Running a modded server on a cloud VM",
      summary:
        "A hands-on infrastructure project: hosting and maintaining a modded Minecraft server for friends on Google Cloud.",
      role: "Personal project",
      stack: ["Linux", "Google Cloud", "NeoForge", "Minecraft 1.21.1"],
      details: [
        "Hosted a modded Minecraft server on a Google Cloud virtual machine.",
        "Configured and maintained the Linux server environment.",
        "Built and ran a NeoForge modpack on Minecraft 1.21.1.",
      ],
      links: [],
      visual: "server",
      cvLine:
        "Hosted and maintained a NeoForge modded Minecraft server on a Google Cloud Linux VM.",
    },
    {
      slug: "portfolio",
      name: "The Cullen Ledger",
      kicker: "Colophon",
      headline: "This portfolio, set like a broadsheet",
      summary:
        "My personal site, designed and built from scratch. Version two is an editorial redesign with a real light and dark design-token system, a live GitHub activity chart and a printable CV.",
      role: "Design and development",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      details: [
        "Token-based design system with first-class day and night editions.",
        "Server-rendered GitHub contribution chart with an accessible table view.",
        "Keyboard command index, print-ready CV and generated social images.",
      ],
      links: [{ label: "Source on GitHub", href: "https://github.com/cullenry/ryan-portfolio", external: true }],
      visual: "portfolio",
      cvLine: "Designed and built this portfolio and CV site. Next.js, React, TypeScript, Tailwind CSS.",
    },
  ] satisfies Project[],
  experience: [
    {
      company: "SuperValu",
      role: "Retail Assistant",
      date: "May 2026 – Present",
      current: true,
      details: [
        "Supporting customers in a fast-paced retail environment with helpful, professional service.",
        "Working with colleagues to keep store operations running smoothly.",
        "Keeping organised and paying attention to detail across day-to-day retail tasks.",
      ],
    },
    {
      company: "Brown Thomas Dublin",
      role: "Online Pick & Pack",
      date: "October 2025 – December 2025",
      details: [
        "Picked and packed online orders for dispatch.",
        "Assisted customers on the floor and maintained stock accuracy.",
        "Communicated clearly with colleagues and worked efficiently under pressure.",
      ],
    },
    {
      company: "Dunnes Stores",
      role: "Retail Assistant",
      context: "Transition Year work experience",
      details: ["Stocked shelves and received deliveries.", "Helped customers with their enquiries."],
    },
    {
      company: "Saint Helens Bay Golf Resort",
      role: "Kitchen Porter",
      date: "June 2022 – August 2022",
      details: [
        "Food preparation and kitchen support.",
        "Managed inventory levels.",
        "Communicated with colleagues and worked well under pressure.",
      ],
    },
    {
      company: "Vertical.ie",
      role: "Work experience",
      descriptor: "Access platform hire, sales & service",
      context: "Transition Year work experience",
      details: ["Managed construction vehicles, including painting, refuelling and testing functionality."],
    },
  ] satisfies Experience[],
  educationHistory: [
    {
      institution: "Trinity College Dublin",
      course: "Computer Science & Business",
      award: "Bachelor of Science (Joint Honours), Business and Computer Science",
      date: "2025 – Present",
      location: "Dublin, Ireland",
      detail: "Second year · Expected graduation 2029",
      url: "https://www.tcd.ie/business/programmes/undergraduate/computer-science-and-business-degree/",
    },
    {
      institution: "Institute of Education",
      course: "Leaving Certificate",
      date: "2023 – 2025",
      location: "Dublin, Ireland",
      detail: "Leaving Certificate Examination",
      figure: { value: "602", label: "points" },
    },
  ] satisfies EducationEntry[],
  skills: {
    Languages: ["Java", "Python", "TypeScript / JavaScript", "HTML / CSS", "ARM Assembly"],
    "Frameworks & tools": ["Next.js", "React", "Tailwind CSS", "Flask", "Pandas", "Plotly", "Git / GitHub", "Linux", "Google Cloud", "Vercel"],
    "Ways of working": [
      "Problem solving",
      "Creative thinking",
      "Teamwork",
      "Communication",
      "Adaptability",
      "Time management",
      "Reliability",
      "Organisation",
    ],
  } satisfies Record<string, string[]>,
  spokenLanguages: ["English", "Irish"],
  interests: ["Football", "Reading", "Playing piano"],
  links: {
    email: { label: "Email", href: "mailto:cullenry@tcd.ie" },
    github: { label: "GitHub", href: "https://github.com/cullenry", external: true },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ryan-cullen-121623312/",
      external: true,
    },
    cv: { label: "CV", href: "/cv" },
    theoryprep: { label: "TheoryPrep", href: theoryPrepUrl, external: true },
  } satisfies Record<string, LinkItem>,
};

/** Verified against theoryprep.ie in October 2026. */
export const theoryPrep = {
  url: theoryPrepUrl,
  displayUrl: "theoryprep.ie",
  stats: [
    { value: "805", label: "practice questions" },
    { value: "11", label: "topic areas" },
    { value: "40", label: "questions in a full mock" },
    { value: "45", label: "minutes on the clock" },
    { value: "35", label: "correct to pass" },
  ],
  topics: [
    { name: "General road knowledge", count: 186 },
    { name: "Signs, signals and road markings", count: 181 },
    { name: "Vehicle condition and maintenance", count: 104 },
    { name: "Road positioning and manoeuvres", count: 82 },
    { name: "Hazard awareness", count: 68 },
    { name: "Road law and responsibilities", count: 51 },
    { name: "Vehicle control and speed", count: 48 },
    { name: "Emergencies and first aid", count: 30 },
    { name: "Sharing the road", count: 20 },
    { name: "Driver fitness", count: 19 },
    { name: "Efficient driving", count: 16 },
  ],
  /**
   * Sample questions written for this portfolio in the style of the test. They are
   * not taken from TheoryPrep's bank or from official RSA material.
   */
  quiz: [
    {
      topic: "Hazard awareness",
      prompt: "On a wet road, how does your stopping distance compare with a dry road?",
      options: [
        "It's about the same if your tyres are legal",
        "It can be up to twice as long",
        "It's shorter, because water cools the brakes",
        "It only changes above 100 km/h",
      ],
      answer: 1,
      explanation:
        "Wet roads cut grip, so stopping distances can double. Leave at least twice your usual two-second gap.",
    },
    {
      topic: "Road law and responsibilities",
      prompt: "A learner permit holder driving a car must be accompanied by…",
      options: [
        "Anyone aged 18 or over",
        "Nobody, once they have had the permit for six months",
        "A driver who has held a full licence for that category for at least two years",
        "Another learner permit holder with more experience",
      ],
      answer: 2,
      explanation:
        "Learners must display L-plates and be accompanied by a qualified driver who has held a full licence for the same category for at least two years.",
    },
    {
      topic: "Road positioning and manoeuvres",
      prompt: "Approaching a roundabout in Ireland, you should normally give way to traffic…",
      options: [
        "Coming from your right",
        "Coming from your left",
        "Joining behind you",
        "On the exit you plan to take",
      ],
      answer: 0,
      explanation:
        "Traffic in Ireland circulates clockwise, so you yield to vehicles already on the roundabout approaching from your right.",
    },
    {
      topic: "Vehicle control and speed",
      prompt: "What is the default speed limit on an Irish motorway?",
      options: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"],
      answer: 2,
      explanation:
        "The default motorway limit is 120 km/h. Signs can set a lower limit, and learner permit holders may not drive on motorways at all.",
    },
  ] satisfies QuizQuestion[],
};
