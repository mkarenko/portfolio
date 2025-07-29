import {skills} from '../../constants/skills';
import SkillComponent from './Skill.component';

const SkillsPage = () => (
  <div className='pt-10'>
    {/* TODO */}
    {/* <Cursor /> */}
    {skills.map((s) => (
      <div
        key={s.id}
        className='flex flex-col items-center justify-between w-full h-full px-5 py-8 md:p-10 md:py-16'
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
