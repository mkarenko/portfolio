import '../../theme/typewriter.css';

import {Typewriter} from 'src/components/Typewriter';
import Button from '../../components/buttons/Button';
import Cubes from '../../components/cubes/Cubes';
import Icon from '../../components/Icon';
import {githubURL, linkedinURL} from '../../utils/constants';

import {logoGithub, logoLinkedin} from 'ionicons/icons';

const HomePage = () => (
  <div className='w-full flex-col p-4 pt-32 lg:px-10'>
    {/* Typewriter text animation */}
    <Typewriter
      delay={1}
      firstText='Hello, My name is Michael and I am'
      secondText='Frontend Developer'
    />

    {/* Render projects cubes */}
    <div className='w-full flex justify-center pt-20 lg:w-4/5 lg:justify-end lg:pt-10'>
      <Cubes />
    </div>

    {/* TODO */}
    <div className='w-2/3 pt-8'>
      This site is created with React.js. While I normally create web apps using Ionic, for my own
      page I wanted to create it with as few libraries as possible. Here's the list of libraries
      used:
    </div>

    {/* Bottom buttons */}
    <div className='w-full absolute bottom-5 left-0 right-0 px-10 flex justify-end items-center'>
      {/* <div>Version: 1.2.3</div> */}
      <div className='flex justify-end space-x-4'>
        <Button
          className='transition-transform transform rounded hover:scale-125'
          onClick={() => (window.location.href = githubURL)}
        >
          <Icon src={logoGithub} size='40px' />
        </Button>
        <Button
          className='transition-transform transform rounded hover:scale-110'
          onClick={() => (window.location.href = linkedinURL)}
        >
          <Icon src={logoLinkedin} size='40px' />
        </Button>
      </div>
    </div>
  </div>
);

export default HomePage;
