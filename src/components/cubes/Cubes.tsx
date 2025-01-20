import './cubes.css';

import {Fragment} from 'react';

import apiLogo from '../../assets/api.png';
import asanaLogo from '../../assets/asana.svg';
import bitbucketLogo from '../../assets/bitbucket.svg';
import firebaseLogo from '../../assets/firebase.svg';
import flutterLogo from '../../assets/flutter.svg';
import gitLogo from '../../assets/git.svg';
import githubLogo from '../../assets/github.svg';
import ionicLogo from '../../assets/ionic.svg';
import reactLogo from '../../assets/react.svg';
import reactNativeLogo from '../../assets/react_native.svg';
import recoilLogo from '../../assets/recoil.svg';
import supabaseLogo from '../../assets/supabase.svg';
import tailwindcssLogo from '../../assets/tailwindcss.svg';

const logos = [
  {id: 1, name: 'React', logo: reactLogo},
  {id: 2, name: 'Flutter', logo: flutterLogo},
  {id: 3, name: 'React Native', logo: reactNativeLogo},
  {id: 4, name: 'Ionic', logo: ionicLogo},
  {id: 5, name: 'TailwindCSS', logo: tailwindcssLogo},
  {id: 6, name: 'Supabase', logo: supabaseLogo},
  {id: 7, name: 'Firebase', logo: firebaseLogo},
  {id: 8, name: 'Recoil', logo: recoilLogo},
  {id: 9, name: 'Git', logo: gitLogo},
  {id: 10, name: 'GitHub', logo: githubLogo},
  {id: 11, name: 'Asana', logo: asanaLogo},
  {id: 12, name: 'Bitbucket', logo: bitbucketLogo},
  {id: 13, name: 'API', logo: apiLogo},
  {id: 14, name: 'API 2', logo: apiLogo},
  {id: 15, name: 'API 3', logo: apiLogo},
  {id: 16, name: 'API 3', logo: apiLogo},
];

const Cubes = () => {
  return (
    <div className='container'>
      <div className='perspective'>
        {Array.from({length: logos.length}).map((_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const leftPosition = col * 100;
          const topPosition = row * 100;
          const animationDelay = 0.2 * row + 's';

          const transformStyle = {
            left: `${leftPosition}px`,
            top: `${topPosition}px`,
            animationDelay: animationDelay,
          };

          const stopAnimation = () => {
            const shadow = document.getElementById(`cube-shadow-${index + 1}`);
            if (shadow) {
              shadow.style.animationPlayState = 'paused';
              shadow.style.transform = 'scale(0.5)';
            }
          };

          const startAnimation = () => {
            const shadow = document.getElementById(`cube-shadow-${index + 1}`);
            if (shadow) {
              shadow.style.animationPlayState = 'running';
              shadow.style.transform = 'scale(1)';
            }
          };

          return (
            <Fragment key={index}>
              <div
                id={`cube-${index + 1}`}
                className='cube'
                style={transformStyle}
                onMouseEnter={stopAnimation}
                onMouseLeave={startAnimation}
              >
                <div className='top'>
                  <img alt={logos[index].name} src={logos[index].logo} className='' />
                </div>
                <div className='left' />
                <div className='front' />
                <div className='right' />
              </div>
              <div className='translate-cube-shadow'>
                <div
                  id={`cube-shadow-${index + 1}`}
                  className='cube-shadow'
                  style={transformStyle}
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Cubes;
