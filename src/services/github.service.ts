const gitApiUrl: string = 'https://api.github.com/';
const token = process.env.REACT_APP_GITHUB_TOKEN;

const fetchUserDetail = async (username: string) => {
  try {
    const res = await fetch(gitApiUrl + `users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user detail');
    }

    const userData = await res.json();
    return userData;
  } catch (error: any) {
    console.error('There was error fetching user from GitHub:', error);
    throw error;
  }
};

const fetchGitHubContribution = async (username: string) => {
  console.log(token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const body = {
    query: `query {
        user(login: "${username}") {
          name
          contributionsCollection {
            contributionCalendar {
              colors
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                  weekday
                }
                firstDay
              }
            }
          }
        }
      }`,
  };

  try {
    const res = await fetch(gitApiUrl + 'graphql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error('There was error fetching contribution from GitHub:', error);
    throw error;
  }
};

export const gitHubServices = {
  fetchUserDetail,
  fetchGitHubContribution,
};
