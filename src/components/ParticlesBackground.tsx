/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {Container, ISourceOptions, MoveDirection, OutMode} from '@tsparticles/engine';
import Particles, {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from '@tsparticles/slim';

import {themeAtom} from 'src/atoms/theme.atom';
import Button from './buttons/Button';
import Icon from './Icon';

import {pause, play} from 'ionicons/icons';

export const ParticlesBackground = () => {
  const containerRef = useRef<Container | undefined>(undefined);
  const theme = useRecoilValue(themeAtom);
  const [init, setInit] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!init)
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
        await engine.load({});
      }).then(() => {
        setInit(true);
      });
  }, []);

  const particlesLoaded = async (container: Container | undefined): Promise<void> => {
    if (container) {
      containerRef.current = container;
      setPlaying(container.animationStatus);
    }
  };

  const toggleAnimation = () => {
    const container = containerRef.current;
    if (container) {
      if (playing) {
        container.pause();
      } else {
        container.play();
      }

      setPlaying(!playing);
    }
  };
  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {onClick: {enable: true, mode: 'push'}, onHover: {enable: true, mode: 'repulse'}},
        modes: {push: {quantity: 4}, repulse: {distance: 200, duration: 0.4}},
      },
      particles: {
        color: {value: theme === 'dark' ? '#fff' : '#000'},
        links: {color: '#9E0030', distance: 150, enable: true, opacity: 0.5, width: 1},
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {default: OutMode.out},
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: {density: {enable: true}, value: 80},
        opacity: {value: 0.5},
        shape: {type: 'circle'},
        size: {value: {min: 1, max: 5}},
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    }),
    [theme]
  );

  if (!init) return null;

  console.log(playing, containerRef.current?.animationStatus);

  return (
    <>
      <Particles id='particles' particlesLoaded={particlesLoaded} options={options} />
      <Button
        className='fixed bottom-5 left-5 w-10 h-10 z-10 hover:cursor-pointer'
        onClick={toggleAnimation}
      >
        <Icon src={playing ? pause : play} size='40' />
      </Button>
    </>
  );
};
