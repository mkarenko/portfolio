import '../../theme/themeSwitcher.css';

import {motion} from 'motion/react';
import {AnimatePresenceFixedType} from 'src/utils/constants';
import usePreferredTheme from '../../hooks/usePreferredTheme';

const ThemeButton = ({size = '24'}: {size?: string}) => {
  const {toggleTheme} = usePreferredTheme();

  return (
    <AnimatePresenceFixedType>
      <motion.button id='theme-toggle' className='theme-toggle' onClick={toggleTheme}>
        <motion.svg
          className='sun-and-moon'
          aria-hidden='true'
          width={size}
          height={size}
          viewBox='0 0 24 24'
        >
          <motion.mask className='moon' id='moon-mask'>
            <motion.rect x='0' y='0' width='100%' height='100%' fill='white' />
            <motion.circle cx='24' cy='10' r='6' fill='black' />
          </motion.mask>
          <motion.circle
            className='sun'
            cx='12'
            cy='12'
            r='6'
            mask='url(#moon-mask)'
            fill='currentColor'
          />
          <motion.g className='sun-beams' stroke='currentColor'>
            <motion.line x1='12' y1='1' x2='12' y2='3' />
            <motion.line x1='12' y1='21' x2='12' y2='23' />
            <motion.line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
            <motion.line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
            <motion.line x1='1' y1='12' x2='3' y2='12' />
            <motion.line x1='21' y1='12' x2='23' y2='12' />
            <motion.line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
            <motion.line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
          </motion.g>
        </motion.svg>
      </motion.button>
    </AnimatePresenceFixedType>
  );
};

export default ThemeButton;
