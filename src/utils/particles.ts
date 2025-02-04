import {IOptions, MoveDirection, OutMode, RecursivePartial} from '@tsparticles/engine';

import {Theme} from 'src/types/theme.type';

export const animations = (theme: Theme): RecursivePartial<IOptions>[] => [
  {
    key: 'links',
    name: 'Links',
    autoPlay: true,
    // background: {color: {value: theme === 'dark' ? '#000' : '#fff'}},
    fpsLimit: 60,
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
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
  },
  {
    key: 'triangles',
    name: 'Triangles',
    autoPlay: true,
    background: {color: '#333333'},
    fpsLimit: 60,
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
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
  },
  {
    key: 'snow',
    name: 'Snow',
    autoPlay: true,
    background: {color: '#333333'},
    fpsLimit: 60,
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
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
  },
  {
    key: 'stars',
    name: 'Stars',
    autoPlay: true,
    background: {color: '#000'},
    fpsLimit: 60,
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      number: {
        value: 1000,
        density: {
          // of course we want the value to be relative to screen size
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
  },
];
