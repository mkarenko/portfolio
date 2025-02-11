import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {isMobile} from 'react-device-detect';
import {Document, Page} from 'react-pdf';
import {useRecoilValue} from 'recoil';

import {themeAtom} from 'src/atoms/theme.atom';
import Button from 'src/components/buttons/Button';
import Icon from 'src/components/Icon';

import downloadIcon from '../../assets/icons/download.svg';

const ExperiencePage = () => {
  const theme = useRecoilValue(themeAtom);

  const devUrl = `http://localhost:3000/assets/cv/${theme}_cv_en.jpg`;
  const prodUrl = `https://mkarenko.com/assets/cv/${theme}_cv_en.jpg`;
  const jpgUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

  const devUrl2 = 'http://localhost:3000/assets/cv/mkarenko_cv_en.pdf';
  const prodUrl2 = 'https://mkarenko.com/assets/cv/mkarenko_cv_en.pdf';
  const pdfUrl = process.env.NODE_ENV === 'production' ? prodUrl2 : devUrl2;

  console.log(jpgUrl);

  return (
    <div className='w-screen h-screen flex justify-center items-center pt-20 opacity-75 md:w-full md:h-full'>
      <img alt='CV' src={jpgUrl} className='w-full h-full object-contain' />

      {isMobile && (
        <Button className='absolute top-5 left-5'>
          <a href={pdfUrl} target='_blank' rel='noreferrer'>
            <Icon src={downloadIcon} />
          </a>
        </Button>
      )}

      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default ExperiencePage;
