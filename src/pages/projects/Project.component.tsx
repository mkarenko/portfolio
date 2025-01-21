import {skills} from '../../constants/skills';
import {boxClass} from '../../utils/constants';

import androidIcon from '../../assets/android.svg';
import iosIcon from '../../assets/ios.svg';

type Props = {
  name: string;
  description: string;
  technologies: number[];
  icon: string;
  logo: string | undefined;
  website: string;
  android: string | null;
  ios: string | null;
};

export const getSkillDetails = (ids?: number[]) => {
  if (!ids) return [];
  return skills.filter((skill) => ids.includes(skill.id));
};

const ProjectComponent = ({
  name,
  description,
  technologies,
  logo,
  icon,
  website,
  android,
  ios,
}: Props) => {
  const skillDetails = getSkillDetails(technologies);

  return (
    <div className={boxClass}>
      <img alt='logo' src={logo} className='w-full row-start-1 p-10 h-1/3' />
      <div className='text-2xl font-bold'>{name}</div>
      <div>{description}</div>
      <div>
        {skillDetails.length > 0 && (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
            {skillDetails.map((s) => (
              <div key={s.id} className='flex items-center p-2 space-x-4 border rounded shadow'>
                <img alt={s.name} src={s.logo} className='w-10 h-10' />
                <strong>{s.name}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='flex items-center justify-end space-x-5'>
        <a href={website}>
          <img alt='website' src={icon} className='w-10 rounded-full hover:cursor-pointer' />
        </a>
        {android && (
          <a href={android}>
            <img alt='android' src={androidIcon} className='w-10 h-10 hover:cursor-pointer' />
          </a>
        )}
        {ios && (
          <a href={ios}>
            <img alt='ios' src={iosIcon} className='w-10 h-10 hover:cursor-pointer' />
          </a>
        )}
      </div>
    </div>
  );
};

ProjectComponent.defaultProps = {
  logo: undefined,
  android: undefined,
  ios: undefined,
};

export default ProjectComponent;
