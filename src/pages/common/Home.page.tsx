import '../../theme/typewriter.css';

import {useState} from 'react';

import BaseIcon from '../../components/BaseIcon';
import BaseButton from '../../components/buttons/BaseButton';
import Cubes from '../../components/cubes/Cubes';
import {ContributionType} from '../../types/contribution.type';
import {githubURL, linkedinURL} from '../../utils/constants';

import {logoGithub, logoLinkedin} from 'ionicons/icons';

const HomePage = () => {
  // TODO smth not working with check
  // const isFirstVisit = useRecoilValue(firstVisitAtom);

  const [contributions, setContributions] = useState<ContributionType | null>(null);

  return (
    <div className='w-full flex-col p-4 lg:px-10'>
      <div className={`${'typewriter'} w-full flex flex-col justify-center pt-16 lg:pt-5`}>
        <div className='w-full text-lg lg:w-1/2 lg:text-3xl'>
          Hello, My name is Michael and I am
        </div>
        <div className='w-full text-2xl lg:w-1/2 lg:text-6xl'>Frontend Developer</div>
      </div>

      <div className='w-full flex justify-center pt-20 lg:w-4/5 lg:justify-end lg:pt-10'>
        <Cubes />
      </div>

      <div className='w-2/3 pt-8'>
        This site is created with React.js. While I normally create web apps using Ionic, for my own
        page I wanted to create it with as few libraries as possible. Here's the list of libraries
        used: /// TODO
      </div>

      {/* <div className='flex flex-col w-full mt-8'>
        <div className='flex flex-col text-center sm:text-left text-md sm:text-lg'>
          Total contributions:&nbsp;
          <span className='font-bold'>
            {contributions?.contributionsCollection.contributionCalendar.totalContributions}
          </span>
        </div>
        {contributions && (
          <GitHubCalendar
            contributionData={contributions.contributionsCollection.contributionCalendar}
          />
        )}
      </div> */}

      <div className='absolute right-5 bottom-5 flex gap-x-3 -z-10'>
        <BaseButton
          className='w-8 h-8 transition-transform transform rounded hover:scale-110'
          onClick={() => (window.location.href = githubURL)}
        >
          <BaseIcon icon={logoGithub} />
        </BaseButton>
        <BaseButton
          className='w-8 h-8 transition-transform transform rounded hover:scale-110'
          onClick={() => (window.location.href = linkedinURL)}
        >
          <BaseIcon icon={logoLinkedin} />
        </BaseButton>
      </div>
    </div>
  );
};

export default HomePage;
