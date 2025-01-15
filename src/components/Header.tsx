import '../components/discoball/discoball.css';
import '../theme/neonButton.css';
import '../theme/themeSwitcher.css';

import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import cvEN from '../assets/cv_en.pdf';
import cvPL from '../assets/cv_pl.pdf';
import {languageAtom} from '../atoms/language.atom';
import {neonAtom} from '../atoms/neon.atom';
import {themeAtom} from '../atoms/theme.atom';
import BaseIcon from './BaseIcon';
import BaseButton from './buttons/BaseButton';
import Discoball from './discoball/Discoball';

import {codeSlash, download, home, language as languageIcon} from 'ionicons/icons';
import info from '../assets/information.svg';

export const Header: FC = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useRecoilState(themeAtom);
  const [neonOn, setNeonOn] = useRecoilState(neonAtom);
  const [language, setLanguage] = useRecoilState(languageAtom);

  const [, setShowCode] = useState<boolean>(false);
  const [discoMode, setDiscoMode] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [pressCount, setPressCount] = useState<number>(0);

  const currentLocation = window.location.hash;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout | undefined;

    if (pressCount > 0) {
      timeout = setTimeout(() => {
        setPressCount(0);
      }, 3000);
    }

    if (pressCount === 5 && theme === 'dark') {
      setDiscoMode(true);
      setPressCount(0);
    }

    if (discoMode) {
      interval = setInterval(() => {
        setNeonOn((prevValue) => !prevValue);
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    }; // eslint-disable-next-line
  }, [pressCount, discoMode]);

  useEffect(() => {
    const neon = document.getElementById('neon');
    if (neon) neon.classList.toggle('on', neonOn);
    localStorage.setItem('neon', String(neonOn));
  }, [neonOn]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      html.classList.toggle('dark', storedTheme === 'dark');
      html.classList.toggle('light', storedTheme === 'light');
      body.classList.toggle('dark', storedTheme === 'dark');
      body.classList.toggle('light', storedTheme === 'light');
    }

    localStorage.setItem('theme', String(theme)); // eslint-disable-next-line
  }, [theme]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress); // eslint-disable-next-line
  }, []);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  /// Have to fix turning lights on while theme light is active
  const toggleLights = () => {
    setNeonOn((prevValue) => {
      setPressCount((prevCount) => prevCount + 1);
      return !prevValue;
    });
  };

  const shutDownDisco = (): void => {
    setDiscoMode(false);
    setNeonOn(false);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.currentTarget) {
      if (e.key === 'T' || e.key === 't') toggleTheme();
      if (e.key === 'L' || e.key === 'l') toggleLights();
    }
  };

  const handleSwitchLanguage = () => {
    const newLanguage = language === 'en' ? 'pl' : 'en';
    setLanguage(newLanguage);

    localStorage.setItem('language', newLanguage);
  };

  // const handleDownloadPDF = () => {
  // 	let pdfUrl: string = '';
  // 	let fileName: string = '';

  // 	if (language === 'en') {
  // 		pdfUrl = cvEN;
  // 		fileName = 'cv_en.pdf';
  // 		return;
  // 	}
  // 	pdfUrl = cvPL;
  // 	fileName = 'cv_pl.pdf';

  // 	const link = document.createElement('a');
  // 	link.href = pdfUrl;
  // 	link.download = fileName;
  // 	link.click();
  // };

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

  const tabStyle: string =
    'py-1 px-3 text-white focus:outline-none hover:bg-gray-700' +
    'hover:text-white rounded cursor-pointer';

  return (
    <header className='w-[100%] p-5 bg-gray-500 dark:bg-gray-800'>
      <nav className='flex items-center justify-between w-full text-xl font-bold lg:items-start'>
        <div className='flex items-center justify-center'>
          <BaseButton
            className='w-8 h-8 ml-5 mr-10 transition duration-300 transform rounded hover:scale-110'
            onClick={() => navigate('/')}
          >
            <BaseIcon icon={home} color='white' />
          </BaseButton>
          <title className='text-black'>asd</title>
          <div className={tabStyle} onClick={() => navigate('/projects')}>
            Past Work
          </div>
          <div className={tabStyle} onClick={() => navigate('/skills')}>
            Skills
          </div>
          <div className={tabStyle} onClick={() => navigate('/cv')}>
            CV
          </div>
          <div className={tabStyle} onClick={() => navigate('/contact')}>
            Contact
          </div>
        </div>
        {/* <div className='absolute left-0 right-0 mx-auto w-fit'>
					<div
						hidden={theme === 'light'}
						id='neon'
						className='neon-button hover:cursor-pointer'
						onClick={() => navigate('/hire-me')}
					>
						hire me
					</div>
				</div> */}
        <div className='flex items-center justify-center space-x-5'>
          <BaseButton
            className='w-8 h-8 transition duration-300 transform rounded hover:scale-110'
            onMouseOver={() => setInfoModal(true)}
            onMouseLeave={() => setInfoModal(false)}
          >
            <img alt='asd' src={info} color='contrast' />
          </BaseButton>
          {currentLocation === '#/cv' && (
            <BaseButton
              className='w-8 h-8 mx-5 transition duration-300 transform rounded hover:scale-110'
              onClick={handleDownloadPDF}
            >
              <BaseIcon icon={download} color='white' />
            </BaseButton>
          )}
          <BaseButton
            className='w-8 h-8 transition duration-300 transform rounded hover:scale-110'
            onClick={handleSwitchLanguage}
          >
            <BaseIcon icon={languageIcon} color='white' />
          </BaseButton>
          <BaseButton
            type='button'
            name='code-button'
            className='w-8 h-8 transition duration-300 transform rounded hover:scale-110'
            onClick={(prevValue) => setShowCode(!prevValue)}
          >
            <BaseIcon icon={codeSlash} color='white' classCss='w-8' />
          </BaseButton>
          <input
            hidden={theme === 'light'}
            type='checkbox'
            checked={neonOn}
            className='l hover:cursor-pointer'
            onChange={toggleLights}
          />
          <input
            type='checkbox'
            checked={theme === 'light'}
            className='t hover:cursor-pointer'
            onChange={toggleTheme}
          />
        </div>
      </nav>

      {infoModal && (
        <div className='absolute z-50 p-2 font-semibold bg-gray-500 border text-offWhite right-8 top-16 rounded-2xl'>
          Change theme with T key, turn lights on/off with L key
        </div>
      )}

      {discoMode && (
        <div className='absolute -top-5 right-40 discoball-container'>
          <Discoball onDiscoBallClick={shutDownDisco} />
        </div>
      )}
    </header>
  );
};
