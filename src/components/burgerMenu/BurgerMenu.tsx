import './burgerMenu.css';

import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useSetRecoilState} from 'recoil';

import {tabAtom} from '../../atoms/tab.atom';
import BaseIcon from '../BaseIcon';
import BaseButton from '../buttons/BaseButton';
import ThemeButton from '../buttons/ThemeButton';

import {download, language as languageIcon} from 'ionicons/icons';

const BurgerMenu = () => {
  const navigate = useNavigate();
  const currentLocation = window.location.hash.replace('#', '');

  const [open, setOpen] = useState(false);
  const setTab = useSetRecoilState(tabAtom);

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleNavigation = (path: string) => {
    setTab(path);
    navigate(path);
    setOpen(false);
  };

  const navButtonClass = (pathName: string) => `text-4xl font-bold text-light-text
  ${currentLocation === pathName && 'border-b-8 border-primary rounded'}`;

  return (
    <div className='burger-menu'>
      <BaseButton className={`burger ${open && 'open'}`} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </BaseButton>

      <nav className={`menu ${open && 'open'} w-full h-full flex flex-col items-start gap-y-5`}>
        <BaseButton className={navButtonClass('/')} onClick={() => handleNavigation('/')}>
          Home
        </BaseButton>
        <BaseButton
          className={navButtonClass('/projects')}
          onClick={() => handleNavigation('/projects')}
        >
          Past Work
        </BaseButton>
        <BaseButton
          className={navButtonClass('/skills')}
          onClick={() => handleNavigation('/skills')}
        >
          Skills
        </BaseButton>
        <BaseButton className={navButtonClass('/cv')} onClick={() => handleNavigation('/cv')}>
          CV
        </BaseButton>
        <BaseButton
          className={navButtonClass('/contact')}
          onClick={() => handleNavigation('/contact')}
        >
          Contact
        </BaseButton>
        {currentLocation === '#/cv' && (
          <BaseButton
            className='w-16 transition duration-300 transform hover:scale-110'
            // onClick={handleDownloadPDF}
          >
            <BaseIcon icon={download} />
          </BaseButton>
        )}
        <BaseButton
          className='w-16 transition duration-300 transform hover:scale-110'
          // onClick={handleSwitchLanguage}
        >
          <BaseIcon icon={languageIcon} />
        </BaseButton>

        <ThemeButton width='65' height='64' />
      </nav>
    </div>
  );
};

export default BurgerMenu;
