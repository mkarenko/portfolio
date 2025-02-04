import {ReactNode} from 'react';

import {motion} from 'motion/react';
import {AnimatePresenceFixedType} from 'src/utils/constants';
import Button from './buttons/Button';
import Icon from './Icon';

import closeIcon from '../assets/icons/close.svg';

const Modal = ({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: (value: boolean) => void;
}) => {
  const close = () => closeModal(false);

  return (
    <AnimatePresenceFixedType>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='fixed z-50 -left-2 top-0 bottom-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80'
        onClick={close}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={dropInVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='z-50 w-full h-full md:w-1/5 md:h-1/2 p-8 flex flex-col justify-evenly
          md:justify-between md:items-center bg-card md:rounded-2xl md:border-2 md:border-border'
        >
          <div className='absolute top-5 right-5 md:hidden'>
            <Button onClick={close}>
              <Icon src={closeIcon} size='40px' />
            </Button>
          </div>

          {/* Modal content */}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresenceFixedType>
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
