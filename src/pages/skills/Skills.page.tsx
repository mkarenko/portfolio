import {skills} from '../../constants/skills';
import SkillComponent from './Skill.component';

const SkillsPage = () => (
  <>
    {skills.map((s) => (
      <div key={s.id} className='flex flex-col items-center justify-between w-full h-full p-10'>
        <SkillComponent
          key={s.id}
          name={s.name}
          logo={s.logo}
          url={s.website}
          description={s.description}
        />
      </div>
    ))}
  </>
);

export default SkillsPage;
