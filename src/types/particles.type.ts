import {IOptions, RecursivePartial} from '@tsparticles/engine';

import {ColorType} from './colors.type';

export type AnimationSettings = {
  autoPlay: boolean;
  animation: 'links' | 'triangles' | 'snow' | 'stars';
  fps: number;
  mainColor: ColorType;
  accentColor: ColorType;
  config: RecursivePartial<IOptions>;
};

export type AnimationsType = {
  id: number;
  name: string;
  config: RecursivePartial<IOptions>;
};
