/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';

import {animate, motion, useMotionValue, useTransform} from 'motion/react';

export const Typewriter = ({
  delay,
  firstText,
  secondText,
}: {
  delay: number;
  firstText: string;
  secondText: string;
}) => {
  const count = useMotionValue(0);
  const secondCount = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const secondRounded = useTransform(secondCount, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => firstText.slice(0, latest));
  const displaySecondText = useTransform(secondRounded, (latest) => secondText.slice(0, latest));

  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    const controls = animate(count, firstText.length, {
      type: 'tween',
      delay: delay,
      duration: 2,
      ease: 'easeInOut',
      onComplete: () => {
        setDone(true);
        animate(secondCount, secondText.length, {
          type: 'tween',
          delay: 0.5,
          duration: 2,
          ease: 'easeInOut',
        });
      },
    });

    return controls.stop;
  }, []);

  return (
    <div className=''>
      <motion.span className='text-2xl'>{displayText}</motion.span>
      {done && (
        <>
          <br />
          <motion.span className='text-3xl'>{displaySecondText}</motion.span>
        </>
      )}
      <CursorBlinker />
    </div>
  );
};

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: 'linear',
      times: [0, 0.5, 0.5, 1],
    },
  },
};

const CursorBlinker = () => {
  return (
    <motion.div
      variants={cursorVariants}
      animate='blinking'
      className='inline-block py-0.5 px-2.5 translate-y-1 bg-primary'
    />
  );
};
