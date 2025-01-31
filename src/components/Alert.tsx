import {motion} from 'motion/react';

type Props = {
  text: string;
  alert: any;
  alerts: any[];
  setAlert: () => void;
};

// const styleType = () => {
//   switch (style) {
//     case 'success':
//       return {background: 'linear-gradient(15deg, #6adb00, #04e800)'};
//     case 'error':
//       return {background: 'linear-gradient(15deg, #ff596d, #d72c2c)'};
//     case 'warning':
//       return {background: 'linear-gradient(15deg, #ffac37, #ff9238)'};
//     case 'light':
//       return {background: 'linear-gradient(15deg, #e7e7e7, #f4f4f4)'};
//     default:
//       return {background: 'linear-gradient(15deg, #202121, #292a2d)'};
//   }
// };

const Alert = ({alert, alerts, setAlert}: Props) => {
  const {text, style} = alert;

  // const handleClose = () => setAlert(remove(alerts, alert));

  return (
    <motion.li
      // positionTransition={true}
      // style={styleType()}
      variants={alertVariants}
      whileHover='hover'
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <h3 style={{color: style ? '#030303' : '#929292'}} className='notification-text'>
        {text}
      </h3>
    </motion.li>
  );
};

export default Alert;

export const remove = (arr: any[], item: any) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex((i) => i === item),
    1
  );
  return newArr;
};

let newIndex = 0;
export const add = (arr: any[], text: string, style: any) => {
  newIndex = newIndex + 1;
  return [...arr, {id: newIndex, text: text, style: style}];
};

const alertVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.2,
    transition: {duration: 0.1},
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: {ease: 'easeOut', duration: 0.15},
  },
  hover: {scale: 1.05, transition: {duration: 0.1}},
};
