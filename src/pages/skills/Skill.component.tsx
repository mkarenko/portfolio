import {FC, useRef, useState} from 'react';

import MousePopUp from '../../components/MousePopUp';

type Props = {
  name: string;
  logo: string;
  url: string;
  language?: string | undefined;
  description: string;
};

const SkillComponent: FC<Props> = ({name, logo, language, description, url}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [position, setPosition] = useState<{x: number; y: number} | null>(null);

  const mouse = useRef<HTMLDivElement>(null);

  const updatePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouse.current) {
      setPosition({
        x: e.clientX - mouse.current.getBoundingClientRect().left,
        y: e.clientY - mouse.current.getBoundingClientRect().top,
      });
    }
  };

  return (
    <div
      ref={mouse}
      className='relative bg-slate-400 bg-'
      onMouseMove={updatePosition}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onClick={() => (window.location.href = url)}>
      <div className='flex-col space-y-2 cursor-pointer text-white'>
        <div className='flex'>
          <img alt='bitbucket_logo' className='w-14 h-14 mr-5' src={logo} />
          <div className='flex'>
            <div className='text-4xl'>{name}</div>
            <div className='text-sm ml-2'>{language ?? ''}</div>
          </div>
        </div>
        <div>{description}</div>
      </div>

      {isHovering && <MousePopUp title={name} src={url} position={position} />}
    </div>
  );
};

export default SkillComponent;
