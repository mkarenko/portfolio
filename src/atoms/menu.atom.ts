import {atom} from 'recoil';

export const menuAtom = atom<boolean>({
  key: 'menuAtom',
  default: false,
});
