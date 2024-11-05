import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom';

import App from './App';
import 'ionicons/icons';
import './theme/tailwindcss.css';
import {RecoilRoot} from 'recoil';

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

reportWebVitals();
