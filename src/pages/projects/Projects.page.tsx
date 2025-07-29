import {projects} from '../../constants/projects';
import ProjectComponent from './Project.component';

const ProjectsPage = () => (
  <div className='pt-10'>
    {projects.map((p) => (
      <div
        key={p.id}
        className='flex flex-col items-center justify-between w-full h-full px-5 py-8 md:p-10 md:py-16'
      >
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
  </div>
);

export default ProjectsPage;
