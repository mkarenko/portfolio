import {useRecoilValue} from 'recoil';

import {motion, useScroll, useTransform} from 'motion/react';
import {themeAtom} from 'src/atoms/theme.atom';
import {transparentClass} from 'src/utils/constants';

const FloatingTopButton = () => {
  const theme = useRecoilValue(themeAtom);
  const {scrollY} = useScroll();
  const visible = useTransform(scrollY, [0, 100], [0, 1]);

  const handleScrollTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

  return (
    <motion.div
      style={{opacity: visible}}
      className='fixed right-10 bottom-10 z-10'
      animate={{y: [-10, 10, -10]}}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    >
      <button
        className={`${transparentClass(theme)} p-4 rounded-full shadow-lg rotate-180`}
        onClick={handleScrollTop}
      >
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
        </motion.svg>
      </button>
    </motion.div>
  );
};

export default FloatingTopButton;
