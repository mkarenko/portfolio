import {FC, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';

import {themeAtom} from '../atoms/themeState.atom';
import {neonState} from '../atoms/neonState.atom';

import '../theme/neonButton.css';
import '../theme/themeSwitcher.css';

export const Header: FC = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useRecoilState(themeAtom);
  const [neonOn, setNeonOn] = useRecoilState(neonState);

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

  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'T' || e.key === 't') toggleTheme();
    if (e.key === 'L' || e.key === 'l') setNeonOn((prevValue) => !prevValue);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const tabStyle: string =
    'py-1 px-3 text-gray-400 focus:outline-none hover:bg-gray-700' +
    'hover:text-white rounded cursor-pointer';

  return (
    <header className='top-0 z-10 flex items-center w-full p-5 bg-gray-200 dark:bg-black'>
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
            onChange={() => setNeonOn((prevValue) => !prevValue)}
          />
          <input
            type='checkbox'
            checked={theme === 'light'}
            className='t hover:cursor-pointer'
            onChange={toggleTheme}
          />
        </div>
      </nav>
    </header>
  );
};
