import {atom, useRecoilValue} from 'recoil';

import {AnimationSettings} from 'src/types/particles.type';
import {Theme} from 'src/types/theme.type';
import {colors} from 'src/utils/colors';
import {animations} from 'src/utils/particles';
import {themeAtom} from './theme.atom';

export const defaultAnimationState = (theme: Theme): AnimationSettings => {
  const defaultSettings = animations(theme)[0];

  return {
    autoPlay: true,
    animation: 'links',
    fps: defaultSettings.fpsLimit!,
    mainColor: colors[0],
    accentColor: colors[0],
    config: defaultSettings,
  };
};

export const particlesAtom = atom<AnimationSettings>({
  key: 'particles',
  default: defaultAnimationState('light'),
  effects_UNSTABLE: [
    ({setSelf, onSet}) => {
      const savedParticles = localStorage.getItem('particles');
      const theme = useRecoilValue(themeAtom);

      if (savedParticles) {
        try {
          setSelf(JSON.parse(savedParticles));
        } catch {
          setSelf(defaultAnimationState(theme));
        }
      }

      onSet((newValue) => {
        localStorage.setItem('particles', JSON.stringify(newValue));
      });
    },
  ],
});
