import {FC} from 'react';

import {linkedinUrl} from '../../utils/constants';
import {logoLinkedin} from 'ionicons/icons';
import './logoButton.css';

const LinkedinButton: FC = () => (
  <button
    type='button'
    className='w-10 bg-blue-500 hover:bg-blue-800 rounded transition duration-300 transform
      hover:scale-110'
    onClick={() => (window.location.href = linkedinUrl)}
  >
    <img alt='linkedin_logo' src={logoLinkedin} />
  </button>
);

export default LinkedinButton;
