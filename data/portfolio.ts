export type NavigationItem = {
  label: string;
  href: string;
};

export type ProfileLink = {
  label: string;
  href?: string;
  external?: boolean;
};

export type Education = {
  degree: string;
  institution: string;
  courseUrl: string;
};

export type Project = {
  name: string;
  stack: string;
  description: string;
  details: string[];
};

export type Experience = {
  company: string;
  role: string;
  date?: string;
};

export const portfolio = {
  name: "Ryan Cullen",
  introduction:
    "Interested in technology, software development, and how practical problems can be solved with good systems.",
  education: {
    degree: "Computer Science & Business",
    institution: "Trinity College Dublin",
    courseUrl:
      "https://www.tcd.ie/business/programmes/undergraduate/computer-science-and-business-degree/",
  } satisfies Education,
  status: "Currently building this website :)",
  navigation: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavigationItem[],
  about:
    "Hi! I'm Ryan, a second-year Computer Science & Business student at Trinity College Dublin. I'm interested in how technology and business play hand in hand. Right now, I'm focusing my self-study on system architecture, data structures, and learning what it takes to build highly efficient, real-time algorithms for the markets.",
  currently: [
    { label: "Based", value: "Dublin, Ireland" },
    { label: "Studying", value: "Computer Science & Business" },
    { label: "At", value: "Trinity College Dublin" },
    { label: "Building", value: "Personal projects" },
  ],
  projects: [
    {
      name: "Netflix Data Visualisation (Leaving Cert Project)",
      stack: "Python · Flask · Pandas · Plotly",
      description: "A Leaving Certificate Computer Science project exploring patterns in Netflix content.",
      details: [
        "Analysed Netflix data with Python and Pandas.",
        "Created interactive visualisations with Plotly.",
        "Built a Flask-based web interface to explore the results.",
      ],
    },
    {
      name: "Trading Bot",
      stack: "Python · CCXT · Alpaca · Pandas",
      description: "An algorithmic trading project focused on rules, signals, and testing ideas against historical data.",
      details: [
        "Built a rule-based trading engine with technical indicators.",
        "Created a backtesting system for strategy experiments.",
        "Tested and refined parameters using historical data.",
      ],
    },
    {
      name: "Minecraft Server / Modpack",
      stack: "Minecraft · NeoForge · Linux · Google Cloud",
      description: "A practical infrastructure project involving a modded server and its supporting environment.",
      details: [
        "Hosted a modded Minecraft server on a Google Cloud VM.",
        "Configured and maintained a Linux server environment.",
        "Worked with NeoForge and Minecraft 1.21.1.",
      ],
    },
    {
      name: "Ryan Cullen Portfolio",
      stack: "Next.js · TypeScript · Tailwind CSS",
      description: "This site: a personal space for sharing what I'm learning and working on.",
      details: [
        "Designed and developed the portfolio from scratch.",
        "Built responsive components and a dedicated CV.",
        "Integrated GitHub activity while keeping the interface lightweight.",
      ],
    },
  ] satisfies Project[],
  experience: [
    { company: "SuperValu", role: "Retail Assistant", date: "May 2026 – Present" },
    {
      company: "Brown Thomas Dublin",
      role: "Online Pick & Pack",
      date: "October 2025 – December 2025",
    },
    { company: "Dunnes Stores", role: "Retail Assistant · TY Work Experience" },
    {
      company: "Saint Helens Bay Golf Resort",
      role: "Kitchen Porter",
      date: "June 2022 – August 2022",
    },
    {
      company: "Vertical.ie",
      role: "Sales & Service Company · TY Work Experience",
    },
  ] satisfies Experience[],
  skills: {
    Programming: ["Java", "Python", "JavaScript / TypeScript", "HTML / CSS"],
    "Frameworks & Tools": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Flask",
      "Pandas",
      "Plotly",
      "Git / GitHub",
      "VS Code",
    ],
    Other: [
      "Problem Solving",
      "Creative Thinking",
      "Teamwork",
      "Communication",
      "Adaptability",
      "Time Management",
      "Organisation",
    ],
  },
  educationHistory: [
    {
      institution: "Trinity College Dublin",
      course: "Business & Computer Science",
      date: "2025 – Present",
      detail: "Second year · Expected graduation: 2029",
    },
    {
      institution: "Institute of Education",
      course: "Leaving Certificate",
      date: "2023 – 2025",
      detail: "602 points",
    },
  ],
  links: {
    github: {
      label: "GitHub",
      href: "https://github.com/cullenry",
      external: true,
    },
    linkedin: { 
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ryan-cullen-121623312/",
      external: true },
    cv: { 
      label: "View CV",
       href: "/cv", 
    }, 
  } satisfies Record<string, ProfileLink>,
};
