import {ChangeEvent, ElementType, useState} from 'react';

import {AnimatePresence} from 'motion/react';
import {AnimationSettings} from 'src/types/particles.type';
import {Theme} from 'src/types/theme.type';
import {colors} from 'src/utils/colors';
import {particlesAnimations} from 'src/utils/particles';
import Button from '../buttons/Button';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import Select from '../inputs/Select';
import Slider from '../inputs/Slider';
import Modal from '../Modal';

import pause from '../../assets/icons/pause.svg';
import play from '../../assets/icons/play.svg';
import settings from '../../assets/icons/settings.svg';

type Props = {
  theme: Theme;
  iconSize?: string;
  currentSettings: AnimationSettings;
  playAnimation: () => void;
  pauseAnimation: () => void;
  changeAnimationsSettings: (e: ChangeEvent<any>) => void;
};

const AnimatePresenceFixedType = AnimatePresence as ElementType;

const AnimationButtons = ({
  theme,
  iconSize = '24',
  currentSettings,
  playAnimation,
  pauseAnimation,
  changeAnimationsSettings,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button id='play-bg' className='w-10 h-10 hover:cursor-pointer' onClick={playAnimation}>
        <Icon src={play} size={iconSize} />
      </Button>
      <Button id='pause-bg' className='w-10 h-10 hover:cursor-pointer' onClick={pauseAnimation}>
        <Icon src={pause} size={iconSize} />
      </Button>
      <Button
        id='settings-bg'
        className='w-10 h-10 hover:cursor-pointer'
        onClick={() => setOpen(true)}
      >
        <Icon src={settings} size={iconSize} />
      </Button>

      <AnimatePresenceFixedType>
        {open && (
          <Modal closeModal={() => setOpen(false)}>
            <div className='h-full flex flex-col justify-between items-center space-y-4'>
              <div className='w-full flex justify-between items-center'>
                <label className='font-semibold'>Auto play</label>
                <Checkbox
                  name='autoPlay'
                  value={currentSettings.config.autoPlay!}
                  onChange={changeAnimationsSettings}
                />
              </div>

              <div className='w-full flex flex-col'>
                <label className='font-semibold'>Max fps</label>
                <Slider
                  name='fps'
                  min={30}
                  max={120}
                  value={currentSettings.config.fpsLimit!}
                  onChange={changeAnimationsSettings}
                />
              </div>

              <div className='w-full flex flex-col'>
                <div className='font-semibold'>Animation</div>
                <Select
                  name='animation'
                  value={currentSettings.animation}
                  items={particlesAnimations(theme)}
                  renderItem={(item) => (
                    <div className='w-1/2 flex justify-start items-center space-x-2'>
                      <div className='w-10 h-10 rounded-2xl' style={{background: item.hex}} />
                      <div>{item.name}</div>
                    </div>
                  )}
                />
              </div>

              <div className='w-full flex flex-col'>
                <div className='font-semibold'>Background color</div>
                <Select
                  name='backgroundColor'
                  value={currentSettings.bgColor.name}
                  items={colors}
                  renderItem={(item) => (
                    <div className='w-1/2 flex justify-start items-center space-x-2'>
                      <div className='w-10 h-10 rounded-2xl' style={{backgroundColor: item.hex}} />
                      <div>{item.name}</div>
                    </div>
                  )}
                  selectValue={changeAnimationsSettings}
                />
              </div>

              <div className='w-full flex flex-col'>
                <div className='font-semibold'>Main color</div>
                <Select
                  name='mainColor'
                  value={currentSettings.mainColor.name}
                  items={colors}
                  renderItem={(item) => (
                    <div className='w-1/2 flex justify-start items-center space-x-2'>
                      <div className='w-10 h-10 rounded-2xl' style={{background: item.hex}} />
                      <div>{item.name}</div>
                    </div>
                  )}
                  selectValue={changeAnimationsSettings}
                />
              </div>

              <div className='w-full flex flex-col'>
                <div className='font-semibold'>Accent color</div>
                <Select
                  name='accentColor'
                  value={currentSettings.accentColor.name}
                  items={colors}
                  renderItem={(item) => <div className='text-red-500'>{item.name}</div>}
                  selectValue={changeAnimationsSettings}
                />
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresenceFixedType>
    </>
  );
};

export default AnimationButtons;
