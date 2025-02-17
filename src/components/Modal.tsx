import {ReactNode, useRef} from 'react';

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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const close = () => closeModal(false);

  // TODO later
  // useEffect(() => {
  //   if (!modalRef.current) return;
  //   const modal = modalRef.current;

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') close();
  //   };

  //   modal.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     modal.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  return (
    <AnimatePresenceFixedType>
      <motion.div
        ref={modalRef}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='-left-2 bg-opacity-80 w-full h-full fixed top-0 bottom-0 z-50 flex justify-center items-center bg-black'
        onClick={close}
        onKeyDown={(e) => {
          console.log(e);

          e.key === 'Escape' && close();
        }}
      >
        {/* TODO */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={dropInVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='bg-card w-full h-full z-50 flex flex-col justify-evenly p-8 md:border-border md:w-1/5 md:h-1/2 md:justify-between md:items-center md:rounded-2xl md:border-2'
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
