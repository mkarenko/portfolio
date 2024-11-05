import {FC, useEffect, useRef, useState} from 'react';

import GitHubCalendar from '../../components/calendar/GitHubCalendar';
import {ContributionType} from '../../types/contribution.type';
import BaseButton from '../../components/buttons/BaseButton';
import BaseIcon from '../../components/BaseIcon';
import {discordURL, githubURL, linkedinURL} from '../../utils/constants';

import {logoDiscord, logoGithub, logoLinkedin, search} from 'ionicons/icons';

const HomePage: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [userName, setUserName] = useState<string>('mkarenko');
  const [contributions, setContributions] = useState<ContributionType | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // const dat = await gitHubServices.fetchGitHubContribution(userName);
      // setContributions(data.data.user);

      setLoading(false);
    };

    fetchData();
  }, [userName]);

  const changeUsername = () => {
    if (inputRef.current) {
      setUserName(inputRef.current.value);
    }
  };

  return (
    <div
      className='w-full px-24 py-10 space-y-20 text-black dark:text-white'
      style={{height: 'calc(100vh - 80px)'}}>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col w-3/5 gap-2'>
          <div className='text-7xl'>Hi, I'm Michał Kareńko</div>
          <div className='flex justify-center text-xl'>(...but You can call me Mike)</div>
          <div className='text-3xl'>Frontend Developer</div>
          <div>
            This site here is create with React.TS, while I'm normally creating web apps with use of
            Ionic, for my own page I wanted to crate page with as little libraries, as I can. List
            of libraries that I used for that website:
          </div>
        </div>

        {/* Avatar */}
        <div className='w-[400px] blurred' />
      </div>

      <div className='flex flex-col w-full'>
        {userName != null && (
          <>
            <div className='flex-col mt-5 text-lg'>
              {userName === 'mkarenko' && ''}
              {userName !== 'mkarenko' && (
                <div className='flex'>
                  Contributions of user:&nbsp;
                  <div className='font-bold'>{contributions?.name}</div>
                </div>
              )}
              <div className='flex'>
                Total contributions:&nbsp;
                <div className='font-bold'>
                  {contributions?.contributionsCollection.contributionCalendar.totalContributions}
                </div>
              </div>
            </div>
            {contributions && (
              <GitHubCalendar
                contributionData={contributions.contributionsCollection.contributionCalendar}
              />
            )}
          </>
        )}

        <div className='w-1/3 mt-5 mb-2 text-xl'>
          Search GitHub user to check his overall contributions:
        </div>
        <div className='flex justify-start h-8 space-x-2'>
          <input
            ref={inputRef}
            className='w-1/4 p-2 rounded-xl'
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') changeUsername();
            }}
          />
          <button onClick={changeUsername}>
            <BaseIcon icon={search} color='#e9dcc5' classCss='w-8 h-8' />
          </button>
        </div>

        {userName === null && <div className='text-xl text-red-300'>User not found</div>}
      </div>

      <div className='absolute flex w-40 right-5 bottom-7 justify-evenly'>
        <BaseButton
          className='w-8 h-8 transition duration-300 transform bg-gray-500 rounded hover:bg-gray-200 hover:scale-110'
          onClick={() => (window.location.href = githubURL)}>
          <BaseIcon icon={logoGithub} />
        </BaseButton>

        <BaseButton
          className='w-8 h-8 transition duration-300 transform bg-gray-500 rounded hover:bg-gray-200 hover:scale-110'
          onClick={() => (window.location.href = linkedinURL)}>
          <BaseIcon icon={logoLinkedin} />
        </BaseButton>

        {/* I have to think about that one. For now,
        there is no way to invite someone, by link to the discord */}
        {/* <BaseButton
          className='w-8 h-8 transition duration-300 transform bg-gray-500 rounded hover:bg-gray-200 hover:scale-110'
          onClick={() => (window.location.href = discordURL)}>
          <BaseIcon icon={logoDiscord} />
        </BaseButton> */}
      </div>
    </div>
  );
};

export default HomePage;
