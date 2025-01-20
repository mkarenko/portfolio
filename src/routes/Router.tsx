import {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {Route, Routes} from 'react-router-dom';

import BurgerMenu from '../components/burgerMenu/BurgerMenu';
import {Header} from '../components/Header';
import ContactPage from '../pages/common/Contact.page';
import CVPage from '../pages/common/CV.page';
import HomePage from '../pages/common/Home.page';
import NotFoundPage from '../pages/common/NotFound.page';
import ProjectsPage from '../pages/projects/Projects.page';
import SkillsPage from '../pages/skills/Skills.page';

const Router = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(
    isMobile ? 'mobile' : 'desktop'
  );

  const handleDeviceChange = () => {
    if (window.innerWidth <= 768) {
      setDeviceType('mobile');
    } else {
      setDeviceType('desktop');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleDeviceChange);

    return () => {
      window.removeEventListener('resize', handleDeviceChange);
    };
  }, []);

  return (
    <>
      {deviceType === 'mobile' && <BurgerMenu />}
      {deviceType === 'desktop' && <Header />}

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
};

export default Router;
