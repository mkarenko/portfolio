import {useState} from 'react';

import {motion} from 'motion/react';

type Props = {
  min: number;
  max: number;
  value: number;
  name?: string;
  onChange: (e: any) => void;
};

const Slider = ({min, max, value, name, onChange}: Props) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (e: any) => {
    const newValue = parseFloat(e.target.value);

    setSliderValue(newValue);
    onChange(e);
  };

  return (
    <motion.div className='flex justify-center items-center py-3 space-x-4'>
      <motion.div>{min}</motion.div>
      <motion.input
        name={name}
        min={min}
        max={max}
        type='range'
        value={sliderValue}
        variants={sliderVariants}
        onChange={handleSliderChange}
        className='w-full cursor-pointer'
      />
      <motion.div>{max}</motion.div>
    </motion.div>
  );
};

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
