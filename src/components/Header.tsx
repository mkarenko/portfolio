import '../components/discoball/discoball.css';
import '../theme/themeSwitcher.css';

import {useNavigate} from 'react-router-dom';

import {HeaderProps} from '../routes/Router';
import BaseIcon from './BaseIcon';
import BaseButton from './buttons/BaseButton';
import ThemeButton from './buttons/ThemeButton';

import {download, home, language as languageIcon} from 'ionicons/icons';

export const Header = ({currentLoc, handleDownloadPDF, handleSwitchLanguage}: HeaderProps) => {
  const navigate = useNavigate();

  const navButtonClass = (pathName: string) =>
    `font-bold text-muted-foreground hover:text-black dark:hover:text-white ${
      currentLoc === pathName && 'border-b-8 border-primary rounded'
    }`;

  return (
    <header className='w-full py-5'>
      <nav className='relative w-full flex justify-end items-center space-x-4 pr-3'>
        <BaseButton
          className='absolute left-5 w-8 transition duration-300 transform hover:scale-110'
          onClick={() => navigate('/')}
        >
          <BaseIcon icon={home} />
        </BaseButton>

        <BaseButton className={navButtonClass('/projects')} onClick={() => navigate('/projects')}>
          Past Work
        </BaseButton>
        <BaseButton className={navButtonClass('/skills')} onClick={() => navigate('/skills')}>
          Skills
        </BaseButton>
        <BaseButton className={navButtonClass('/cv')} onClick={() => navigate('/cv')}>
          CV
        </BaseButton>
        <BaseButton className={navButtonClass('/contact')} onClick={() => navigate('/contact')}>
          Contact
        </BaseButton>
        {currentLoc === '#/cv' && (
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
