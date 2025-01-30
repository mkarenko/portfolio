import {forwardRef, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {HTMLMotionProps, motion} from 'framer-motion'; // Zmienione na 'framer-motion'
import {themeAtom} from '../atoms/theme.atom';

type IconProps = HTMLMotionProps<'div'> & {
  src: string;
  size?: string;
  color?: string;
  className?: string;
};

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({src, size = '24px', color = 'currentColor', className}: IconProps, ref) => {
    const theme = useRecoilValue(themeAtom);
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
      (async () => {
        if (src.startsWith('data:image/svg+xml;utf8,')) {
          setSvgContent(src.replace('data:image/svg+xml;utf8,', ''));
          return;
        }

        try {
          const response = await fetch(src);
          if (response.ok) {
            const svgText = await response.text();
            setSvgContent(svgText);
          } else {
            console.error('Błąd ładowania SVG:', response.status);
          }
        } catch (error) {
          console.error('Błąd pobierania pliku SVG:', error);
        }
      })();
    }, [src]);

    return (
      <motion.div
        ref={ref}
        whileHover={{scale: 1.2}}
        style={{
          fill: theme === 'dark' ? '#e7e4e5' : '#000000',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className={className}
        dangerouslySetInnerHTML={{__html: svgContent}}
      />
    );
  }
);

export default Icon;
