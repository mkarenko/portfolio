import {FocusEvent, ReactNode, useEffect, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {motion, Variants} from 'motion/react';
import {menuAtom} from 'src/atoms/menu.atom';
import {colors, Validity} from 'src/pages/common/Contact.page';
import Icon from '../Icon';

import arrowUpIcon from '../../assets/icons/arrow-up.svg';

const Select = ({
  keyName,
  items,
  defaultValue,
  renderItem,
  renderSelected,
  onSelect,
}: {
  keyName: string;
  items: any[];
  defaultValue?: string | ReactNode;
  renderItem: (item: any) => ReactNode;
  renderSelected?: (selected: any) => ReactNode;
  onSelect: (value: any) => void;
}) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);

  const menuOpen = useRecoilValue(menuAtom);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  const color = colors[Validity.Neutral];

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
    if (!navRef.current) return;
    const selectName = navRef.current.getAttribute('id');

    onSelect({target: {name: selectName, value: item}});
    setSelected(item);
    setOpen(false);
  };

  const handleHideSelect = (e: FocusEvent<HTMLElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  };

  const itemCss = 'w-full flex justify-center items-center space-x-3';

  return (
    <motion.nav
      id={keyName}
      ref={navRef}
      initial={false}
      animate={open ? 'open' : 'closed'}
      style={{zIndex: menuOpen ? '-10' : '10', transition: 'z-index 0.8s ease-in-out'}}
      className='w-full relative my-1 text-center text-black rounded-lg cursor-pointer'
      onBlur={handleHideSelect}
    >
      <motion.button
        ref={selectButtonRef}
        initial={false}
        animate={{boxShadow: `0 0 0 2px ${color(0.7)}, 0 0 0 1px ${color(0)}`}}
        whileTap={{scale: 0.9}}
        onClick={() => setOpen(!open)}
        className='w-full flex justify-between items-center py-1 bg-white rounded-lg'
      >
        {selected === null && defaultValue === undefined && <div className={itemCss}>Select</div>}
        {selected === null && defaultValue !== undefined && (
          <div className={itemCss}>{defaultValue}</div>
        )}
        {selected && (
          <div className={itemCss}>{renderSelected ? renderSelected(selected) : selected.name}</div>
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
          borderRadius: '0.5rem',
          borderColor: color(0.7),
          borderWidth: '2px',
        }}
        className='absolute left-0 right-0 max-h-[300px] space-y-2 bg-white rounded-b-lg
        overflow-y-scroll overflow-hidden'
      >
        {items.map((item: any) => (
          <motion.li
            key={item.id ?? item.key ?? item.shortName}
            value={item}
            whileHover={{
              scale: 1.03,
              color: '#FFF',
              backgroundColor: '#9E0030',
            }}
            style={{
              color: selected === item ? '#FFF' : '#000',
              backgroundColor: selected === item ? '#9E0030' : '#FFF',
            }}
            whileTap={{scale: 0.97}}
            variants={itemVariants}
            className={`${itemCss} py-2`}
            onClick={() => handelSelect(item)}
          >
            {renderItem !== undefined ? renderItem(item) : <motion.div>{item.name}</motion.div>}
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
