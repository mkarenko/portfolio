import {atom} from 'recoil';

const getNeonState = () => {
  const neonState = localStorage.getItem('neon');
  return neonState === 'true';
};

export const neonState = atom({
  key: 'neonState',
  default: getNeonState(),
});
