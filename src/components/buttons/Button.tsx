import {forwardRef, ReactNode} from 'react';

import {HTMLMotionProps, motion} from 'motion/react';

type ButtonProps = HTMLMotionProps<'button'> & {
  children?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, ...props}, ref) => {
  return (
    <motion.button {...props} ref={ref} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}}>
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
