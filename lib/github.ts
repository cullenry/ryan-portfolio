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

export async function getGithubActivity(username: string) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: contributionQuery,
        variables: { login: username },
      }),
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as GithubResponse;
    return result.data?.user?.contributionsCollection.contributionCalendar ?? null;
  } catch {
    return null;
  }
}
