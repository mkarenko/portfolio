import {FocusEvent, useEffect, useRef, useState} from 'react';

import {motion, Variants} from 'motion/react';
import {ColoredBox} from '../ColoredBox';
import Icon from '../Icon';

import arrowUpIcon from '../../assets/icons/arrow-up.svg';

const Select = ({items}: {items: any[]}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    const list = listRef.current;
    const selecteButton = selectButtonRef.current;
    if (open && list && selecteButton) {
      const listRect = list.getBoundingClientRect();
      const buttonRect = selecteButton.getBoundingClientRect();
      const spaceAbove = buttonRect.top;
      const spaceBelow = window.innerHeight - buttonRect.bottom;

      if (spaceBelow < listRect.height && spaceAbove > listRect.height) {
        setPosition('top');
      } else setPosition('bottom');
    }
  }, [open]);

  const handelSelect = (item: any) => {
    setSelected(item);
    setOpen(false);
  };

  const handleHideSelect = (e: FocusEvent<HTMLElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={open ? 'open' : 'closed'}
      className='relative w-full rounded-lg cursor-pointer text-black bg-white'
      onBlur={handleHideSelect}
    >
      <motion.button
        ref={selectButtonRef}
        whileTap={{scale: 0.9}}
        onClick={() => setOpen(!open)}
        className='w-full p-2 flex justify-between items-center rounded-lg focus:border border-primary'
      >
        {selected === null && <div className='px-2'>Select</div>}
        {selected && (
          <div className='flex justify-evenly items-center space-x-3 font-bold'>
            <div>{selected.hex && <ColoredBox color={selected.hex} />}</div>
            <div>{selected.name}</div>
          </div>
        )}
        <motion.div
          variants={{open: {rotate: 180}, closed: {rotate: 0}}}
          transition={{duration: 0.2}}
          style={{originY: 0.55}}
        >
          <Icon src={arrowUpIcon} />
        </motion.div>
      </motion.button>

      <motion.ul
        ref={listRef}
        variants={listVariants}
        style={{
          pointerEvents: open ? 'auto' : 'none',
          top: position === 'bottom' ? '100%' : 'auto',
          bottom: position === 'top' ? '100%' : 'auto',
        }}
        className='absolute z-20 left-0 right-0 flex flex-col items-center max-h-[300px] space-y-2
        bg-white rounded-b-lg overflow-y-scroll overflow-hidden'
      >
        {items.map((item: any) => (
          <motion.li
            key={item.id ?? item.key}
            value={item}
            whileHover={{scale: 1.03}}
            whileTap={{scale: 0.97}}
            variants={itemVariants}
            className='p-2 flex justify-center items-center space-x-3 cursor-pointer'
            onClick={() => handelSelect(item)}
          >
            <div className='flex justify-evenly items-center space-x-3 font-bold'>
              <div>{item.hex && <ColoredBox color={item.hex} />}</div>
              <div>{item.name}</div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default Select;

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {type: 'spring', stiffness: 300, damping: 24},
  },
  closed: {opacity: 0, y: 20, transition: {duration: 0.2}},
};

const listVariants: Variants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.5,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50%)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
};
