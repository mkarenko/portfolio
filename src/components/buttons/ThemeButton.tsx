/* eslint-disable react-hooks/exhaustive-deps */
import '../../theme/themeSwitcher.css';

import {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {themeAtom} from '../../atoms/theme.atom';

const ThemeButton = () => {
  const html = document.documentElement;
  const body = document.body;
  const [theme, setTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme);

    html.setAttribute('data-theme', savedTheme);
    body.classList.toggle('dark', savedTheme === 'dark');
  }, [theme]);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    html.setAttribute('data-theme', newTheme);

    if (newTheme === 'dark') {
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
    }
  };

  return (
    <button
      className='theme-toggle'
      id='theme-toggle'
      title='Toggles light & dark'
      aria-label='auto'
      aria-live='polite'
      onClick={handleToggleTheme}
    >
      <svg className='sun-and-moon' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24'>
        <mask className='moon' id='moon-mask'>
          <rect x='0' y='0' width='100%' height='100%' fill='white' />
          <circle cx='24' cy='10' r='6' fill='black' />
        </mask>
        <circle className='sun' cx='12' cy='12' r='6' mask='url(#moon-mask)' fill='currentColor' />
        <g className='sun-beams' stroke='currentColor'>
          <line x1='12' y1='1' x2='12' y2='3' />
          <line x1='12' y1='21' x2='12' y2='23' />
          <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
          <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
          <line x1='1' y1='12' x2='3' y2='12' />
          <line x1='21' y1='12' x2='23' y2='12' />
          <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
          <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
        </g>
      </svg>
    </button>
  );
};

export default ThemeButton;
