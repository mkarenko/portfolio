const gitApiUrl: string = 'https://api.github.com/';

const fetchUserDetail = async (username: string) => {
  try {
    const res = await fetch(gitApiUrl + `users/${username}`, {
      headers: {},
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
  const headers = {
    'Content-Type': 'application/json', // Dodaj ten nagłówek, aby wskazać, że wysyłasz JSON
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
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error('There was an error fetching contribution from GitHub:', error);
    throw error;
  }
};

export const gitHubServices = {
  fetchUserDetail,
  fetchGitHubContribution,
};
