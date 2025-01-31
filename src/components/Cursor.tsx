import {useEffect, useState} from 'react';

import {motion} from 'framer-motion';

const Cursor = () => {
  const [cursorStyle, setCursorStyle] = useState({x: 0, y: 0});

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorStyle({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: cursorStyle.y - 10,
        left: cursorStyle.x - 10,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'black',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      animate={{
        x: cursorStyle.x - 10,
        y: cursorStyle.y - 10,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    />
  );
};

export default Cursor;
