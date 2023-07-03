import {FC} from 'react';
import {Route, Routes} from 'react-router';
import {HomePage} from '../pages/home.page';
import {NotFoundPage} from '../pages/notFound.page';
import {BrowserRouter} from 'react-router-dom';

const Router: FC = () => (
	<BrowserRouter basename='/portfolio'>
		<Routes>
			<Route path='/portfolio' element={<HomePage />} />

			<Route element={<NotFoundPage />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
