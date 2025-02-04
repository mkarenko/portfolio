import {ChangeEvent, useState} from 'react';

import {ISourceOptions} from '@tsparticles/engine';

import {Theme} from 'src/types/theme.type';
import {colors} from 'src/utils/colors';
import {animations} from 'src/utils/particles';
import Button from '../buttons/Button';
import Icon from '../Icon';
import {Checkbox} from '../inputs/Checkbox';
import Select from '../inputs/Select';
import Slider from '../inputs/Slider';
import Modal from '../Modal';

import playPauseIcon from '../../assets/icons/play-pause.svg';

type Props = {
  theme: Theme;
  iconSize?: string;
  currentAnimation: ISourceOptions;
  toggleAnimation: () => void;
  changeAnimationsSettings: (e: ChangeEvent<any>) => void;
};

const AnimationButtons = ({
  theme,
  iconSize = '24px',
  currentAnimation,
  toggleAnimation,
  changeAnimationsSettings,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        id='toggle-animation'
        className='w-10 h-10 flex justify-center items-center'
        onClick={toggleAnimation}
      >
        <Icon src={playPauseIcon} size={iconSize} />
      </Button>

      {/* <Button
        id='animation-settings'
        className='w-10 h-10 flex justify-center items-center'
        onClick={(e: any) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <Icon src={cogIcon} size={iconSize} />
      </Button> */}

      {open && (
        <Modal closeModal={() => setOpen(false)}>
          <div className='w-full flex justify-between items-center'>
            <label className='font-semibold'>Auto play</label>
            <Checkbox
              name='autoPlay'
              size={34}
              check={currentAnimation.autoPlay ?? true}
              setChecked={changeAnimationsSettings}
            />
          </div>
          <div className='w-full flex flex-col'>
            <label className='font-semibold'>Max fps</label>
            <Slider
              name='fpsLimit'
              min={30}
              max={120}
              defaultValue={currentAnimation?.fpsLimit!}
              onChange={changeAnimationsSettings}
            />
          </div>
          <div className='w-full flex flex-col'>
            <div className='font-semibold'>Animation</div>
            <Select
              // name='name'
              // defaultValue={currentAnimation.name}
              items={animations(theme)}
              // onChange={changeAnimationsSettings}
            />
          </div>
          <div className='w-full flex flex-col'>
            <div className='font-semibold'>Main color</div>
            <Select
              // name='mainColor'
              // defaultValue={currentAnimation.background?.color?.toString()}
              items={colors}
              // onChange={changeAnimationsSettings}
            />
          </div>
          <div className='w-full flex flex-col'>
            <div className='font-semibold'>Accent color</div>
            <Select
              // name='accentColor'
              // defaultValue={currentAnimation.background?.color?.toString()}
              items={colors}
              // onChange={changeAnimationsSettings}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default AnimationButtons;
