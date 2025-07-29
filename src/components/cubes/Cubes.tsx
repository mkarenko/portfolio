import './cubes.css';

import {Fragment} from 'react';

import {projects} from '../../constants/projects';
import {getSkillDetails} from '../../pages/projects/Project.component';

const Cubes = () => (
  <div className='container'>
    <div className='perspective'>
      {Array.from(projects).map((_, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const leftPosition = col * 100;
        const topPosition = row * 100;
        const animationDelay = 0.2 * row + 's';

        const transformStyle = {
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
          animationDelay: animationDelay,
        };

        const handleBoxNavigation = () => {};

        const handleStartHover = () => {
          const cube = document.getElementById(`cube-${index + 1}`);
          const shadow = document.getElementById(`cube-shadow-${index + 1}`);

          if (shadow) {
            shadow.style.animationPlayState = 'paused';
            shadow.style.transform = 'scale(0.5)';
          }

          if (cube) {
            const techs = getSkillDetails(_.technologies);
            const sides = ['top', 'front', 'left', 'right', 'bottom'];

            for (let sideIndex = 0; sideIndex < sides.length; sideIndex++) {
              const side = sides[sideIndex];
              const sideElement = cube.querySelector(`.${side}`);
              if (sideElement && techs[sideIndex]) {
                let img = sideElement.querySelector('img');
                if (!img) {
                  img = document.createElement('img');
                  sideElement.appendChild(img);
                }
                if (img) {
                  img.alt = techs[sideIndex].name;
                  img.src = techs[sideIndex].logo;
                  img.style.transform = 'rotate(180deg)';
                  img.style.width = '100%';
                  img.style.height = '100%';
                  img.style.objectFit = 'contain';
                  img.style.objectPosition = 'center';
                }
              }
            }
          }
        };

        const handelStopHover = () => {
          const cube = document.getElementById(`cube-${index + 1}`);
          const shadow = document.getElementById(`cube-shadow-${index + 1}`);

          if (shadow) {
            shadow.style.animationPlayState = 'running';
            shadow.style.transform = 'scale(1)';
          }

          if (cube) {
            const techs = getSkillDetails(_.technologies);
            const sides = ['top', 'front', 'left', 'right', 'bottom'];

            for (let sideIndex = 0; sideIndex < sides.length; sideIndex++) {
              const side = sides[sideIndex];
              const sideElement = cube.querySelector(`.${side}`);

              if (sideElement && techs[sideIndex]) {
                let img = sideElement.querySelector('img');

                if (side !== 'top' && img) {
                  sideElement.removeChild(img);
                  img = null;
                }
              }
            }
          }
        };

        return (
          <Fragment key={index}>
            <div
              id={`cube-${index + 1}`}
              className='cube'
              style={transformStyle}
              onMouseEnter={handleStartHover}
              onMouseLeave={handelStopHover}
              onClick={handleBoxNavigation}
            >
              <div className='top' style={{background: _.themeColor}}>
                <img alt={_.name} src={_.icon} className='object-cover w-full h-full' />
              </div>
              <div className='left' style={{background: _.themeColor}} />
              <div className='front' style={{background: _.themeColor}} />
              <div className='right' style={{background: _.themeColor}} />
              <div className='bottom' style={{background: _.themeColor}} />
            </div>
            <div className='translate-cube-shadow'>
              <div id={`cube-shadow-${index + 1}`} className='cube-shadow' style={transformStyle} />
            </div>
          </Fragment>
        );
      })}
    </div>
  </div>
);

export default Cubes;
