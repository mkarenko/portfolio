import {atom} from 'recoil';

const getIsFirstVisit = () => {
  const visitState = localStorage.getItem('firstVisit');
  return visitState === 'true';
};

export const firstVisitState = atom({
  key: 'firstVisitState',
  default: getIsFirstVisit(),
});
