import {Theme} from 'src/types/theme.type';

export const baseUrl = process.env.PUBLIC_URL;

export const githubURL: string = 'https://github.com/mkarenko/';
export const linkedinURL: string = 'https://www.linkedin.com/in/m-karenko/';
export const discordURL: string = 'https://discord.com/users/adalbertson';

export const cvPL: string = 'https://mkarenko.github.io/portfolio/assets/cv_pl.pdf';
export const cvEN: string = 'https://mkarenko.github.io/portfolio/assets/cv_en.pdf';

export const cardClass: string =
  'flex-col w-full p-5 space-y-4 lg:w-1/2 rounded-xl bg-card border-2 border-border';

export const transparentClass = (theme: Theme): string =>
  ` border-2 bg-gradient-to-r backdrop-blur-sm shadow-md ${
    theme === 'dark'
      ? 'from-black/50 via-black/40 to-black/50 border-white/10 shadow-gray-800'
      : 'from-white/70 via-white/50 to-white/70 border-black/10'
  }`;

export const navigationTabs = [
  {name: 'Home', path: '/'},
  {name: 'Skills', path: '/skills'},
  {name: 'Projects', path: '/projects'},
  // {name: 'Experience', path: '/experience'},
  {name: 'Contact', path: '/contact'},
];
