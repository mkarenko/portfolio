import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Header} from '../components/Header';
import ProjectsPage from '../pages/projects/Projects.page';
import ContactPage from '../pages/common/Contact.page';
import HomePage from '../pages/common/Home.page';
import NotFoundPage from '../pages/common/NotFound.page';
import SkillsPage from '../pages/skills/Skills.page';
import CVPage from '../pages/common/CV.page';

const Router: FC = () => (
	<>
		<Header />
		<Routes>
			<Route path='/' element={<HomePage />} />

			<Route path='/about' element={<ContactPage />} />
			<Route path='/projects' element={<ProjectsPage />} />
			<Route path='/skills' element={<SkillsPage />} />
			<Route path='/contact' element={<ContactPage />} />
			<Route path='/cv' element={<CVPage />} />

			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	</>
);

export default Router;
