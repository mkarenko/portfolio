import {FC} from 'react';

import SkillComponent from './Skill.component';
import {skills} from '../../constants/skills';

const SkillsPage: FC = () => (
	<>
		<div className='grid gap-8 p-16 xl:grid-cols-2 justify-items-center'>
			{skills.map((s) => (
				<SkillComponent
					key={s.id}
					name={s.name}
					logo={s.logo}
					url={s.website}
					description={s.description}
				/>
			))}
		</div>
	</>
);

export default SkillsPage;
