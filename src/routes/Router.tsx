import {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {Route, Routes} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import FloatingTopButton from 'src/components/buttons/FloatingTopButton';
import {Header2} from 'src/components/Header2';
import {languageAtom} from '../atoms/language.atom';
import BurgerMenu from '../components/burgerMenu/BurgerMenu';
import ContactPage from '../pages/common/Contact.page';
import ExperiencePage from '../pages/common/Experience.page';
import HomePage from '../pages/common/Home.page';
import NotFoundPage from '../pages/common/NotFound.page';
import ProjectsPage from '../pages/projects/Projects.page';
import SkillsPage from '../pages/skills/Skills.page';
import {cvEN, cvPL} from '../utils/constants';

export type HeaderProps = {
  handleDownloadPDF: () => void;
  handleSwitchLanguage: () => void;
};

const Router = () => {
  const [language, setLanguage] = useRecoilState(languageAtom);

  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(
    isMobile ? 'mobile' : 'desktop'
  );

  useEffect(() => {
    const handleDeviceChange = () => {
      if (window.innerWidth <= 768) {
        setDeviceType('mobile');
        return;
      }
      setDeviceType('desktop');
    };

    window.addEventListener('resize', handleDeviceChange);

    return () => {
      window.removeEventListener('resize', handleDeviceChange);
    };
  }, []);

  const handleSwitchLanguage = () => {
    const newLanguage = language === 'en' ? 'pl' : 'en';
    setLanguage(newLanguage);

    localStorage.setItem('language', newLanguage);
  };

  const handleDownloadPDF = () => {
    let pdfUrl: string = '';
    let fileName: string = '';

    if (language === 'en') {
      pdfUrl = cvEN;
      fileName = 'mkarenko_CV_EN.pdf';
    } else {
      pdfUrl = cvPL;
      fileName = 'mkarenko_CV_PL.pdf';
    }

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {deviceType === 'desktop' && (
        <div>
          <Header2 />
          {/* <Header
            handleDownloadPDF={handleDownloadPDF}
            handleSwitchLanguage={handleSwitchLanguage}
          /> */}

          <FloatingTopButton />
        </div>
      )}

      {deviceType === 'mobile' && (
        <BurgerMenu
          handleDownloadPDF={handleDownloadPDF}
          handleSwitchLanguage={handleSwitchLanguage}
        />
      )}

      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/skills' element={<SkillsPage />} />
        <Route path='/experience' element={<ExperiencePage />} />
        <Route path='/contact' element={<ContactPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Router;
