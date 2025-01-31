import {MoveDirection, OutMode} from '@tsparticles/engine';

import {AnimationsType} from 'src/types/particles.type';
import {Theme} from 'src/types/theme.type';

export const particlesAnimations = (theme: Theme): AnimationsType[] => [
  {
    id: 1,
    name: 'Links',
    config: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {enable: true, mode: 'push'},
          onHover: {enable: true, mode: 'repulse'},
        },
        modes: {
          push: {quantity: 4},
          repulse: {distance: 200, duration: 0.4},
        },
      },
      particles: {
        color: {value: theme === 'dark' ? '#fff' : '#000'},
        links: {
          color: '#9E0030',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {default: OutMode.out},
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {enable: true},
          value: 80,
        },
        opacity: {value: 0.5},
        shape: {type: 'circle'},
        size: {value: {min: 1, max: 5}},
      },
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    },
  },
  {
    id: 2,
    name: 'Triangles',
    config: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {enable: true, mode: 'push'},
          onHover: {enable: true, mode: 'repulse'},
        },
        modes: {
          push: {quantity: 4},
          repulse: {distance: 200, duration: 0.4},
        },
      },
      particles: {
        color: {value: theme === 'dark' ? '#fff' : '#000'},
        links: {
          color: '#9E0030',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {default: OutMode.out},
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {enable: true},
          value: 80,
        },
        opacity: {value: 0.5},
        shape: {type: 'circle'},
        size: {value: {min: 1, max: 5}},
      },
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    },
  },
  {
    id: 3,
    name: 'Snow',
    config: {
      autoPlay: true,
      fpsLimit: 60,
      background: {color: '#000'},
      interactivity: {
        events: {
          onClick: {enable: true, mode: 'push'},
          onHover: {enable: true, mode: 'repulse'},
        },
        modes: {
          push: {quantity: 4},
          repulse: {distance: 200, duration: 0.4},
        },
      },
      particles: {
        color: {value: theme === 'dark' ? '#fff' : '#000'},
        links: {
          color: '#9E0030',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {default: OutMode.out},
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {enable: true},
          value: 80,
        },
        opacity: {value: 0.5},
        shape: {type: 'circle'},
        size: {value: {min: 1, max: 5}},
      },
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    },
  },
  {
    id: 4,
    name: 'Stars',
    config: {
      autoPlay: true,
      fpsLimit: 60,
      background: {color: '#000'},
      particles: {
        number: {
          value: 1000,
          density: {
            enable: true,
            width: 1024,
            height: 1024,
          },
        },
        move: {
          direction: MoveDirection.topRight,
          enable: true,
          speed: 0.2,
          straight: true,
        },
        opacity: {
          animation: {
            enable: true,
            speed: 0.1,
            sync: false,
          },
          value: {min: 0, max: 1},
        },
        size: {
          value: {min: 0.2, max: 1.5},
        },
      },
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    },
  },
];
