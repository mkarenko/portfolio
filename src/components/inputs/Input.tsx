import {forwardRef, useState} from 'react';

import {HTMLMotionProps, motion} from 'motion/react';

enum Validity {
  Neutral,
  Valid,
  Invalid,
}

const colors = {
  [Validity.Neutral]: (opacity: number) => `rgba(0, 153, 255, ${opacity})`,
  [Validity.Valid]: (opacity: number) => `rgba(34, 204, 136, ${opacity})`,
  [Validity.Invalid]: (opacity: number) => `rgba(255, 0, 85, ${opacity})`,
};

const Input = forwardRef<HTMLInputElement, HTMLMotionProps<'input'>>(({...props}, ref) => {
  const [validity, setValidity] = useState(Validity.Neutral);

  const color = colors[validity];

  return (
    <motion.input
      initial={false}
      animate={{
        boxShadow: `0 0 0 2px ${color(0.7)}, 0 0 0 1px ${color(0)}`,
      }}
      whileFocus={{
        boxShadow: `0 0 0 5px ${color(1)}, 0 0 0 20px ${color(0)}`,
        transition: {
          boxShadow: {
            duration: 0.3,
            from: `0 0 0 2px ${color(0.7)}, 0 0 0 1px ${color(1)}`,
          },
        },
      }}
      className='w-full py-1 px-2 m-1.5 bg-white rounded-lg border-none text-lg leading-relaxed'
      onBlur={(e) => {
        const {value} = e.currentTarget;

        if (!value) setValidity(Validity.Neutral);
        else if (value.includes(' ')) setValidity(Validity.Invalid);
        else setValidity(Validity.Valid);
      }}
      {...props}
    />
  );
});

export default Input;
