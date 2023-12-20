export type ContributionType = {
  name?: string;
  contributionsCollection: {
    contributionCalendar: {
      colors: string[];
      totalContributions: number;
      weeks: {
        contributionDays: {
          color: string;
          contributionCount: number;
          date: string;
          weekday: string;
        }[];
        firstDay: string;
      }[];
    };
  };
};
