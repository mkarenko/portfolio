<<<<<<< HEAD
import Cursor from 'src/components/Cursor';
=======
>>>>>>> 471142f (Fixed few issues)
import {skills} from '../../constants/skills';
import SkillComponent from './Skill.component';

const SkillsPage = () => (
  <div className='pt-10'>
<<<<<<< HEAD
    <Cursor />
    {skills.map((s) => (
      <div
        key={s.id}
        className='w-full h-full flex flex-col justify-between items-center px-5 py-8 md:p-10 md:py-16'
=======
    {/* TODO */}
    {/* <Cursor /> */}
    {skills.map((s) => (
      <div
        key={s.id}
        className='flex flex-col items-center justify-between w-full h-full px-5 py-8 md:p-10 md:py-16'
>>>>>>> 471142f (Fixed few issues)
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
