import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <header className='bg-gray-800 md:sticky top-0 z-10'>
      <div className='flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <div
          className='title-font font-semibold text-2xl text-white md:mb-0 hover:cursor-pointer'
          onClick={() => navigate('/about')}
        >
          mike.
        </div>
        <nav
          className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700
		      flex flex-wrap items-center text-base justify-center'
        >
          <div
            className='py-1 px-3 text-gray-400 focus:outline-none hover:bg-gray-700 hover:text-white rounded cursor-pointer'
            onClick={() => navigate('/past-work')}
          >
            Past Work
          </div>
          <div
            className='py-1 px-3 text-gray-400 focus:outline-none hover:bg-gray-700 hover:text-white rounded cursor-pointer'
            onClick={() => navigate('/skills')}
          >
            Skills
          </div>
          <div
            className='py-1 px-3 text-gray-400 focus:outline-none hover:bg-gray-700 hover:text-white rounded cursor-pointer'
            onClick={() => navigate('/references')}
          >
            Testimonials
          </div>
          <div
            className='py-1 px-3 text-gray-400 focus:outline-none hover:bg-gray-700 hover:text-white rounded cursor-pointer'
            onClick={() => navigate('/hire-me')}
          >
            Hire Me
          </div>
        </nav>
      </div>
    </header>
  );
};
