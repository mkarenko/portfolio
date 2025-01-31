import {motion} from 'motion/react';

type Props = {
  name: string;
  value: string | number;
  items: any[];
  renderItem: (item: any) => JSX.Element;
  selectValue?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const AnimatedSelect = ({name, value, items, renderItem, selectValue}: Props) => {
  return (
    <motion.select
      name={name}
      value={value}
      onChange={selectValue}
      className='w-full py-3 px-2 flex rounded-xl shadow-md focus:outline-none text-black'
    >
      {items.map((item) => (
        <motion.option key={item.value} value={item.value}>
          {renderItem(item)}
        </motion.option>
      ))}
    </motion.select>
  );
};

export default AnimatedSelect;
