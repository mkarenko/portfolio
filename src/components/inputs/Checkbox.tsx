import {ChangeEvent, useEffect} from 'react';

import {motion, useMotionValue, useTransform} from 'motion/react';

const tickVariants = {
  pressed: (isChecked: boolean) => ({pathLength: isChecked ? 0.85 : 0.2}),
  checked: {pathLength: 1},
  unchecked: {pathLength: 0},
};

const boxVariants = {
  hover: {scale: 1.05, strokeWidth: 60},
  pressed: {scale: 0.95, strokeWidth: 35},
  checked: {stroke: 'currentColor'},
  unchecked: {stroke: 'currentColor', strokeWidth: 50},
};

export const Checkbox = ({
  name,
  check,
  size = 40,
  checkColor = '#9E0030',
  setChecked,
}: {
  name?: string;
  check: boolean;
  size?: number;
  checkColor?: string;
  setChecked: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const pathLength = useMotionValue<number>(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  useEffect(() => {
    setChecked({
      target: {name, checked: check},
    } as React.ChangeEvent<HTMLInputElement>);
  }, []);

  const handleCheckClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();

    setChecked({
      target: {name, checked: !check},
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <motion.svg
      name={name}
      initial={false}
      animate={check ? 'checked' : 'unchecked'}
      whileHover='hover'
      whileTap='pressed'
      width={size}
      height={size}
      viewBox='0 0 440 440'
      onClick={handleCheckClick}
    >
      <motion.path
        d='M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z'
        fill='transparent'
        strokeWidth='50'
        stroke='currentColor'
        variants={boxVariants}
      />
      <motion.path
        d='M 0 128.666 L 128.658 257.373 L 341.808 0'
        transform='translate(54.917 88.332) rotate(-4 170.904 128.687)'
        fill='transparent'
        strokeWidth='65'
        stroke='#ddd'
        strokeLinecap='round'
        strokeLinejoin='round'
        variants={tickVariants}
        style={{pathLength, opacity}}
        custom={check}
      />
      <motion.path
        d='M 0 128.666 L 128.658 257.373 L 341.808 0'
        transform='translate(54.917 68.947) rotate(-4 170.904 128.687)'
        fill='transparent'
        strokeWidth='65'
        stroke={checkColor}
        strokeLinecap='round'
        strokeLinejoin='round'
        variants={tickVariants}
        style={{pathLength, opacity}}
        custom={check}
      />
    </motion.svg>
  );
};
