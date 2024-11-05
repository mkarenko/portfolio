import {Skill} from '../types/skill.type';

import reactLogo from '../assets/react.svg';
import flutterLogo from '../assets/flutter.svg';
import reactNativeLogo from '../assets/react_native.svg';
import ionicLogo from '../assets/ionic.svg';
import tailwindcssLogo from '../assets/tailwindcss.svg';
import supabaseLogo from '../assets/supabase.svg';
import firebaseLogo from '../assets/firebase.svg';
import recoilLogo from '../assets/recoil.svg';
import gitLogo from '../assets/git.svg';
import githubLogo from '../assets/github.svg';
import asanaLogo from '../assets/asana.svg';
import bitbucketLogo from '../assets/bitbucket.svg';
import apiLogo from '../assets/api.png';

export const skills: Skill[] = [
  {
    id: 1,
    name: 'React',
    logo: reactLogo,
    website: 'https://react.dev/',
    language: 'JavaScript/TypeScript',
    description:
      'Most frequently, I work in React using TypeScript, with less frequent use of JavaScript. ' +
      "In total, I've been involved in over thirty projects in this framework, with a few of them " +
      'in a lead role. I feel confident and comfortable in React. I have used technologies such as ' +
      'RESTful API, Supabase, and Firebase. For state management, I most often employ Recoil. ' +
      'Regarding styling, I use Tailwind CSS, which I find easy and enjoyable to use in my projects.',
  },

  {
    id: 2,
    name: 'Flutter',
    logo: flutterLogo,
    language: 'Dart',
    website: 'https://flutter.dev/',
    description:
      'I embarked on learning Dart and Flutter a year ago when a client approached us with an idea ' +
      'for an application, expressing a preference for it to be developed in Flutter. Right from ' +
      'the beginning, I found working with this framework immensely enjoyable. Flutter quickly ' +
      'became a technology I want to shape my future with. Additionally, for the application, I ' +
      'had to create a fork of a library that, unfortunately, is no longer supported by its creators.',
  },
  {
    id: 3,
    name: 'React Native',
    logo: reactNativeLogo,
    language: 'JavaScript',
    website: 'https://reactnative.dev/',
    description:
      'I ventured into React Native by taking on two applications, but regrettably, both projects ' +
      'were closed due to business reasons. Despite the challenges, this experience significantly ' +
      'contributed to my understanding of React Native and honed my skills in working with the framework. ' +
      "I'm determined to continue expanding my expertise in React Native and look forward to further " +
      'opportunities for growth in this domain.',
  },
  {
    id: 4,
    name: 'Ionic',
    logo: ionicLogo,
    website: 'https://ionic.io/',
    description:
      "Ionic, in my view, serves as a robust companion to React, especially considering React's " +
      'relatively limited set of components compared to the extensive collection provided by Ionic.' +
      'The implementation in projects is straightforward, and once integrated, it grants access to' +
      'a wealth of additional content. This synergy between React and Ionic not only simplifies' +
      'development but also enhances the range of available features.',
  },
  {
    id: 5,
    name: 'Tailwind CSS',
    logo: tailwindcssLogo,
    website: 'https://tailwindcss.com/',
    description:
      'Tailwind CSS, in short, is like a translator for CSS. While CSS is essential knowledge when ' +
      'building React applications, Tailwind CSS simplifies the process by providing a set of ' +
      'utility classes, acting as a convenient shorthand for styling, making the development of ' +
      'user interfaces more streamlined.',
  },
  {
    id: 6,
    name: 'Supabase',
    logo: supabaseLogo,
    website: 'https://supabase.com/',
    description:
      "Supabase is a powerful backend-as-a-service platform that I've utilized in my projects. It " +
      'provides scalable and flexible solutions for database management, authentication, and' +
      'real-time features, contributing to streamlined development and enhanced functionality.',
  },
  {
    id: 7,
    name: 'Firebase',
    logo: firebaseLogo,
    website: 'https://firebase.google.com/',
    description:
      'Firebase has been an integral part of my projects, offering a comprehensive suite of tools ' +
      "for backend services. I've leveraged its capabilities in areas such as real-time database, " +
      'authentication, and cloud functions, contributing to efficient and feature-rich applications.',
  },
  {
    id: 8,
    name: 'Recoil',
    logo: recoilLogo,
    website: 'https://recoiljs.org/',
    description:
      'Recoil serves as my preferred state management library in React applications. Its simplicity ' +
      'and flexibility make it an excellent choice for maintaining and managing state, enhancing the ' +
      'overall architecture and performance of the projects I work on.',
  },
  {
    id: 9,
    name: 'Git',
    logo: gitLogo,
    website: 'https://git-scm.com/',
    description:
      'Git is an essential version control tool in my development workflow. It facilitates ' +
      'collaboration, code versioning, and branching strategies, ensuring a structured and ' +
      'organized approach to managing code changes within projects.',
  },
  {
    id: 10,
    name: 'GitHub',
    logo: githubLogo,
    website: 'https://github.com/',
    description:
      'GitHub is my go-to platform for version control and collaboration. I use it extensively for ' +
      'hosting repositories, managing projects, and contributing to open-source initiatives. ' +
      "GitHub's features enhance the collaborative and transparent nature of software development.",
  },
  {
    id: 11,
    name: 'Asana',
    logo: asanaLogo,
    website: 'https://asana.com/',
    description:
      "Asana is a valuable project management tool that I've successfully integrated into my " +
      'workflow. It enhances team collaboration, task tracking, and project organization, ' +
      'contributing to efficient and streamlined project development.',
  },
  {
    id: 12,
    name: 'Bitbucket',
    logo: bitbucketLogo,
    website: 'https://bitbucket.org/',
    description:
      "Bitbucket is another version control platform that I've utilized in projects. With features " +
      'like code repositories, continuous integration, and collaboration tools, Bitbucket ' +
      'complements my version control strategy, providing a versatile solution for project development.',
  },
  {
    id: 13,
    name: 'Rest API',
    logo: apiLogo,
    website: 'https://www.ibm.com/topics/rest-apis/',
    description:
      'A REST API (Representational State Transfer Application Programming Interface) allows ' +
      'applications to communicate over the internet by treating data as resources identified by ' +
      'URLs. It uses standard HTTP methods like GET, POST, PUT, and DELETE to interact with these ' +
      'resources. REST APIs are stateless and typically exchange data in JSON format, making them ' +
      'widely used in web and mobile applications.',
  },
];
