import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../../theme/experience.css';

import {isDesktop, isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router';

import Button from 'src/components/buttons/Button';
import Icon from 'src/components/Icon';

import downloadIcon from '../../assets/icons/download.svg';

const ExperiencePage = () => {
  const navigate = useNavigate();
  const devUrl = 'http://localhost:3000/assets/cv/mkarenko_cv_en.pdf';
  const prodUrl = 'https://mkarenko.com/assets/cv/mkarenko_cv_en.pdf';
  const pdfUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

  return (
    <div className='mx-auto max-w-3xl p-6 py-14 md:py-24'>
      {/* Seperator */}
      <div className='border-foreground pb-4 border-b' />

      <section className='mt-6'>
        <h3 className='text-4xl font-semibold'>About Me</h3>
        <p className='mt-2'>
          I have over three years of commercial experience as a front-end developer. During this
          time I have refined my skills working with React, utilizing technologies such as Ionic,
          CSS, and REST API. I pay great attention to detail to ensure that the final product meets
          the client's expectations and is of the highest quality.
        </p>
      </section>

      {/* Seperator */}
      <div className='border-foreground pb-4 border-b' />

      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-col'>
          <section className='mt-6'>
            <h3
              className='text-3xl font-semibold text-gray-500 cursor-pointer hover:text-primary'
              onClick={() => navigate('/skills')}
            >
              Technologies
            </h3>
            <ul className='mt-2 ml-4 list-disc text-gray-200'>
              <li>React.js</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>HTML, CSS, Tailwind</li>
              <li>Flutter</li>
              <li>Dart</li>
              <li>REST API</li>
              <li>Recoil</li>
              <li>Redux</li>
              <li>Ionic</li>
              <li>Git</li>
              <li>GitHub, Bitbucket</li>
              <li>Firebase, Supabase</li>
              <li>Linux, Windows</li>
            </ul>
          </section>

          <section className='mt-6'>
            <h3 className='text-3xl font-semibold text-gray-500'>Languages</h3>
            <ul className='gap-4 mt-2 text-gray-200'>
              <li className='flex space-x-4'>
                <div>Polish (Native)</div>
                {/* <Button>
                  <Icon src={volumeIcon} />
                </Button> */}
              </li>
              <li className='flex space-x-4'>
                <div>English (C1)</div>
                {/* <Button>
                  <Icon src={volumeIcon} />
                </Button> */}
              </li>
            </ul>
          </section>

          <section className='mt-6'>
            <h3 className='text-3xl font-semibold text-gray-500 cursor-pointer hover:text-primary'>
              <a href={'https://www.wfis.uni.lodz.pl/'} target='_blank' rel='noreferrer'>
                Education
              </a>
            </h3>
            <p className='mt-2'>
              University of Łódź, Faculty of Physics and Applied Informatics (2014 - 2017)
            </p>
          </section>
        </div>

        <div className='flex flex-col'>
          <section className='mt-6'>
            <h3 className='text-3xl font-semibold text-gray-500'>Experience</h3>
            <ul className='pl-5 mt-4 space-y-6 list-disc text-gray-200'>
              <li>
                <h4 className='text-xl font-medium cursor-pointer hover:text-primary hover:scale-100'>
                  <a href={'https://billogstudio.com/'} target='_blank' rel='noreferrer'>
                    Billog Studio (2021 - present)
                  </a>
                </h4>
                <p className='italic'>Junior Front-end Developer</p>
                <ul className='pl-5 mt-2 list-disc'>
                  <li>Developing and improving products and services.</li>
                  <li>Designing, implementing, and testing software.</li>
                  <li>Managing projects from a technical perspective.</li>
                </ul>
              </li>
              <li>
                <h4 className='text-xl font-medium cursor-pointer hover:text-primary hover:scale-100'>
                  <a href={'https://rekeep.pl/en/home-en/'} target='_blank' rel='noreferrer'>
                    Rekeep Poland (2020 - 2021)
                  </a>
                </h4>
                <p className='italic'>Junior IT Specialist</p>
                <ul className='pl-5 mt-2 list-disc'>
                  <li>Monitoring computer networks and troubleshooting issues.</li>
                  <li>Providing technical support and system updates.</li>
                </ul>
              </li>
              <li>
                <h4 className='text-xl font-medium cursor-pointer hover:text-primary hover:scale-100'>
                  <a href={'https://gg24.se/'} target='_blank' rel='noreferrer'>
                    GG24 AB (2019 - 2020)
                  </a>
                </h4>
                <p className='italic'>IT Technician</p>
                <ul className='pl-5 mt-2 list-disc'>
                  <li>Managed computer networks and resolved software issues.</li>
                  <li>Provided user support and conducted training.</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Seperator */}
      <div className='border-foreground pb-4 border-b' />

      {isMobile && (
        <Button className='absolute top-5 left-5 z-10'>
          <a href={pdfUrl} target='_blank' rel='noreferrer'>
            <Icon src={downloadIcon} size='32px' />
          </a>
        </Button>
      )}
      {isDesktop && (
        <Button className='fixed bottom-5 left-20 z-10'>
          <a href={pdfUrl} target='_blank' rel='noreferrer'>
            <Icon src={downloadIcon} size='32px' />
          </a>
        </Button>
      )}
    </div>
  );
};

export default ExperiencePage;
