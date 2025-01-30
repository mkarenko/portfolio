import {atom} from 'recoil';

import {Theme} from 'src/types/theme.type';

const getDefaultTheme = (): Theme => {
  const theme = localStorage.getItem('theme');
  return theme === 'dark' || theme === 'light' ? theme : 'light';
};

export const themeAtom = atom<Theme>({
  key: 'themeAtom',
  default: getDefaultTheme(),
});
