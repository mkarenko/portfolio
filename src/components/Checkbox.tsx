import {motion} from 'motion/react';

type Props = {
  name: string;
  value: boolean;
  onChange: (e: any) => void;
};

const Checkbox = ({name, value, onChange}: Props) => {
  return <motion.input type='checkbox' name={name} checked={value} onChange={onChange} />;
};

export default Checkbox;
