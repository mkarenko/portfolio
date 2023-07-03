import {FC} from 'react';
import logout from '../assets/logout.svg';

export const Header: FC = () => {
	return (
		<div className='w-full h-44 flex justify-end space-x-7 pt-5 pr-5'>
			<button className='h-10 flex items-center text-white rounded-3xl p-2'>Home</button>
			<button className='h-10 flex items-center text-white rounded-3xl p-2'>About Me</button>
			<button className='h-10 flex items-center text-white rounded-3xl p-2'>My Projects</button>
			<button className='h-10 flex items-center text-white rounded-3xl p-2'>Contact</button>
			<button className='h-10 flex items-center text-white rounded-3xl p-2'>
				Log Out
				<img alt='logout' src={logout} color='#FFFFFF' className='h-10 ml-2' />
			</button>
		</div>
	);
};
