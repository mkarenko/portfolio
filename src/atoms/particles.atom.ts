import {atom, selector} from 'recoil';

import {AnimationSettings} from 'src/types/particles.type';
import {Theme} from 'src/types/theme.type';
import {colors} from 'src/utils/colors';
import {particlesAnimations} from 'src/utils/particles';
import {themeAtom} from './theme.atom';

export const defaultAnimationState = (theme: Theme): AnimationSettings => {
  const defaultSettings = particlesAnimations(theme)[0];

  return {
    autoPlay: true,
    animation: 'links',
    fps: defaultSettings.config.fpsLimit!,
    bgColor: theme ? colors[8] : colors[9],
    mainColor: colors[0],
    accentColor: colors[0],
    config: defaultSettings.config,
  };
};

export const setAnimationState = (settings: AnimationSettings) => {
  localStorage.setItem('particles', JSON.stringify(settings));
};

export const animationStateSelector = selector<AnimationSettings>({
  key: 'animationStateSelector',
  get: ({get}) => {
    const theme = get(themeAtom);
    const particles = localStorage.getItem('particles');

    if (particles) {
      try {
        return JSON.parse(particles);
      } catch {
        return defaultAnimationState(theme);
      }
    }

    return defaultAnimationState(theme);
  },
});

export const particlesAtom = atom<AnimationSettings>({
  key: 'particles',
  default: animationStateSelector,
});
