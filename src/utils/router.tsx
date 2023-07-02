import {FC} from 'react';
import {Route, Routes} from 'react-router';
import {HomePage} from '../pages/home.page';
import {NotFoundPage} from '../pages/notFound.page';

const Router: FC = () => (
	<Routes>
		<Route path='/' element={<HomePage />} />

		<Route element={<NotFoundPage />} />
	</Routes>
);

export default Router;
