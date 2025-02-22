import {Project} from '../types/project.type';

import persoklickLogo from '../assets/logo/persoklick.svg';

export const projects: Project[] = [
  {
    id: 1,
    name: 'Hear Me',
    description:
      'The Hear Me app is designed for music artists and labels, providing a platform to connect, collaborate, and promote music. It offers tools for managing music releases, finding new talent, and enhancing networking opportunities within the music industry. The app aims to simplify the process of music promotion and discovery, making it easier for users to connect with the right people and resources to elevate their musical projects.',
    language: 'TypeScript',
    framework: 'React.js',
    technologies: [1, 4, 5, 7, 8, 13],
    icon: 'https://play-lh.googleusercontent.com/oXmZcNCqCZljbV3ulZxAvFU3OfurUoPKp30QseigTbxosnr8yjUHRiT0BdCXst3-zV14',
    logo: 'https://hearme-app.com/static/media/logoHD.0bfe9b28469651c5cba6.png',
    website: 'https://hearme-app.com/',
    android: 'https://play.google.com/store/apps/details?id=at.klaudijarexhepi.hearme',
    ios: 'https://apps.apple.com/at/app/hear-me-app/id6443555790',
    themeColor: '#151828',
  },
  {
    id: 2,
    name: 'WUB',
    description:
      'WUB is a digital platform designed to facilitate the management of services and operations. It offers a user-friendly interface where businesses can streamline their workflows, collaborate efficiently, and enhance overall productivity. With tools tailored for various industries, Wubmal focuses on improving operational efficiency and service delivery through digital solutions.',
    language: 'TypeScript',
    framework: 'React.js',
    technologies: [1, 4, 5, 7, 8, 13],
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c9/ca/8d/c9ca8da1-4132-3ef2-30cb-141f53c82c34/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/460x0w.webp',
    logo: 'https://app.wubmal.com/static/media/logo.7311a9246aa0a316af5f.png',
    website: 'https://app.wubmal.com/home',
    android: 'https://play.google.com/store/apps/details?id=com.swenmedrow.wub',
    ios: 'https://apps.apple.com/at/app/wub/id1628335886',
    themeColor: '#ffffff',
  },
  {
    id: 3,
    name: 'Celsion Plus',
    description:
      'The Celsion Plus app is designed to streamline project requests and facilitate communication with Celsion’s sales experts. It offers users the ability to send project-related inquiries flexibly, ensuring they receive tailored support. The app aims to enhance user experience by making it easier to manage project requirements and connect with the company for assistance.',
    language: 'Dart',
    framework: 'Flutter',
    technologies: [2],
    icon: 'https://play-lh.googleusercontent.com/7EEFK0SfjkqmK0q-JR6ZCTWcTdWMXFVB6Jaa4PkrCeKxWx8YGOldivoRC8PczqYIHM0=w480-h960-rw',
    logo: 'https://celsion.de/en/wp-content/uploads/2021/03/Logo_Celsion-1.png',
    website: 'https://celsion.de/en/celsion-plus-unsere-neue-app-fuer-ihr-individuelles-projekt/',
    android: 'https://play.google.com/store/apps/details?id=de.celsion.celsion_plus',
    ios: 'https://apps.apple.com/at/app/celsion-plus/id6478959901',
    themeColor: '#2154a6',
  },
  {
    id: 4,
    name: 'More Moda',
    description:
      'Moremoda is a fashion-focused platform that connects users with a diverse range of clothing and accessories. Their website showcases a variety of styles for different occasions, allowing users to browse collections easily. The app enhances the shopping experience by offering personalized recommendations, seamless navigation, and special promotions.',
    language: 'TypeScript',
    framework: 'React.js',
    technologies: [1, 4, 5, 6, 8],
    icon: 'https://play-lh.googleusercontent.com/_tO2w6iudACXs3QEaAp32PMkCoiYNZTe1FeDNTB8FP7RV9UZMECOEfgIoBJesAy96pI',
    logo: 'https://moremoda.at/wp-content/uploads/2023/03/a2.png',
    website: 'https://app.moremoda.at/',
    android: 'https://play.google.com/store/apps/details?id=at.saschasteiner.moremoda',
    ios: 'https://apps.apple.com/at/app/more-moda/id6450482534',
    themeColor: '#84b89e',
  },
  {
    id: 5,
    name: 'Persoklick',
    description:
      'PersoKlick is an innovative app designed to seamlessly connect caregivers with those in need of care services. Users can easily create specific requests for care staff, while providers can quickly respond with their availability and qualifications. The app enhances communication, making it simple to match care facilities with the most suitable personnel. With a focus on data security, PersoKlick is accessible on both mobile devices and web browsers, ensuring a convenient experience for all users.',
    language: 'TypeScript',
    framework: 'React.js',
    technologies: [1, 4, 5, 6, 7, 8],
    icon: 'https://persoklick-test-env.web.app/assets/icon/apple-touch-icon.png',
    logo: persoklickLogo,
    website: 'https://persoklick-test-env.web.app/',
    themeColor: '#4673ce',
  },
  {
    id: 6,
    name: 'ImmoCeption',
    description:
      'Immoception is a real estate platform dedicated to enhancing property management and sales processes. The site offers a variety of services including property listings, market analysis, and valuation tools. It aims to connect buyers and sellers with comprehensive resources, making real estate transactions smoother and more transparent.',
    language: 'C#',
    framework: 'Xamarin',
    technologies: [7, 9, 10, 11, 12, 13, 14, 15],
    icon: 'https://immoception.net/wp-content/uploads/2022/10/favicon-immoception.png',
    logo: 'https://immoception.net/wp-content/uploads/2022/08/immocatpion-logo-768x557.png',
    website: 'https://immoception.net/',
    android: 'https://play.google.com/store/apps/details?id=net.immoception.app',
    ios: 'https://apps.apple.com/at/app/immoception/id1531186111',
    themeColor: '#ffffff',
  },
  {
    id: 7,
    name: 'Immowert4You',
    description:
      'Immowert4you offers a unique service for property valuation in Vienna. Users can receive free, expert property assessments quickly and easily. Unlike automated algorithms, each valuation is performed by local real estate professionals, ensuring personalized and accurate results. The platform is designed to be user-friendly, allowing homeowners to get a reliable estimate of their property’s value within minutes.',
    language: 'C#',
    framework: 'Xamarin',
    technologies: [7, 9, 10, 11, 12, 13, 14, 15],
    icon: 'https://immowert4you.com/wp-content/uploads/2022/04/cropped-20539-Immowert4You-logo-design-_17-1-270x270.png',
    logo: 'https://immowert4you.com/wp-content/uploads/2022/04/20539-Immowert4You-logo-design-_17-768x549.png',
    website: 'https://immowert4you.com/',
    android: 'https://play.google.com/store/apps/details?id=com.billogstudio.immowert4you',
    ios: 'https://apps.apple.com/at/app/immowert4you/id1600685778',
    themeColor: '#ffffff',
  },
  {
    id: 8,
    name: 'Kluu',
    description:
      'Kluu serves as a comprehensive digital network connecting individuals and businesses. The platform is aimed at fostering communication and collaboration through a robust messaging system, event management tools, and community engagement features. Kluu Connect prioritizes user interaction, making it easier for people to network, share ideas, and create valuable connections within their communities.',
    language: 'C#',
    framework: 'Xamarin',
    technologies: [7, 9, 10, 11, 12, 13, 14, 15],
    website: 'https://kluu-connect.com/',
    icon: 'https://kluu-connect.com/wp-content/uploads/2021/09/cropped-KLuu-Logo-270x270.png',
    logo: 'https://kluu-connect.com/wp-content/uploads/2022/12/KLuU-Schriftzug-weis_ohneHG.png-768x307.png',
    android: '',
    ios: '',
    themeColor: '#07ae53',
  },
  {
    id: 9,
    name: 'Portoflio',
    description:
      'Portolio page created using React.js, to show my skills and past project to encourage future employers',
    language: 'TypeScript',
    framework: 'React.js',
    technologies: [1, 5, 8, 9, 10],
    website: 'https://mkarenko.com/',
    icon: 'https://mkarenko.com/assets/icon/icon-192-maskable.png',
    logo: 'https://mkarenko.com/assets/icon/icon-192-maskable.png',
    android: '',
    ios: '',
    themeColor: '#ffffff',
  },
];
