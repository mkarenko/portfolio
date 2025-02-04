import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {useRecoilValue} from 'recoil';

import * as motion from 'motion/react-client';
import {HeaderProps} from 'src/App';
import {themeAtom} from 'src/atoms/theme.atom';
import {transparentClass} from 'src/utils/constants';
import ThemeButton from '../buttons/ThemeButton';
import Icon from '../Icon';
import AnimationButtons from '../particles/AnimationButtons';

import colorPaletteIcon from '../../assets/icons/color-pallete.svg';
import diamondIcon from '../../assets/icons/diamond.svg';
import documentIcon from '../../assets/icons/document.svg';
import homeIcon from '../../assets/icons/home.svg';
import phoneIcon from '../../assets/icons/phone.svg';

import type {Variants} from 'motion/dist/react';
const Menu = ({particlesRef, handleDownloadPDF, handleSwitchLanguage}: HeaderProps) => {
  const navigate = useNavigate();
  const theme = useRecoilValue(themeAtom);
  const [open, setOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

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

  const handleToggleAnimation = () => {
    if (particlesRef?.current) particlesRef?.current.play();
  };

  const navbarClass = 'absolute top-0 bottom-0 left-0 w-full h-full' + transparentClass(theme);

  return (
    <motion.nav
      id='menu'
      initial={false}
      animate={open ? 'open' : 'closed'}
      className='z-10 absolute top-0 bottom-0 left-0 right-0 w-full h-full md:w-[300px]'
    >
      <motion.div variants={sidebarAnimations} className={navbarClass} />
      <MenuToggle toggle={() => setOpen(!open)} />
      <motion.ul variants={navAnimations} className='absolute p-8 top-20 space-y-5'>
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
        className='absolute left-5 bottom-5 flex justify-center items-center'
      >
        <motion.li
          variants={itemAnimations}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
          className='mt-1.5 mr-2.5'
        >
          <ThemeButton size='34' />
        </motion.li>

        <motion.li
          className='flex items-center space-x-2 cursor-pointer'
          variants={itemAnimations}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
        >
          <AnimationButtons
            theme={theme}
            iconSize='40px'
            currentAnimation={{}}
            toggleAnimation={handleToggleAnimation}
            changeAnimationsSettings={() => void ''}
          />
        </motion.li>
      </motion.ul>
    </motion.nav>
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
