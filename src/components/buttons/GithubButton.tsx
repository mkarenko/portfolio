import {FC} from 'react';

import {githubUrl} from '../../utils/constants';
import {logoGithub} from 'ionicons/icons';
import './logoButton.css';

export const GitHubButton: FC = () => (
  <button
    type='button'
    className='w-10 bg-blue-500 hover:bg-blue-800 rounded transition duration-300 transform
      hover:scale-110'
    onClick={() => (window.location.href = githubUrl)}
  >
    <img alt='github_logo' src={logoGithub} />
  </button>
);

export default GitHubButton;
