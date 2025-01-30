import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {Document, Page} from 'react-pdf';
import {useRecoilValue} from 'recoil';

import {languageAtom} from '../../atoms/language.atom';
import {cvEN, cvPL} from '../../utils/constants';

const ExperiencePage = () => {
  const language = useRecoilValue(languageAtom);

  return (
    <div className='pt-20 flex items-center justify-center w-full h-full'>
      <a href='/portfolio/assets/cv_en.pdf' target='_blank' rel='noopener noreferrer'>
        Open CV
      </a>
      <Document file={language === 'en' ? cvEN : cvPL}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default ExperiencePage;
