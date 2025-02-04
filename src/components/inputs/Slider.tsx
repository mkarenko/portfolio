import {forwardRef, useState} from 'react';

import {HTMLMotionProps, motion} from 'motion/react';

const Slider = forwardRef<HTMLInputElement, HTMLMotionProps<'input'>>(({...props}, ref) => {
  const [sliderValue, setSliderValue] = useState(props.value);

  const handleSliderChange = (e: any) => {
    const newValue = parseFloat(e.target.value);

    setSliderValue(newValue);
    if (props.onChange) props.onChange(e);
  };

  return (
    <motion.div className='flex justify-center items-center py-3 space-x-4'>
      <motion.div>{props.min}</motion.div>
      <motion.input
        ref={ref}
        type='range'
        value={sliderValue}
        variants={sliderVariants}
        className='w-full accent-[#9E0030] cursor-pointer'
        onChange={handleSliderChange}
        {...props}
      />
      <motion.div>{props.max}</motion.div>
    </motion.div>
  );
});

export default Slider;

const sliderVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};
