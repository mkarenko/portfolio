import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';

import {firstVisitAtom} from './atoms/firstVisit.atom';
import Router from './routes/Router';

const App = () => {
  const setFirstVisit = useSetRecoilState(firstVisitAtom);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('visited');

    if (!isFirstVisit) {
      setFirstVisit(true);
      localStorage.setItem('visited', 'true');
      return;
    }
    setFirstVisit(false);
  }, [setFirstVisit]);

  useEffect(() => {}, []);
  return <Router />;
};

export default App;
