import '../components/discoball/discoball.css';
import '../theme/themeSwitcher.css';

import {useLocation, useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import {motion} from 'motion/react';
import {HeaderProps} from 'src/App';
import {themeAtom} from 'src/atoms/theme.atom';
import {navigationTabs, transparentClass} from 'src/utils/constants';
import Button from './buttons/Button';
import ThemeButton from './buttons/ThemeButton';
import Icon from './Icon';

import {language} from 'ionicons/icons';
import home from '../assets/icons/home.svg';

export const Header = ({handleDownloadPDF, handleSwitchLanguage}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useRecoilValue(themeAtom);

  const navbarClass =
    'flex justify-center items-center space-x-4 py-2 px-4 rounded-full' + transparentClass(theme);

  return (
    <motion.header className='sticky top-0 w-full py-5 px-4 flex justify-between items-center'>
      <motion.nav className={navbarClass}>
        <Button
          className='flex justify-center items-center px-1 py-1.5 space-x-2'
          onClick={() => navigate('/')}
        >
          <Icon src={home} className='w-6' />
          <div className='font-semibold'>Home</div>
        </Button>
      </motion.nav>

      <motion.nav className={navbarClass}>
        {navigationTabs.map(({name, path}) => (
          <Button
            key={path}
            onClick={() => navigate(path)}
            className={`relative px-4 py-2 text-sm font-bold transition ${
              location.pathname === path ? 'text-white' : 'text-gray-600'
            }`}
          >
            {location.pathname === path && (
              <motion.div
                layoutId='activeTab'
                className='absolute inset-0 bg-primary rounded-full'
                transition={{type: 'spring', stiffness: 500, damping: 30}}
              />
            )}
            <span className='relative z-10'>{name}</span>
          </Button>
        ))}

        <div className='relative px-2 space-x-4 flex justify-center'>
          <Button className=''>
            <Icon src={language} size='30px' />
          </Button>
          <ThemeButton height='30' width='30' />
        </div>
      </motion.nav>
    </motion.header>
  );
};
