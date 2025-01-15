import {FC} from 'react';
import ProjectComponent from './Project.component';
import {projects} from '../../constants/projects';

const ProjectsPage: FC = () => {
	return (
		<>
			{projects.map((p) => (
				<div key={p.id} className='flex flex-col items-center justify-between w-full h-full p-10'>
					<ProjectComponent
						name={p.name}
						description={p.description}
						technologies={p.technologies}
						icon={p.icon}
						logo={p.logo}
						website={p.website}
						android={p.android || null}
						ios={p.ios || null}
					/>
				</div>
			))}
		</>
	);
};

export default ProjectsPage;
