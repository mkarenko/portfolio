import {InputHTMLAttributes} from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
  label?: string;
  labelPosition?: 'left' | 'right' | 'over' | 'below';
};

const Input = ({width, label, labelPosition = 'over', ...props}: Props) => {
  return (
    <div className='w-full' style={{width}}>
      <label className='font-semibold'>{label}</label>
      <input {...props} className={`w-full h-8 ${props.className}`} />
    </div>
  );
};

export default Input;
