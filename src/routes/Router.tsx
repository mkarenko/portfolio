import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomePage} from '../pages/common/home.page';
import {NotFoundPage} from '../pages/common/notFound.page';
import HireMePage from '../pages/HireMePage';

const Router: FC = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />

    <Route path='/about-me' element={<HireMePage />} />
    <Route path='/past-work' element={<HireMePage />} />
    <Route path='/skills' element={<HireMePage />} />
    <Route path='/references' element={<HireMePage />} />
    <Route path='/hire-me' element={<HireMePage />} />

    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

export default Router;
