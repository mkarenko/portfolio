import {ReactNode} from 'react';

import {motion} from 'motion/react';
import Button from './buttons/Button';
import Icon from './Icon';

import {closeCircle} from 'ionicons/icons';
import checkmark from '../assets/icons/checkmark.svg';

type Props = {
  children: ReactNode;
  closeModal: (value: boolean) => void;
};

const Modal = ({children, closeModal}: Props) => {
  const close = () => closeModal(false);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className='fixed top-0 left-0 h-full w-full bg-black bg-opacity-80 flex items-center
      justify-center overflow-hidden z-10'
      onClick={close}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropInVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='relative w-fit h-fit p-8 flex flex-col
        justify-between items-center bg-card rounded-2xl border-2 border-border'
      >
        <div>{children}</div>
        <div className='w-full flex justify-between items-center pt-10 mx-5 text-white font-bold'>
          <Button
            className='w-36 h-12 flex justify-center items-center bg-red-500
            rounded-xl border-2'
            onClick={close}
          >
            Close
            <Icon src={closeCircle} size='24' />
          </Button>
          <Button
            className='w-36 h-12 flex justify-center items-center bg-green-500
            rounded-xl border-2'
            onClick={close}
          >
            Save
            <Icon src={checkmark} size='24' />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;

const dropInVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};
