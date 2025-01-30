import 'ionicons/icons';
import './theme/index.css';

import ReactDOM from 'react-dom/client';
import {pdfjs} from 'react-pdf';
import {HashRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    {/* <StrictMode> */}
    <RecoilRoot>
      <App />
    </RecoilRoot>
    {/* </StrictMode> */}
  </HashRouter>
);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();
