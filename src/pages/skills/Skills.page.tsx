import Cursor from 'src/components/Cursor';
import {skills} from '../../constants/skills';
import SkillComponent from './Skill.component';

const SkillsPage = () => (
  <div className='pt-10'>
    <Cursor />
    {skills.map((s) => (
      <div
        key={s.id}
        className='w-full h-full flex flex-col justify-between items-center px-5 py-8 md:p-10 md:py-16'
      >
        <SkillComponent
          key={s.id}
          name={s.name}
          logo={s.logo}
          url={s.website}
          description={s.description}
        />
      </div>
    ))}
  </div>
);

export default SkillsPage;
