import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {Document, Page} from 'react-pdf';

const ExperiencePage = () => {
  const devUrl = 'http://localhost:3000/portfolio/assets/mkarenko_cv_en.pdf';
  const prodUrl = 'https://mkarenko.com/portfolio/assets/mkarenko_cv_en.pdf';
  const pdfUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

  return (
    <Document
      file={pdfUrl}
      className='w-full h-full z-0 flex justify-center items-center pt-24 opacity-75'
    >
      <Page pageNumber={1} height={window.innerHeight} />
    </Document>
  );
};

export default ExperiencePage;
