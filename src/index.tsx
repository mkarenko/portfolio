import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';

import App from './App';
import 'ionicons/icons';
import './theme/tailwindcss.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter basename='/portfolio'>
    {/* <BrowserRouter basename='/portfolio'> */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {/* </BrowserRouter> */}
  </HashRouter>
);

reportWebVitals();
