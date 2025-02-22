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
        className={`z-20 w-full fixed ${
          currentScrollY > 150 ? transparentClass : 'bg-transparent'
        }`}
      >
        <motion.nav className={`h-full flex justify-end items-center px-4 space-x-4`}>
          <motion.div className='flex'>
            {navigationTabs.map(({name, path}) => (
              <Button
                key={path}
                onClick={() => navigate(path)}
                className='relative px-4 py-2 text-sm font-bold transition'
              >
                {location.pathname === path && (
                  <motion.div
                    layoutId='activeTab'
                    className='bg-primary absolute inset-0 text-yellow-500 rounded-full'
                    transition={{type: 'spring', stiffness: 500, damping: 30}}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    location.pathname === path ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {name}
                </span>
              </Button>
            ))}

            <div className='relative flex justify-center px-2 space-x-4'>
              <ThemeButton size='30' />
            </div>
          </motion.div>
        </motion.nav>
      </motion.header>
    </AnimatePresenceFixedType>
  );
};
