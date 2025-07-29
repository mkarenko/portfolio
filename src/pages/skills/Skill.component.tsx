import {cardClass} from '../../utils/constants';

type Props = {
  name: string;
  logo: string;
  url: string;
  language?: string | undefined;
  description: string;
};

const SkillComponent = ({name, logo, language, description, url}: Props) => (
  <div className={cardClass} onClick={() => (window.location.href = url)}>
<<<<<<< HEAD
    <img alt='logo' src={logo} className='mx-auto w-1/2 flex p-10' />
=======
    <img alt='logo' src={logo} className='flex w-1/2 p-10 mx-auto hover:cursor-pointer' />
>>>>>>> 471142f (Fixed few issues)
    <div className='text-2xl font-bold'>{name}</div>
    <div className='ml-2 text-sm'>{language ?? ''}</div>
    <div>{description}</div>
  </div>
);

export default SkillComponent;
