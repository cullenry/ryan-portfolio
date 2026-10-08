export type ContributionDay = {
  contributionCount: number;
  date: string;
  weekday: number;
  /** 0 (none) to 4 (busiest), comparable across both data sources. */
  level: number;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: Array<{
    contributionDays: ContributionDay[];
  }>;
};

type GraphqlDay = {
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  date: string;
  weekday: number;
};

type GithubResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{ contributionDays: GraphqlDay[] }>;
        };
      };
    } | null;
  };
};

type PublicContributionDay = {
  date: string;
  count: number;
  level: number;
};

const contributionQuery = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

const graphqlLevels: Record<GraphqlDay["contributionLevel"], number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Six hours: fresh enough for a portfolio, and keeps the page statically rendered. */
const revalidate = 21_600;

function calendarFromPublicData(contributions: PublicContributionDay[]): ContributionCalendar {
  const weeks: ContributionCalendar["weeks"] = [];

  for (const day of contributions) {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (weekday === 0 || weeks.length === 0) weeks.push({ contributionDays: [] });
    weeks.at(-1)!.contributionDays.push({
      contributionCount: day.count,
      date: day.date,
      weekday,
      level: Math.max(0, Math.min(4, day.level)),
    });
  }

  return {
    totalContributions: contributions.reduce((total, day) => total + day.count, 0),
    weeks,
  };
}

/**
 * The last year of contributions. Uses the GitHub GraphQL API when GITHUB_TOKEN is
 * set, falls back to a public mirror, and returns null if both are unavailable.
 */
export async function getGithubActivity(username: string): Promise<ContributionCalendar | null> {
  const login = username.trim();

  if (!login) {
    return null;
  }

  try {
    const token = process.env.GITHUB_TOKEN;

    if (token) {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: contributionQuery, variables: { login } }),
        next: { revalidate },
      });

      if (response.ok) {
        const result = (await response.json()) as GithubResponse;
        const calendar = result.data?.user?.contributionsCollection.contributionCalendar;

        if (calendar) {
          return {
            totalContributions: calendar.totalContributions,
            weeks: calendar.weeks.map((week) => ({
              contributionDays: week.contributionDays.map((day) => ({
                contributionCount: day.contributionCount,
                date: day.date,
                weekday: day.weekday,
                level: graphqlLevels[day.contributionLevel] ?? 0,
              })),
            })),
          };
        }
      }
    }

    const fallbackResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(login)}?y=last`,
      {
        headers: { Accept: "application/json", "User-Agent": "Ryan-Cullen-Portfolio" },
        next: { revalidate },
      },
    );

    if (!fallbackResponse.ok) {
      return null;
    }

    const publicData = (await fallbackResponse.json()) as { contributions?: PublicContributionDay[] };
    const contributions = publicData.contributions ?? [];

    return contributions.length ? calendarFromPublicData(contributions) : null;
  } catch {
    return null;
  }
}
