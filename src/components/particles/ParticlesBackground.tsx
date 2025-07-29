/* eslint-disable react-hooks/exhaustive-deps*/
// prettier-ignore
import {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import {isDesktop, isMobile} from 'react-device-detect';

import {Container, ISourceOptions} from '@tsparticles/engine';
import Particles, {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from '@tsparticles/slim';

import {Theme} from 'src/types/theme.type';
import {animations} from 'src/utils/particles';
import AnimationButtons from './AnimationButtons';

const ParticlesBackground = ({theme}: {theme: Theme}) => {
  const containerRef = useRef<Container | undefined>(undefined);
  const [init, setInit] = useState<boolean>(false);
  const [animation, setAnimation] = useState<ISourceOptions>(animations(theme)[0]);

  useEffect(() => {
    if (!isMobile)
      initParticlesEngine(async (engine) => await loadSlim(engine)).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container: Container | undefined): Promise<void> => {
    if (container) containerRef.current = container;
  };

  const handleChangeSettings = (e: ChangeEvent<any>): void => {
    const {name, value, checked} = e.target;

    setAnimation((prevData) => {
      switch (name) {
        case 'autoPlay':
          return {...prevData, autoPlay: checked};

        case 'fpsLimit':
          return {...prevData, fpsLimit: value};

        case 'name': {
          const newAnimation = animations(theme).find((anim) => anim.key === value.key);
          return newAnimation ? {...newAnimation} : prevData;
        }

        case 'linksColor':
          return {
            ...prevData,
            particles: {
              ...prevData.particles,
              links: {
                ...(prevData.particles?.links as any),
                color: value.hex,
              },
            },
          };

        case 'particlesColor':
          return {
            ...prevData,
            particles: {
              ...prevData.particles,
              color: {value: value.hex},
            },
          };

        default:
          return prevData;
      }
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
    // Get the animation configuration from `animations` based on theme
    const newAnimation = animations(theme)[0];
    return newAnimation; // Only return the updated config
  }, [theme]);

  if (!init) return null;

  return (
    <>
      <div style={{position: 'relative', zIndex: -1}}>
        <Particles id='tsparticles' particlesLoaded={particlesLoaded} options={options} />
      </div>
      {isDesktop && (
        <div className='fixed z-10 flex items-center justify-center space-x-2 bottom-5 left-5'>
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
};

export default ParticlesBackground;
