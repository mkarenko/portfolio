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

  return (
    <div
      className={classCss}
      style={{fill: color ?? theme === 'dark' ? 'white' : 'black'}}
      dangerouslySetInnerHTML={{__html: cleanedIcon}}
    />
  );
};

export default BaseIcon;
