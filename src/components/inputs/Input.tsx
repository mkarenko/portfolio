import {forwardRef, useState} from 'react';

import {HTMLMotionProps, motion} from 'motion/react';
import {colors, Validity} from 'src/pages/common/Contact.page';

type Props = HTMLMotionProps<'input'> & {
  validate?: Validity;
};

const Input = forwardRef(({...props}: Props, ref) => {
  const [validity, setValidity] = useState(props.validate);

  const color = colors[validity ?? Validity.Neutral];

  return (
    <motion.input
      initial={false}
      animate={{boxShadow: `0 0 0 2px ${color(0.7)}, 0 0 0 1px ${color(0)}`}}
      whileFocus={{
        boxShadow: `0 0 0 20px ${color(0)}`,
        transition: {
          boxShadow: {
            duration: 0.3,
            from: `0 0 0 2px ${color(0.7)}, 0 0 0 1px ${color(1)}`,
          },
        },
      }}
      className='w-full py-1 px-2 m-1.5 bg-white rounded-lg text-black text-lg leading-relaxed'
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
