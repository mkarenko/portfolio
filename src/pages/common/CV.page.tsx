import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {FC} from 'react';
import {Document, Page} from 'react-pdf';
import {useRecoilValue} from 'recoil';

import cvEN from '../../assets/cv_en.pdf';
import cvPL from '../../assets/cv_pl.pdf';
import {languageAtom} from '../../atoms/language.atom';

const CVPage: FC = () => {
  const language = useRecoilValue(languageAtom);

  return (
    <div className='flex items-center justify-center w-full h-full'>
      {language === 'en' ? (
        <Document file={cvEN} className='w-1/2'>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <Document file={cvPL} className='w-1/2'>
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  );
};

export default CVPage;
