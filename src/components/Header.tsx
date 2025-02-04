import '../theme/themeSwitcher.css';

import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import {motion, useMotionValueEvent, useScroll, useTransform} from 'motion/react';
import {themeAtom} from 'src/atoms/theme.atom';
import {Theme} from 'src/types/theme.type';
import {AnimatePresenceFixedType, navigationTabs} from 'src/utils/constants';
import Button from './buttons/Button';
import ThemeButton from './buttons/ThemeButton';
import Icon from './Icon';

import {language} from 'ionicons/icons';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {scrollY} = useScroll();

  const theme = useRecoilValue<Theme>(themeAtom);
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);

  useMotionValueEvent(scrollY, 'change', (latestValue) => setCurrentScrollY(latestValue));

  const transparentClass = ` bg-gradient-to-r backdrop-blur-sm shadow-md ${
    theme === 'dark'
      ? 'from-black/50 via-black/40 to-black/50 border-white/10'
      : 'from-white/70 via-white/50 to-white/70 border-black/10'
  }`;

  const height = useTransform(scrollY, [0, 100], [120, 60]);

  return (
    <AnimatePresenceFixedType>
      <motion.header
        initial={false}
        style={{height}}
        className={`w-full fixed ${currentScrollY > 150 ? transparentClass : 'bg-transparent'}`}
      >
        <motion.nav className={`h-full flex justify-end items-center space-x-4 px-4`}>
          {/* <Button
            className='flex justify-center items-center px-1 py-1.5 space-x-2'
            onClick={() => navigate('/')}
          >
            <Icon src={home} size='40px' />
          </Button> */}

          <motion.div className='flex'>
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
              <ThemeButton size='30' />
            </div>
          </motion.div>
        </motion.nav>
      </motion.header>
    </AnimatePresenceFixedType>
  );
};
