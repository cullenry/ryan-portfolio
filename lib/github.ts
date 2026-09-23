export type ContributionDay = {
  color: string;
  contributionCount: number;
  date: string;
  weekday: number;
};

export type ContributionCalendar = {
  weeks: Array<{
    contributionDays: ContributionDay[];
  }>;
};

type GithubResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar;
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
          weeks {
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

const githubContributionColors = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

function createContributionCalendarFromPublicData(contributions: PublicContributionDay[]) {
  const contributionDays = contributions.map((day) => ({
    color: githubContributionColors[Math.min(day.level, githubContributionColors.length - 1)] ?? githubContributionColors[0],
    contributionCount: day.count,
    date: day.date,
    weekday: new Date(`${day.date}T00:00:00Z`).getUTCDay(),
  }));

  return {
    weeks: [{ contributionDays }],
  } satisfies ContributionCalendar;
}

export async function getGithubActivity(username: string) {
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
        body: JSON.stringify({
          query: contributionQuery,
          variables: { login },
        }),
        next: { revalidate: 21600 },
      });

      if (response.ok) {
        const result = (await response.json()) as GithubResponse;
        const calendar = result.data?.user?.contributionsCollection.contributionCalendar ?? null;

        if (calendar) {
          return calendar;
        }
      }
    }

    const fallbackResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(login)}?y=last`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Ryan-Cullen-Portfolio",
        },
        cache: "no-store",
      },
    );

    if (!fallbackResponse.ok) {
      return null;
    }

    const publicData = (await fallbackResponse.json()) as {
      contributions?: PublicContributionDay[];
    };

    const contributions = publicData.contributions ?? [];

    if (!contributions.length) {
      return null;
    }

    return createContributionCalendarFromPublicData(contributions.slice(-35));
  } catch {
    return null;
  }
}
