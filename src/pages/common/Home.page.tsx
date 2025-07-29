import '../../theme/typewriter.css';

import {Typewriter} from 'src/components/Typewriter';
import Button from '../../components/buttons/Button';
import Cubes from '../../components/cubes/Cubes';
import Icon from '../../components/Icon';
import {githubURL, linkedinURL} from '../../utils/constants';

import githubLogo from '../../assets/logo/github.svg';
import githubDarkLogo from '../../assets/logo/github-dark.svg';
import linkedinLogo from '../../assets/logo/linkedin.svg';
import {useRecoilValue} from 'recoil';
import {themeAtom} from 'src/atoms/theme.atom';
import {useEffect} from 'react';
import {isMobile} from 'react-device-detect';

const HomePage = () => {
  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    if (!isMobile) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className='flex-col w-full h-full p-4 pt-32 lg:px-10'>
      {/* Typewriter text animation */}
      <Typewriter
        delay={1}
        firstText='Hello, My name is Michael and I am'
        secondText='Frontend Developer'
      />

      {/* Render projects cubes */}
      <div className='flex justify-center w-3/4 pt-20 ml-6 lg:w-4/5 lg:justify-end lg:pt-10'>
        <Cubes />
      </div>

      <div className='w-2/3 pt-8'>
        This site is created with React.js. While I normally create web apps using Ionic, for my own
        page I wanted to create it with as few libraries as possible. Here's the list of libraries
        used:
      </div>

      {/* Bottom buttons */}
      <div className='absolute left-0 right-0 flex items-center justify-end w-full px-10 bottom-5'>
        <div className='flex justify-end space-x-4'>
          <Button
            className='transition-transform transform rounded hover:scale-125'
            onClick={() => (window.location.href = githubURL)}
          >
            <Icon src={theme === 'dark' ? githubLogo : githubDarkLogo} size='36px' />
          </Button>
          <Button
            className='transition-transform transform rounded hover:scale-110'
            onClick={() => (window.location.href = linkedinURL)}
          >
            <Icon src={linkedinLogo} size='40px' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
