/* eslint-disable react-hooks/exhaustive-deps */
import {ChangeEvent, useEffect, useState} from 'react';

import {ISourceOptions} from '@tsparticles/engine';

import {Theme} from 'src/types/theme.type';
import {colors} from 'src/utils/colors';
import {animations} from 'src/utils/particles';
import Button from '../buttons/Button';
import {ColoredBox} from '../ColoredBox';
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
  const [linkColor, setLinkColor] = useState<{name: string; hex: string}>();
  const [particleColor, setParticleColor] = useState<{name: string; hex: string}>();

  useEffect(() => {
    if (!currentAnimation) return;

    const linksColor = (currentAnimation.particles?.links as any)?.color;
    const particlesColor = currentAnimation.particles?.color?.value?.toString();

    if (linksColor === '#9E0030') setLinkColor({name: 'Default', hex: '#9E0030'});
    if (particlesColor === '#000') setParticleColor({name: 'Black', hex: '#000'});
    else setParticleColor({name: 'White', hex: '#fff'});
  }, []);

  const handleSettingsChange = (e: ChangeEvent<any>) => {
    if (!e.target) return;

    const {name, value} = e.target;

    if (name === 'linksColor') setLinkColor({name: value.name, hex: value.hex});
    if (name === 'particlesColor') setParticleColor({name: value.name, hex: value.hex});

    changeAnimationsSettings(e);
  };

  return (
    <>
      <Button id='toggle-animation' onClick={toggleAnimation}>
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
              keyName='name'
              defaultValue={currentAnimation.name}
              items={animations(theme)}
              renderItem={(item: any) => <div>{item.name}</div>}
              onSelect={changeAnimationsSettings}
            />
          </div>
          {currentAnimation.key === 'links' && (
            <>
              <div className='w-full flex flex-col'>
                <div className='font-semibold'>Links color</div>
                <Select
                  keyName='linksColor'
                  items={colors}
                  defaultValue={
                    <div className='flex justify-evenly items-center space-x-3 font-bold'>
                      <div>{particleColor?.hex && <ColoredBox color={particleColor?.hex} />}</div>
                      <div>{particleColor?.name}</div>
                    </div>
                  }
                  renderItem={(item: any) => (
                    <div className='flex justify-evenly items-center space-x-3 font-bold'>
                      <div>{item.hex && <ColoredBox color={item.hex} />}</div>
                      <div>{item.name}</div>
                    </div>
                  )}
                  renderSelected={(selected: any) => (
                    <div className='flex justify-evenly items-center space-x-3 font-bold'>
                      <div>{selected.hex && <ColoredBox color={selected.hex} />}</div>
                      <div>{selected.name}</div>
                    </div>
                  )}
                  onSelect={handleSettingsChange}
                />
              </div>
              <div className='w-full flex flex-col'>
                <div className='font-semibold'>Particles color</div>
                <Select
                  keyName='particlesColor'
                  items={colors}
                  defaultValue={
                    <div className='flex justify-evenly items-center space-x-3 font-bold'>
                      <div>{linkColor?.hex && <ColoredBox color={linkColor?.hex} />}</div>
                      <div>{linkColor?.name}</div>
                    </div>
                  }
                  renderSelected={(selected: any) => (
                    <div className='flex justify-evenly items-center space-x-3 font-bold'>
                      <div>{selected.hex && <ColoredBox color={selected.hex} />}</div>
                      <div>{selected.name}</div>
                    </div>
                  )}
                  renderItem={(item: any) => (
                    <div className='mx-auto inline-flex space-x-3 font-bold text-center'>
                      <div>{item.hex && <ColoredBox color={item.hex} />}</div>
                      <div>{item.name}</div>
                    </div>
                  )}
                  onSelect={handleSettingsChange}
                />
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default AnimationButtons;
