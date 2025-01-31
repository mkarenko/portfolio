import Cursor from 'src/components/Cursor';
import {skills} from '../../constants/skills';
import SkillComponent from './Skill.component';

const SkillsPage = () => (
  <div className='pt-12 md:pt-10'>
    <Cursor />
    {skills.map((s) => (
      <div
        key={s.id}
        className='flex flex-col items-center justify-between w-full h-full py-8 md:py-16 px-5 md:p-10'
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
