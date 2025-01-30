import {HTMLAttributes} from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  src: string;
  width?: string;
  height?: string;
};

const Image = ({src, width = '100%', height = '100%', ...props}: Props) => {
  return (
    <div
      {...props}
      style={{
        width: width,
        height: height,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    />
  );
};

export default Image;
