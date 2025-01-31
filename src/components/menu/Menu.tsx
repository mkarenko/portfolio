import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {useRecoilState, useRecoilValue} from 'recoil';

import * as motion from 'motion/react-client';
import {HeaderProps} from 'src/App';
import {particlesAtom} from 'src/atoms/particles.atom';
import {themeAtom} from 'src/atoms/theme.atom';
import {transparentClass} from 'src/utils/constants';
import ThemeButton from '../buttons/ThemeButton';
import Icon from '../Icon';
import AnimationButtons from '../particles/AnimationButtons';

import colorPaletteIcon from '../../assets/icons/colorPallete.svg';
import diamondIcon from '../../assets/icons/diamond.svg';
import documentIcon from '../../assets/icons/document.svg';
import homeIcon from '../../assets/icons/home.svg';
import phoneIcon from '../../assets/icons/phone.svg';

import type {Variants} from 'motion/dist/react';
const Menu = ({particlesRef, handleDownloadPDF, handleSwitchLanguage}: HeaderProps) => {
  const navigate = useNavigate();
  const theme = useRecoilValue(themeAtom);
  const [open, setOpen] = useState<boolean>(false);
  const [animationSettings, setAnimationSetings] = useRecoilState(particlesAtom);

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
  }, []);

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

  const handlePlayAnimation = () => {
    if (particlesRef?.current) particlesRef?.current.play();
  };

  const handlePauseAnimation = () => {
    if (particlesRef?.current) particlesRef?.current.pause();
  };

  const handleAnimationSettings = () => {
    if (particlesRef?.current) particlesRef?.current.pause();
  };

  const navbarClass = 'absolute top-0 bottom-0 left-0 w-full h-full' + transparentClass(theme);

  return (
    <div id='menu' className='fixed w-screen md:max-w-xs h-screen overflow-hidden z-10'>
      <motion.nav initial={false} animate={open ? 'open' : 'closed'}>
        <motion.div variants={sidebarAnimations} className={navbarClass} />

        <MenuToggle toggle={() => setOpen(!open)} />

        <motion.ul variants={navAnimations} className='h-[60%] absolute p-8 top-20 space-y-5'>
          <MenuItem text='Home' icon={homeIcon} navigate={() => handleNavigation('/')} />
          <MenuItem text='Skills' icon={diamondIcon} navigate={() => handleNavigation('/skills')} />
          <MenuItem
            text='Projects'
            icon={colorPaletteIcon}
            navigate={() => handleNavigation('/projects')}
          />
          <MenuItem text='Experience' icon={documentIcon} />
          <MenuItem text='Contact' icon={phoneIcon} navigate={() => handleNavigation('/contact')} />
          {/* TODO implement multilanguages */}
          {/* <MenuItem text='Language' icon={language} /> */}
        </motion.ul>

        <motion.ul
          variants={navAnimations}
          className='absolute bottom-0 p-8 flex flex-col justify-center items-center space-y-8'
        >
          <motion.li
            className='flex justify-center items-center space-x-5'
            variants={itemAnimations}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
          >
            <ThemeButton width='40' height='40' />
            <AnimationButtons
              theme={theme}
              currentSettings={animationSettings}
              playAnimation={handlePlayAnimation}
              pauseAnimation={handlePauseAnimation}
              changeAnimationsSettings={handleAnimationSettings}
            />
          </motion.li>
        </motion.ul>
      </motion.nav>
    </div>
  );
};

export default Menu;

const MenuToggle = ({toggle}: {toggle: () => void}) => (
  <button className='absolute w-20 h-20 top-[3px] left-[28px]' onClick={toggle}>
    <svg width='25' height='25' viewBox='0 0 25 25'>
      <Path
        variants={{
          closed: {d: 'M 2 2.5 L 20 2.5'},
          open: {d: 'M 3 16.5 L 17 2.5'},
        }}
      />
      <Path
        d='M 2 9.423 L 20 9.423'
        variants={{
          closed: {opacity: 1},
          open: {opacity: 0},
        }}
        transition={{duration: 0.1}}
      />
      <Path
        variants={{
          closed: {d: 'M 2 16.346 L 20 16.346'},
          open: {d: 'M 3 2.5 L 17 16.346'},
        }}
      />
    </svg>
  </button>
);

const MenuItem = ({icon, text, navigate}: {icon: string; text?: string; navigate?: () => void}) => {
  return (
    <motion.li
      className='flex items-center space-x-2 cursor-pointer'
      variants={itemAnimations}
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.95}}
      onClick={navigate}
    >
      <Icon src={icon} size='40px' />
      <div className='flex justify-start items-center py-2 px-4 text-xl font-semibold'>{text}</div>
    </motion.li>
  );
};

const navAnimations = {
  open: {
    transition: {staggerChildren: 0.07, delayChildren: 0.2},
  },
  closed: {
    transition: {staggerChildren: 0.05, staggerDirection: -1},
  },
};

const itemAnimations = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
};

const sidebarAnimations = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

type PathProps = {
  d?: string;
  variants: Variants;
  transition?: {duration: number};
};

const Path = (props: PathProps) => (
  <motion.path stroke='currentColor' strokeWidth='3' strokeLinecap='round' {...props} />
);
