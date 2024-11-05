import {FC} from 'react';

import SkillComponent from './Skill.component';
import {skills} from '../../constants/skills';

const SkillsPage: FC = () => (
  <div className='w-full max-h-screen my-10 flex justify-center'>
    <div className='w-1/2 grid grid-cols-1 xs:grid-cols-1 items-start gap-5 gap-y-10'>
      {skills.map((skill) => (
        <SkillComponent
          key={skill.id}
          name={skill.name}
          logo={skill.logo}
          url={skill.website}
          description={skill.description}
        />
      ))}
    </div>
  </div>
);

export default SkillsPage;
