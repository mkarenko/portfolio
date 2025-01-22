import {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {Route, Routes} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import {languageAtom} from '../atoms/language.atom';
import BurgerMenu from '../components/burgerMenu/BurgerMenu';
import {Header} from '../components/Header';
import ContactPage from '../pages/common/Contact.page';
import CVPage from '../pages/common/CV.page';
import HomePage from '../pages/common/Home.page';
import NotFoundPage from '../pages/common/NotFound.page';
import ProjectsPage from '../pages/projects/Projects.page';
import SkillsPage from '../pages/skills/Skills.page';

export type HeaderProps = {
  currentLoc: string;
  handleDownloadPDF: () => void;
  handleSwitchLanguage: () => void;
};

const Router = () => {
  const cvEN = 'https://mkarenko.com/assets/cv_en.pdf';
  const cvPL = 'https://mkarenko.com/assets/cv_PL.pdf';
  const currentLocation = window.location.hash.replace('#', '');

  const [language, setLanguage] = useRecoilState(languageAtom);

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
        <Header
          currentLoc={currentLocation}
          handleDownloadPDF={handleDownloadPDF}
          handleSwitchLanguage={handleSwitchLanguage}
        />
      )}
      {deviceType === 'mobile' && (
        <BurgerMenu
          currentLoc={currentLocation}
          handleDownloadPDF={function (): void {
            throw new Error('Function not implemented.');
          }}
          handleSwitchLanguage={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}

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
