import {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {themeAtom} from '../atoms/theme.atom';

const usePreferredTheme = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme);

    html.setAttribute('data-theme', savedTheme);
    body.classList.toggle('dark', savedTheme === 'dark');
    body.classList.toggle('light', savedTheme === 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      const systemTheme = event.matches ? 'dark' : 'light';
      if (!localStorage.getItem('theme')) {
        setTheme(systemTheme);
        html.setAttribute('data-theme', systemTheme);
        body.classList.toggle('dark', systemTheme === 'dark');
        body.classList.toggle('light', systemTheme === 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    const html = document.documentElement;
    const body = document.body;
    html.setAttribute('data-theme', newTheme);
    body.classList.toggle('dark', newTheme === 'dark');
    body.classList.toggle('light', newTheme === 'light');
  };

  return {theme, toggleTheme};
};

export default usePreferredTheme;
