import {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import {firstVisitAtom} from './atoms/firstVisit.atom';
import {languageAtom} from './atoms/language.atom';
import {themeAtom} from './atoms/theme.atom';
import FloatingTopButton from './components/buttons/FloatingTopButton';
import {Header} from './components/Header';
import Menu from './components/menu/Menu';
import ParticlesBackground from './components/particles/ParticlesBackground';
import Router from './routes/Router';
import {Theme} from './types/theme.type';
import {cvEN, cvPL} from './utils/constants';

export type HeaderProps = {
  theme: Theme;
  handleDownloadPDF?: () => void;
  handleSwitchLanguage?: () => void;
};

const App = () => {
  const theme = useRecoilValue(themeAtom);
  const setFirstVisit = useSetRecoilState(firstVisitAtom);
  const [language, setLanguage] = useRecoilState(languageAtom);

  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>(
    isMobile ? 'mobile' : 'desktop'
  );

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('visited');

    if (!isFirstVisit) {
      setFirstVisit(true);
      localStorage.setItem('visited', 'true');
      return;
    }
    setFirstVisit(false);
  }, [setFirstVisit]);

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
      <ParticlesBackground theme={theme} />
      <FloatingTopButton />

      {deviceType === 'desktop' && <Header />}
      {deviceType === 'mobile' && <Menu theme={theme} handleDownloadPDF={handleDownloadPDF} />}

      <Router />
    </>
  );
};

export default App;
