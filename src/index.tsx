import './theme/index.css';

import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </StrictMode>
  </HashRouter>
);
