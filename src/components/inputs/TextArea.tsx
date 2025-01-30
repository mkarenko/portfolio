import {InputHTMLAttributes} from 'react';

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  width?: string;
  label: string;
  labelPosition?: 'left' | 'right' | 'over' | 'below';
};

const Textarea = ({width, label, labelPosition = 'over', ...props}: Props) => {
  return (
    <div className='w-full' style={{width}}>
      <label className='font-semibold'>{label}</label>
      <textarea {...props} className={`w-full ${props.className}`} />
    </div>
  );
};

export default Textarea;
