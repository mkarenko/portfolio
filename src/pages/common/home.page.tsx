import {FC, useEffect, useRef, useState} from 'react';

import LinkedinButton from '../../components/buttons/linkedin.button';
import GitHubButton from '../../components/buttons/github.button';
import {gitHubServices} from '../../services/services';
import {GitHubUser} from '../../types/githubUser.type';
import Loader from '../../loader/loader';
import {search} from 'ionicons/icons';
import GitHubCalendar from '../../components/calendar/gitHubCalendar';
import {ContributionType} from '../../types/contribution.type';
import IconComponent from '../../components/iconComponent';

import avatar from '../../assets/avatar.png';

export const HomePage: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<GitHubUser>();
  const [username, setUsername] = useState<string>('mkarenko');
  const [contributionData, setContributionData] = useState<ContributionType | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userData = await gitHubServices.fetchUserDetail(username);
        setUser(userData);

        const conData = await gitHubServices.fetchGitHubContribution(username);
        setContributionData(conData.data.user);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
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
        <div
          className='w-full bg-mirage py-10 px-24 space-y-20 text-white'
          style={{height: 'calc(100vh - 80px)'}}
        >
          <div className='w-full flex justify-between items-center'>
            <div className='w-1/2 flex flex-col justify-between gap-2'>
              <p className='text-7xl text-offWhite'>Hi, I'm Michael Kareńko</p>
              <p className='text-3xl'>Frontend Developer</p>
              <p>
                This site here is create with React.TS, while I'm normally creating web apps with
                use of Ionic, for my own page I wanted to crate page with as little libraries, as I
                can. List of libraries that I used for that website:
              </p>
            </div>
            <div className='w-1/2 flex justify-center'>
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

          <div className='w-1/2 flex flex-col'>
            <p className='text-xl my-2'>Search GitHub user to check his overall contributions:</p>

            <div className='h-8 flex space-x-2'>
              <input
                ref={inputRef}
                className='w-1/2 rounded-xl p-2 text-black'
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    changeUsername();
                  }
                }}
              />
              <button onClick={changeUsername}>
                <IconComponent icon={search} color='#e9dcc5' classCss='w-8 h-8' />
                <svg />
              </button>
            </div>

            <div>
              {contributionData?.name != null ? (
                <div>
                  <p className='mt-5 text-lg'>Contributions of user: {contributionData?.name}</p>
                  {contributionData && (
                    <GitHubCalendar
                      contributionData={
                        contributionData.contributionsCollection.contributionCalendar
                      }
                    />
                  )}
                </div>
              ) : (
                <div className='text-xl text-red-300'>User not found</div>
              )}
            </div>
          </div>

          <div className='absolute right-10 bottom-10 w-24 flex justify-between'>
            <GitHubButton />
            <LinkedinButton />
          </div>
        </div>
      )}
    </>
  );
};
