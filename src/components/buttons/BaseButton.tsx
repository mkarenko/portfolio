import {ButtonHTMLAttributes, ReactNode, forwardRef} from 'react';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(({children, ...props}, ref) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});

BaseButton.defaultProps = {
  children: undefined,
};

BaseButton.displayName = 'BaseButton';

export default BaseButton;
