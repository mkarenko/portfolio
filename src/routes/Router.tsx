import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {NotFoundPage} from '../pages/common/notFound.page';
import HireMePage from '../pages/common/hireMe.page';
import {Header} from '../components/header';
import {HomePage} from '../pages/common/home.page';

const Router: FC = () => (
  <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />

      <Route path='/about' element={<HireMePage />} />
      <Route path='/past-work' element={<HireMePage />} />
      <Route path='/skills' element={<HireMePage />} />
      <Route path='/references' element={<HireMePage />} />
      <Route path='/hire-me' element={<HireMePage />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </>
);

export default Router;
