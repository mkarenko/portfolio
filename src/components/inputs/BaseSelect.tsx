import {InputHTMLAttributes, ReactNode} from 'react';

type Props = InputHTMLAttributes<HTMLSelectElement> & {
  items: any[];
  width?: string;
  label?: string;
  labelPosition?: 'left' | 'right' | 'over' | 'below';
  renderItem?: (item: any) => ReactNode;
};

const BaseSelect = ({items, width, label, labelPosition = 'over', renderItem, ...props}: Props) => {
  return (
    <div className='w-full' style={{width}}>
      <label className='font-semibold'>{label}</label>
      <select {...props} className={`w-full h-8 text-center text-black rounded ${props.className}`}>
        {items.map((item: any) => (
          <option key={item} value={item}>
            {renderItem ? renderItem(item) : item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaseSelect;
