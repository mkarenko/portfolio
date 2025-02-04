import {forwardRef} from 'react';

import {HTMLMotionProps, motion} from 'motion/react';

const Button = forwardRef<HTMLButtonElement, HTMLMotionProps<'button'>>(
  ({children, ...props}, ref) => (
    <motion.button ref={ref} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} {...props}>
      {children}
    </motion.button>
  )
);

Button.displayName = 'Button';

export default Button;
