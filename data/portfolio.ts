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

export const portfolio = {
  name: "Ryan Cullen",
  introduction: `Interested in FinTech, software development, and algorithms.`,
  education: {
    degree: "Computer Science & Business",
    institution: "Trinity College Dublin",
    courseUrl:
      "https://www.tcd.ie/business/programmes/undergraduate/computer-science-and-business-degree/",
  } satisfies Education,
  status: "Currently building this portfolio",
  navigation: [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavigationItem[],
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
