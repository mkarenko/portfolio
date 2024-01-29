import {FC, useEffect, useRef, useState} from 'react';

import {gitHubServices} from '../../services/github.service';
import GitHubCalendar from '../../components/calendar/GitHubCalendar';
import {ContributionType} from '../../types/contribution.type';
import Loader from '../../components/loader/loader';
import {logoGithub, logoLinkedin, search} from 'ionicons/icons';
import BaseButton from '../../components/buttons/BaseButton';
import BaseIcon from '../../components/BaseIcon';
import {githubUrl, linkedinUrl} from '../../utils/constants';

import avatar from '../../assets/avatar.png';

const HomePage: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [username, setUsername] = useState<string>('mkarenko');
  const [contributionData, setContributionData] = useState<ContributionType | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const conData = await gitHubServices.fetchGitHubContribution(username);
      setContributionData(conData.data.user);

      setLoading(false);
    };

    fetchData();
  }, [username]);

  const changeUsername = () => {
    if (inputRef.current) {
      setUsername(inputRef.current.value);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='w-full py-10 px-24 space-y-20' style={{height: 'calc(100vh - 80px)'}}>
          <div className='w-full flex justify-between items-center'>
            <div className='w-3/5 flex flex-col gap-2'>
              <div className='text-7xl'>Hi, I'm Michał Kareńko</div>
              <div className='flex justify-center text-xl'>
                (...but You can call me Mike/Michael)
              </div>
              <div className='text-3xl'>Frontend Developer</div>
              <div>
                This site here is create with React.TS, while I'm normally creating web apps with
                use of Ionic, for my own page I wanted to crate page with as little libraries, as I
                can. List of libraries that I used for that website:
              </div>
            </div>
            <div className='w-2/5 flex justify-center'>
              <img
                alt='avatar'
                src={avatar}
                style={{
                  height: 400,
                  borderRadius: '25%',
                  transform: `scaleX(${-1})`,
                }}
              />
            </div>
          </div>

          <div className='w-full flex flex-col'>
            {username != null && (
              <>
                <div className='flex-col mt-5 text-lg'>
                  {username === 'mkarenko' && ''}
                  {username !== 'mkarenko' && (
                    <div className='flex'>
                      Contributions of user:&nbsp;
                      <div className='font-bold'>{contributionData?.name}</div>
                    </div>
                  )}
                  <div className='flex'>
                    Total contributions:&nbsp;
                    <div className='font-bold'>
                      {
                        contributionData?.contributionsCollection.contributionCalendar
                          .totalContributions
                      }
                    </div>
                  </div>
                </div>
                {contributionData && (
                  <GitHubCalendar
                    contributionData={contributionData.contributionsCollection.contributionCalendar}
                  />
                )}
              </>
            )}

            <div className='w-1/3 text-xl mt-5 mb-2'>
              Search GitHub user to check his overall contributions:
            </div>
            <div className='h-8 flex justify-start space-x-2'>
              <input
                ref={inputRef}
                className='w-1/4 rounded-xl p-2 text-black'
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') changeUsername();
                }}
              />
              <button onClick={changeUsername}>
                <BaseIcon icon={search} color='#e9dcc5' classCss='w-8 h-8' />
              </button>
            </div>

            {username === null && <div className='text-xl text-red-300'>User not found</div>}
          </div>

          <div className='absolute right-5 bottom-7 w-24 flex justify-evenly'>
            <BaseButton
              className='w-8 h-8 bg-blue-500 hover:bg-blue-800 rounded transition duration-300
              transform hover:scale-110'
              onClick={() => (window.location.href = githubUrl)}
            >
              <BaseIcon icon={logoGithub} />
            </BaseButton>

            <BaseButton
              className='w-8 h-8 bg-blue-500 hover:bg-blue-800 rounded transition duration-300
              transform hover:scale-110'
              onClick={() => (window.location.href = linkedinUrl)}
            >
              <BaseIcon icon={logoLinkedin} />
            </BaseButton>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
