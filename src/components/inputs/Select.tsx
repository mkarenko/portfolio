import {InputHTMLAttributes, ReactNode} from 'react';

type Props = InputHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  width?: string;
  label?: string;
  labelPosition?: 'left' | 'right' | 'over' | 'below';
};

const Select = ({children, width, label, labelPosition = 'over', ...props}: Props) => {
  return (
    <div className='w-full' style={{width}}>
      <label className='font-semibold'>{label}</label>
      <select {...props} className={`w-full h-8 text-center bg-white ${props.className}`}>
        {children}
      </select>
    </div>
  );
};

export default Select;
