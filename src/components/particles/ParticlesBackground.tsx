/* eslint-disable react-hooks/exhaustive-deps*/
// prettier-ignore
import {ChangeEvent, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {isDesktop} from 'react-device-detect';

import {Container, ISourceOptions} from '@tsparticles/engine';
import Particles, {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from '@tsparticles/slim';

import {Theme} from 'src/types/theme.type';
import {animations} from 'src/utils/particles';
import AnimationButtons from './AnimationButtons';

const ParticlesBackground = forwardRef(({theme}: {theme: Theme}, ref) => {
  const containerRef = useRef<Container | undefined>(undefined);

  const [init, setInit] = useState<boolean>(false);
  const [animation, setAnimation] = useState<ISourceOptions>(animations(theme)[0]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const container = containerRef.current;
      const playing = container?.animationStatus;

      if (container)
        if (playing) container.pause();
        else container.play();
    },
  }));

  const particlesLoaded = async (container: Container | undefined): Promise<void> => {
    if (container) containerRef.current = container;
  };

  const handleChangeSettings = (e: ChangeEvent<any>): void => {
    const {name, value, checked} = e.target;

    setAnimation((prevData) => {
      if (name === 'autoPlay') return {...prevData, autoPlay: checked};
      if (name === 'fpsLimit') return {...prevData, fpsLimit: value};

      if (name === 'name') {
        const newAnimation = animations(theme).find((anim) => anim.key === value);
        return newAnimation ? {...newAnimation} : prevData;
      }

      return prevData;
    });
  };

  const handleToggleAnimation = () => {
    const container = containerRef.current;
    const playing = container?.animationStatus;

    if (container)
      if (playing) container.pause();
      else container.play();
  };

  // todo changes the autoplay state after theme click
  const options: ISourceOptions = useMemo(() => {
    return animation;
  }, [theme, animation]);

  if (!init) return null;

  return (
    <>
      <div style={{position: 'relative', zIndex: -1}}>
        <Particles id='tsparticles' particlesLoaded={particlesLoaded} options={options} />
      </div>
      {isDesktop && (
        <div className='fixed z-10 bottom-5 left-5 flex justify-center items-center space-x-2'>
          <AnimationButtons
            theme={theme}
            iconSize='32px'
            currentAnimation={animation}
            toggleAnimation={handleToggleAnimation}
            changeAnimationsSettings={handleChangeSettings}
          />
        </div>
      )}
    </>
  );
});

export default ParticlesBackground;
