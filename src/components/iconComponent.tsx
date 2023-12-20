import {FC} from 'react';

type IconComponentProps = {
  icon: string;
  color?: string;
  classCss?: string;
};

const IconComponent: FC<IconComponentProps> = ({icon, color, classCss}) => {
  const cleanedIcon = icon.replace('data:image/svg+xml;utf8,', '');

  return (
    <div
      className={classCss}
      style={{fill: color}}
      dangerouslySetInnerHTML={{__html: cleanedIcon}}
    />
  );
};

export default IconComponent;
