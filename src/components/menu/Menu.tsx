import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {useRecoilState, useRecoilValue} from 'recoil';

import * as motion from 'motion/react-client';
import {HeaderProps} from 'src/App';
import {menuAtom} from 'src/atoms/menu.atom';
import {themeAtom} from 'src/atoms/theme.atom';
import {navigationTabs, transparentClass} from 'src/utils/constants';
import Button from '../buttons/Button';
import ThemeButton from '../buttons/ThemeButton';

import type {Variants} from 'motion/dist/react';
const Menu = ({handleDownloadPDF, handleSwitchLanguage}: HeaderProps) => {
  const navigate = useNavigate();
  const theme = useRecoilValue(themeAtom);
  const [open, setOpen] = useRecoilState(menuAtom);

  useEffect(() => {
    const menuDiv = document.getElementById('menu');
    const buttonDiv = document.getElementById('theme-toggle');

    const handleOutsideClick = (event: MouseEvent) => {
      if (menuDiv && !menuDiv.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleClick = () => setOpen(false);

    if (buttonDiv) buttonDiv.addEventListener('click', () => setTimeout(handleClick, 500));
    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      if (buttonDiv) buttonDiv.removeEventListener('click', handleClick);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setOpen]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleNavigation = (path: string) => {
    if (path === '/experience') {
      return (
        <a href='/assets/cv_en.pdf' target='_blank' rel='noopener noreferrer'>
          Experience
        </a>
      );
    }

    navigate(path);
    setOpen(false);
  };

  const nav =
    'w-screen h-screen overflow-y-hidden absolute inset-0 flex justify-center' +
    transparentClass(theme);

  return (
    <motion.nav initial='closed' animate={open ? 'open' : 'close'} className='fixed z-10'>
      <Button className='cursor-pointer fixed top-[20px] right-[15px] z-20' onClick={toggleMenu}>
        <svg width='25' height='25' viewBox='0 0 25 25'>
          <Path
            variants={{
              close: {d: 'M 2 2.5 L 20 2.5'},
              open: {d: 'M 3 16.5 L 17 2.5'},
            }}
          />
          <Path
            d='M 2 9.423 L 20 9.423'
            variants={{
              close: {opacity: 1},
              open: {opacity: 0},
            }}
            transition={{duration: 0.1}}
          />
          <Path
            variants={{
              close: {d: 'M 2 16.346 L 20 16.346'},
              open: {d: 'M 3 2.5 L 17 16.346'},
            }}
          />
        </svg>
      </Button>

      <motion.div variants={sidebarAnimations} className={nav}>
        <motion.ul
          variants={ulVariant}
          className='flex flex-col justify-center items-center space-y-10'
        >
          {navigationTabs.map((navItem) => (
            <motion.li key={navItem.id} whileHover={{scale: 1.2}} whileTap={{scale: 0.95}}>
              <motion.div
                variants={liVariant}
                onClick={() => handleNavigation(navItem.path)}
                className='text-4xl font-bold cursor-pointer'
              >
                {navItem.name}
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={fadeInVariant} className='absolute bottom-2 left-4'>
          <ThemeButton size='34' />
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Menu;

type PathProps = {
  d?: string;
  variants: Variants;
  transition?: {duration: number};
};

const Path = (props: PathProps) => (
  <motion.path stroke='currentColor' strokeWidth='3' strokeLinecap='round' {...props} />
);

const sidebarAnimations = {
  open: (height = window.innerHeight) => ({
    clipPath: `circle(${height + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 1,
    },
  }),
  close: {
    clipPath: 'circle(25px at calc(100% - 30px) 30px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const fadeInVariant = {
  open: {
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
  close: {opacity: 0},
};

const ulVariant = {
  open: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.18,
    },
  },
  close: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const liVariant = {
  open: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  close: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
};
