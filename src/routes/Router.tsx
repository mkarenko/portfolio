import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Header} from '../components/Header';
import PastWorkPage from '../pages/apps/PastWork.page';
import HireMePage from '../pages/common/HireMe.page';
import HomePage from '../pages/common/Home.page';
import NotFoundPage from '../pages/common/NotFound.page';

const Router: FC = () => (
  <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />

      <Route path='/about' element={<HireMePage />} />
      <Route path='/past-work' element={<PastWorkPage />} />
      <Route path='/skills' element={<HireMePage />} />
      <Route path='/references' element={<HireMePage />} />
      <Route path='/hire-me' element={<HireMePage />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </>
);

export default Router;
