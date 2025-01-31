import {Route, Routes} from 'react-router-dom';

import ContactPage from '../pages/common/Contact.page';
import ExperiencePage from '../pages/common/Experience.page';
import HomePage from '../pages/common/Home.page';
import NotFoundPage from '../pages/common/NotFound.page';
import ProjectsPage from '../pages/projects/Projects.page';
import SkillsPage from '../pages/skills/Skills.page';

const Router = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />

    <Route path='/projects' element={<ProjectsPage />} />
    <Route path='/skills' element={<SkillsPage />} />
    <Route path='/experience' element={<ExperiencePage />} />
    <Route path='/contact' element={<ContactPage />} />

    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

export default Router;
