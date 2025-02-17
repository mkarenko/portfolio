import Icon from '../../components/Icon';
import Image from '../../components/Image';
import {skills} from '../../constants/skills';
import {cardClass} from '../../utils/constants';

import appStoreLogo from '../../assets/logo/appstore.svg';
import playStoreLogo from '../../assets/logo/playstore.svg';

type Props = {
  name: string;
  description: string;
  technologies: number[];
  icon: string;
  logo: string;
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
    <div className={cardClass}>
      <img alt='logo' src={logo} className='w-full h-1/3 row-start-1' />
      <div className='text-2xl font-bold'>{name}</div>
      <div>{description}</div>
      {skillDetails.length > 0 && (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2'>
          {skillDetails.map((s) => (
            <div key={s.id} className='flex items-center p-2 space-x-4 rounded border shadow'>
              <img alt={s.name} src={s.logo} className='w-10 h-10' />
              <strong>{s.name}</strong>
            </div>
          ))}
        </div>
      )}
      <div className='flex justify-end items-center space-x-5'>
        <a href={website} target='_blank' rel='noopener noreferrer'>
          <Image src={icon} width='50px' height='50px' className='rounded-full' />
        </a>
        {android && (
          <a href={android} target='_blank' rel='noopener noreferrer'>
            <Icon src={appStoreLogo} size='40px' className='hover:cursor-pointer' />
          </a>
        )}
        {ios && (
          <a href={ios} target='_blank' rel='noopener noreferrer'>
            <Icon src={playStoreLogo} size='40px' className='hover:cursor-pointer' />
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
