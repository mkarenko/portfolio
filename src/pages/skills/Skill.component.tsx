import {FC} from 'react';
import {boxClass} from '../../utils/constants';

type Props = {
	name: string;
	logo: string;
	url: string;
	language?: string | undefined;
	description: string;
};

const SkillComponent: FC<Props> = ({name, logo, language, description, url}) => {
	return (
		<div className={`${boxClass}`} onClick={() => (window.location.href = url)}>
			<img alt='logo' src={logo} className='flex w-1/2 p-10 mx-auto' />
			<div className='text-2xl font-bold'>{name}</div>
			<div className='ml-2 text-sm'>{language ?? ''}</div>
			<div>{description}</div>
		</div>
	);
};

export default SkillComponent;
