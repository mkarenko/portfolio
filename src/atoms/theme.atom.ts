import {atom} from 'recoil';

const getDefaultTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const themeAtom = atom({
  key: 'themeAtom',
  default: getDefaultTheme(),
});
