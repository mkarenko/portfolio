import '../components/discoball/discoball.css';
import '../theme/themeSwitcher.css';

import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import cvEN from '../assets/cv_en.pdf';
import cvPL from '../assets/cv_pl.pdf';
import {languageAtom} from '../atoms/language.atom';
import {tabAtom} from '../atoms/tab.atom';
import BaseIcon from './BaseIcon';
import BaseButton from './buttons/BaseButton';
import ThemeButton from './buttons/ThemeButton';

import {download, home, language as languageIcon} from 'ionicons/icons';

export const Header = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useRecoilState(tabAtom);
  const [language, setLanguage] = useRecoilState(languageAtom);

  const currentLocation = window.location.hash;

  const navButtonClass = `font-bold text-muted-foreground hover:text-black dark:hover:text-white  ${
    currentLocation === tab && 'border-b-2 border-primary'
  }`;

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

  const handleNavigation = (path: string) => {
    setTab(path);
    navigate(path);
  };

  return (
    <header className='w-full py-5'>
      <nav className='relative w-full flex justify-end items-center space-x-4 pr-3'>
        <BaseButton
          className='absolute left-5 w-8 transition duration-300 transform hover:scale-110'
          onClick={() => handleNavigation('/')}
        >
          <BaseIcon icon={home} />
        </BaseButton>

        <BaseButton className={navButtonClass} onClick={() => handleNavigation('/projects')}>
          Past Work
        </BaseButton>
        <BaseButton className={navButtonClass} onClick={() => handleNavigation('/skills')}>
          Skills
        </BaseButton>
        <BaseButton className={navButtonClass} onClick={() => handleNavigation('/cv')}>
          CV
        </BaseButton>
        <BaseButton className={navButtonClass} onClick={() => handleNavigation('/contact')}>
          Contact
        </BaseButton>
        {currentLocation === '#/cv' && (
          <BaseButton
            className='w-6 transition duration-300 transform hover:scale-110'
            onClick={handleDownloadPDF}
          >
            <BaseIcon icon={download} />
          </BaseButton>
        )}
        <BaseButton
          className='w-6 transition duration-300 transform hover:scale-110'
          onClick={handleSwitchLanguage}
        >
          <BaseIcon icon={languageIcon} />
        </BaseButton>

        <ThemeButton />
      </nav>
    </header>
  );
};
