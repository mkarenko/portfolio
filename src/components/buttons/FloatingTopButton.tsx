import {motion, useScroll, useTransform} from 'motion/react';

const FloatingTopButton = () => {
  const {scrollY} = useScroll();
  const visible = useTransform(scrollY, [0, 100], [0, 1]);

  const handleScrollTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

  return (
    <motion.div
      style={{opacity: visible}}
      className='fixed bottom-10 right-10'
      animate={{y: [-10, 10, -10]}}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    >
      <button className='p-4 bg-card rounded-full shadow-lg rotate-180' onClick={handleScrollTop}>
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
