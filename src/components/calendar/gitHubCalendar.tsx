import {FC, useState} from 'react';

type ContributionCalendar = {
  colors: string[];
  totalContributions: number;
  weeks: ContributionWeek[];
};

type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[];
};

type ContributionDay = {
  color: string;
  contributionCount: number;
  date: string;
  weekday: string;
};

type Props = {
  contributionData: ContributionCalendar | undefined;
};

const GitHubCalendar: FC<Props> = ({contributionData}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  let previousMonth = '';

  const handleDayHover = (date: string) => {
    setHoveredDate(date);
  };

  const getMonthName = (firstDay: string) => {
    const date = new Date(firstDay);
    const monthIndex = date.getMonth();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return months[monthIndex];
  };

  return (
    <div className='flex'>
      {contributionData &&
        [contributionData.weeks.slice(0, 28), contributionData.weeks.slice(28)].map(
          (row, rowIndex) => (
            <div key={rowIndex} className='flex gap-1'>
              {row.map((week, weekIndex: number) => {
                const currentMonth = getMonthName(week.firstDay);
                const shouldDisplayMonth = currentMonth !== previousMonth;

                previousMonth = currentMonth;

                return (
                  <div key={weekIndex}>
                    <div className='absolute'>{shouldDisplayMonth && <>{currentMonth}</>}</div>
                    <div className='mt-6'>
                      {week.contributionDays.map((day, dayIndex: number) => (
                        <div
                          key={dayIndex}
                          className='w-4 h-4 rounded-lg'
                          style={{
                            backgroundColor: day.contributionCount === 0 ? '#434552' : day.color,
                          }}
                          onMouseOver={() => handleDayHover(day.date)}
                          onMouseOut={() => handleDayHover('')}
                        >
                          {hoveredDate === day.date && (
                            <div className='absolute bg-slate-700 p-2 rounded-lg shadow text-white'>
                              <p>Date: {day.date}</p>
                              <p>Contributions: {day.contributionCount}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
    </div>
  );
};

export default GitHubCalendar;
