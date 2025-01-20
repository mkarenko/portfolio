import 'ionicons/icons';
import './theme/tailwindcss.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {pdfjs} from 'react-pdf';
import {HashRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter basename='/'>
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  </HashRouter>
);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

reportWebVitals();
