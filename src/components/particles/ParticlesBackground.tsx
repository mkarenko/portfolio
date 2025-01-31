/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {isDesktop} from 'react-device-detect';
import {useRecoilState} from 'recoil';

import {Container, ISourceOptions} from '@tsparticles/engine';
import Particles, {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from '@tsparticles/slim';

import {particlesAtom} from 'src/atoms/particles.atom';
import {Theme} from 'src/types/theme.type';
import {particlesAnimations} from 'src/utils/particles';
import AnimationButtons from './AnimationButtons';

const ParticlesBackground = forwardRef(({theme}: {theme: Theme}, ref) => {
  const containerRef = useRef<Container | undefined>(undefined);

  const [init, setInit] = useState<boolean>(false);
  const [animationSettings, setAnimationSetings] = useRecoilState(particlesAtom);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => containerRef.current?.play(),
    pause: () => containerRef.current?.pause(),
  }));

  const particlesLoaded = async (container: Container | undefined): Promise<void> => {
    if (container) containerRef.current = container;
  };

  const handlePlayAnimation = () => {
    const container = containerRef.current;
    if (container && !container.animationStatus) container.play();
  };

  const handlePauseAnimation = () => {
    const container = containerRef.current;
    if (container && container.animationStatus) container.pause();
  };

  const handleAnimationSettings = (e: ChangeEvent<any>): void => {
    const {name, value} = e.target;
    setAnimationSetings((prevData: any) => ({...prevData, [name]: value}));
  };

  const options: ISourceOptions = useMemo(
    () => particlesAnimations(theme)[0].config,
    [theme, animationSettings]
  );

  if (!init) return null;

  return (
    <>
      <div style={{position: 'relative', zIndex: -1}}>
        <Particles id='tsparticles' particlesLoaded={particlesLoaded} options={options} />
      </div>
      {isDesktop && (
        <div
          style={{zIndex: 10}}
          className='fixed bottom-5 left-5 flex justify-center items-center space-x-2'
        >
          <AnimationButtons
            theme={theme}
            iconSize='24'
            currentSettings={animationSettings}
            playAnimation={handlePlayAnimation}
            pauseAnimation={handlePauseAnimation}
            changeAnimationsSettings={handleAnimationSettings}
          />
        </div>
      )}
    </>
  );
});

export default ParticlesBackground;
