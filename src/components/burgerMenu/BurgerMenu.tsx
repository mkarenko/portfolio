import './burgerMenu.css';

import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useRecoilState} from 'recoil';

import {tabAtom} from '../../atoms/tab.atom';
import BaseIcon from '../BaseIcon';
import BaseButton from '../buttons/BaseButton';
import ThemeButton from '../buttons/ThemeButton';

import {download, language as languageIcon} from 'ionicons/icons';

const BurgerMenu = () => {
  const navigate = useNavigate();
  const currentLocation = window.location.hash;

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useRecoilState(tabAtom);

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleNavigation = (path: string) => {
    setTab(path);
    navigate(path);
    setOpen(false);
  };

  const navButtonClass = `font-bold text-muted-foreground hover:text-black dark:hover:text-white
  ${currentLocation === tab && 'border-b'}`;

  return (
    <div className='burger-menu'>
      <BaseButton className={`burger ${open && 'open'}`} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </BaseButton>

      <nav className={`menu ${open && 'open'} flex flex-col justify-center items-center`}>
        <BaseButton className={navButtonClass} onClick={() => handleNavigation('/')}>
          Home
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
            // onClick={handleDownloadPDF}
          >
            <BaseIcon icon={download} />
          </BaseButton>
        )}
        <BaseButton
          className='w-6 transition duration-300 transform hover:scale-110'
          // onClick={handleSwitchLanguage}
        >
          <BaseIcon icon={languageIcon} />
        </BaseButton>

        <ThemeButton />
      </nav>
    </div>
  );
};

export default BurgerMenu;
