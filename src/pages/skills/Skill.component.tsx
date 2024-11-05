import {FC} from 'react';

type Props = {
	name: string;
	logo: string;
	url: string;
	language?: string | undefined;
	description: string;
};

const SkillComponent: FC<Props> = ({name, logo, language, description, url}) => {
	return (
		<div
			className='flex w-full p-5 text-white rounded-xl bg-gray-950'
			onClick={() => (window.location.href = url)}
		>
			<div className='flex-col space-y-2 text-white cursor-pointer'>
				<div className='flex'>
					<img alt='bitbucket_logo' className='mr-5 w-14 h-14' src={logo} />
					<div className='flex'>
						<div className='text-4xl'>{name}</div>
						<div className='ml-2 text-sm'>{language ?? ''}</div>
					</div>
				</div>
				<div>{description}</div>
			</div>
		</div>
	);
};

export default SkillComponent;
