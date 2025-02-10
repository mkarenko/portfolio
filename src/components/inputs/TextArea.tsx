import {HTMLMotionProps, motion} from 'motion/react';
import {colors, Validity} from 'src/pages/common/Contact.page';

type Props = HTMLMotionProps<'textarea'> & {
  width?: string;
  label?: string;
  labelPosition?: 'left' | 'right' | 'over' | 'below';
};

const Textarea = ({width, label, labelPosition = 'over', ...props}: Props) => {
  const color = colors[Validity.Neutral];

  return (
    <motion.div className='w-full'>
      {label && <label className='font-semibold'>{label}</label>}
      <motion.textarea
        initial={false}
        animate={{boxShadow: `0 0 0 2px ${color(0.7)}, 0 0 0 1px ${color(0)}`}}
        className='w-full h-32 min-h-fit px-4 py-2 my-1 text-lg text-black bg-white rounded-lg'
        {...props}
      />
    </motion.div>
  );
};

export default Textarea;
