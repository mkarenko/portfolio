import {InputHTMLAttributes} from 'react';

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  width?: string;
  label: string;
  labelPosition?: 'left' | 'right' | 'over' | 'below';
};

const BaseTextarea = ({width, label, labelPosition = 'over', ...props}: Props) => {
  return (
    <div className='w-full' style={{width}}>
      <label className='font-semibold'>{label}</label>
      <textarea
        {...props}
        className={`w-full text-center align-middle rounded text-black ${props.className}`}
      />
    </div>
  );
};

export default BaseTextarea;
