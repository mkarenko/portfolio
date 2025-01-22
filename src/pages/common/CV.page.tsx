import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {Document, Page} from 'react-pdf';
import {useRecoilValue} from 'recoil';

import {languageAtom} from '../../atoms/language.atom';
import {cvEN, cvPL} from '../../utils/constants';

const CVPage = () => {
  const language = useRecoilValue(languageAtom);

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Document file={language === 'en' ? cvEN : cvPL}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default CVPage;
