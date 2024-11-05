import {FC, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';

import {themeAtom} from '../atoms/themeState.atom';
import {neonState} from '../atoms/neonState.atom';
import Discoball from './discoball/Discoball';

import '../theme/neonButton.css';
import '../theme/themeSwitcher.css';
import '../components/discoball/discoball.css';

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

    if (pressCount === 5) {
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

  const toggleLights = (): void => {
    setNeonOn((prevValue) => {
      setPressCount((prevCount) => prevCount + 1);
      return !prevValue;
    });
  };

  const shutDownTheDisco = (): void => {
    setDiscoMode(false);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'T' || e.key === 't') toggleTheme();
    if (e.key === 'L' || e.key === 'l') toggleLights();
  };

  const tabStyle: string =
    'py-1 px-3 text-gray-400 focus:outline-none hover:bg-gray-700' +
    'hover:text-white rounded cursor-pointer';

  return (
    <header className='relative top-0 z-10 flex items-center w-full p-5 bg-gray-200 dark:bg-gray-900'>
      <nav className='relative flex items-center justify-between w-full text-base'>
        <div className='flex items-center justify-center'>
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
            id='neon'
            className='neon-button hover:cursor-pointer'
            onClick={() => navigate('/about')}>
            mkarenko
          </div>
        </div>
        <div>
          <input
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
