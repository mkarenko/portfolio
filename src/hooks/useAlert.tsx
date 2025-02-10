import {useCallback, useEffect, useState} from 'react';

import {motion, SVGMotionProps} from 'motion/react';
import {AlertType} from 'src/types/alert.type';

export const useAlert = () => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = useCallback((text: string, style: 'success' | 'error' | 'warning' | 'light') => {
    setAlerts((prevAlerts) => [...prevAlerts, {id: Date.now(), text, style}]);
  }, []);

  const removeAlert = useCallback((id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  // remove alert after 3 seconds
  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.slice(1));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alerts]);

  const renderAlerts = (
    <motion.div className='mx-auto w-fit h-9 fixed right-0 left-0 top-5 flex-col'>
      {alerts.slice(0, 3).map((alert, index) => (
        <motion.li
          key={alert.id}
          layout
          style={styleType(alert.style)}
          variants={alertVariants}
          whileHover='hover'
          initial='initial'
          animate='animate'
          exit='exit'
          className='mx-auto w-fit relative flex items-center px-4 py-2 mb-4 font-bold rounded-lg hover:cursor-pointer'
          onClick={() => removeAlert(alert.id)}
        >
          <div style={{color: alert.style ? '#030303' : '#929292'}}>
            {alert.text}

            {index === 2 && alerts.length > 3 && (
              <div className='-right-3 -top-2 bg-primary w-6 h-6 absolute flex justify-center items-center text-xs text-white rounded-full'>
                +{alerts.length - 3}
              </div>
            )}
          </div>

          <div className='pt-1 pl-2'>
            <svg width='18' height='18' viewBox='0 0 23 23'>
              <Path color={alert.style ? '#030303' : '#989898'} d='M 3 16.5 L 17 2.5' />
              <Path color={alert.style ? '#030303' : '#989898'} d='M 3 2.5 L 17 16.346' />
            </svg>
          </div>
        </motion.li>
      ))}
    </motion.div>
  );

  return {
    addAlert,
    alerts: renderAlerts,
  };
};

const styleType = (style: string) => {
  switch (style) {
    case 'success':
      return {background: 'linear-gradient(15deg, #6adb00, #04e800)'};
    case 'error':
      return {background: 'linear-gradient(15deg, #ff596d, #d72c2c)'};
    case 'warning':
      return {background: 'linear-gradient(15deg, #ffac37, #ff9238)'};
    case 'light':
      return {background: 'linear-gradient(15deg, #e7e7e7, #f4f4f4)'};
    default:
      return {background: 'linear-gradient(15deg, #202121, #292a2d)'};
  }
};

const Path = ({...props}: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke={props.color}
    strokeLinecap='square'
    {...props}
  />
);

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
