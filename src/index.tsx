import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';
import App from './App';
import 'ionicons/icons';
import './tailwindcss.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<BrowserRouter
		// basename={process.env.PUBLIC_URL}
		>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();
