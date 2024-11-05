import {FC, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';

import {themeAtom} from '../atoms/themeState.atom';
import {neonState} from '../atoms/neonState.atom';
import Discoball from './discoball/Discoball';

import '../theme/neonButton.css';
import '../theme/themeSwitcher.css';
import '../components/discoball/discoball.css';
import BaseButton from './buttons/BaseButton';
import BaseIcon from './BaseIcon';
import {home} from 'ionicons/icons';

export const Header: FC = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useRecoilState(themeAtom);
  const [neonOn, setNeonOn] = useRecoilState(neonState);

  const [discoMode, setDiscoMode] = useState<boolean>(false);
  const [pressCount, setPressCount] = useState<number>(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout | undefined;

    if (pressCount > 0) {
      timeout = setTimeout(() => {
        setPressCount(0);
      }, 3000);
    }

    if (pressCount === 5 && theme === 'dark') {
      setDiscoMode(true);
      setPressCount(0);
    }

    if (discoMode) {
      interval = setInterval(() => {
        setNeonOn((prevValue) => !prevValue);
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [pressCount, discoMode]);

  useEffect(() => {
    const neon = document.getElementById('neon');
    if (neon) neon.classList.toggle('on', neonOn);
    localStorage.setItem('neon', String(neonOn));
  }, [neonOn]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      html.classList.toggle('dark', storedTheme === 'dark');
      html.classList.toggle('light', storedTheme === 'light');
      body.classList.toggle('dark', storedTheme === 'dark');
      body.classList.toggle('light', storedTheme === 'light');
    }

    localStorage.setItem('theme', String(theme));
  }, [theme]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  /// Have to fix turning lights on while theme light is active
  const toggleLights = () => {
    setNeonOn((prevValue) => {
      setPressCount((prevCount) => prevCount + 1);
      return !prevValue;
    });
  };

  const shutDownTheDisco = (): void => {
    setDiscoMode(false);
    setNeonOn(false);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'T' || e.key === 't') toggleTheme();
    if (e.key === 'L' || e.key === 'l') toggleLights();
  };

  const tabStyle: string =
    'py-1 px-3 text-gray-400 focus:outline-none hover:bg-gray-700' +
    'hover:text-white rounded cursor-pointer';

  return (
    <header className='relative top-0 z-10 flex items-center w-full p-5 bg-gray-500 dark:bg-gray-900'>
      <nav className='relative flex items-center justify-between w-full text-base'>
        <div className='flex items-center justify-center'>
          <BaseButton
            className='w-8 h-8 transition duration-300 transform rounded hover:scale-110'
            onClick={() => navigate('/')}
          >
            <BaseIcon icon={home} color='white' />
          </BaseButton>
          <div className={tabStyle} onClick={() => navigate('/projects')}>
            Past Work
          </div>
          <div className={tabStyle} onClick={() => navigate('/skills')}>
            Skills
          </div>
          <div className={tabStyle} onClick={() => navigate('/references')}>
            Testimonials
          </div>
          <div className={tabStyle} onClick={() => navigate('/contact')}>
            Contact Me
          </div>
        </div>
        <div className='absolute left-0 right-0 mx-auto w-fit'>
          <div
            hidden={theme === 'light'}
            id='neon'
            className='neon-button hover:cursor-pointer'
            onClick={() => navigate('/hire-me')}
          >
            hire me
          </div>
        </div>
        <div>
          <input
            hidden={theme === 'light'}
            type='checkbox'
            checked={neonOn}
            className='l hover:cursor-pointer'
            onChange={toggleLights}
          />
          <input
            type='checkbox'
            checked={theme === 'light'}
            className='t hover:cursor-pointer'
            onChange={toggleTheme}
          />
        </div>
      </nav>

      {discoMode && (
        <div className='absolute -top-5 right-40 discoball-container'>
          <Discoball onDiscoBallClick={shutDownTheDisco} />
        </div>
      )}
    </header>
  );
};
