import {useEffect, useRef, useState} from 'react';

import BaseIcon from '../../components/BaseIcon';
import BaseButton from '../../components/buttons/BaseButton';
import GitHubCalendar from '../../components/calendar/GitHubCalendar';
import Cubes from '../../components/cubes/Cubes';
import {ContributionType} from '../../types/contribution.type';
import {githubURL, linkedinURL} from '../../utils/constants';

import {logoGithub, logoLinkedin, search} from 'ionicons/icons';

const HomePage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('mkarenko');
  const [contributions] = useState<ContributionType | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
    <div className='w-full px-24 py-10 space-y-20'>
      <div className='w-full flex items-center justify-between'>
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
      </div>

      {/* 3D skill cubes */}
      <Cubes />

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
            className='w-1/4 p-2 rounded-xl bg-primary'
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') changeUsername();
            }}
          />
          <button onClick={changeUsername}>
            <BaseIcon icon={search} color='#e9dcc5' classCss='w-8 h-8' />
          </button>
        </div>

        {userName === null && <div className='text-xl'>User not found</div>}
      </div>

      <div className='absolute flex right-5 bottom-7 space-x-3 -z-10'>
        <BaseButton
          className='w-8 h-8 transition duration-300 transform rounded hover:scale-110'
          onClick={() => (window.location.href = githubURL)}
        >
          <BaseIcon icon={logoGithub} />
        </BaseButton>

        <BaseButton
          className='w-8 h-8 transition duration-300 transform rounded hover:scale-110'
          onClick={() => (window.location.href = linkedinURL)}
        >
          <BaseIcon icon={logoLinkedin} />
        </BaseButton>
      </div>
    </div>
  );
};

export default HomePage;
