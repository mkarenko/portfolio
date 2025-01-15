import {FC} from 'react';
import {chevronUpOutline} from 'ionicons/icons';

import BaseButton from './BaseButton';
import BaseIcon from '../BaseIcon';

const GoTopButton: FC = () => {
	return (
		<div className=''>
			<BaseButton>
				<BaseIcon icon={chevronUpOutline} />
			</BaseButton>
		</div>
	);
};

export default GoTopButton;
