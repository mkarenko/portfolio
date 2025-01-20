import {useRecoilValue} from 'recoil';

import {themeAtom} from '../atoms/theme.atom';

type Props = {
  icon: string;
  color?: string;
  classCss?: string;
};

const BaseIcon = ({icon, color, classCss}: Props) => {
  const theme = useRecoilValue(themeAtom);

  const cleanedIcon = icon.replace('data:image/svg+xml;utf8,', '');

  color = theme === 'dark' ? '#e7e4e5' : '#000000';

  return (
    <div
      style={{fill: color}}
      className={classCss}
      dangerouslySetInnerHTML={{__html: cleanedIcon}}
    />
  );
};

export default BaseIcon;
