import React, {useState, useEffect} from 'react';
import './clock.css';

const AnalogClock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className='clock'>
			<div>
				<div className='info date'>{time.toLocaleDateString()}</div>
				<div className='info day'>{time.toLocaleDateString('en-US', {weekday: 'long'})}</div>
			</div>
			<div className='dot'></div>
			<div>
				<div
					className='hour-hand'
					style={{
						transform: `rotate(${time.getHours() * 30 + time.getMinutes() * (360 / 720)}deg)`,
					}}
				></div>
				<div
					className='minute-hand'
					style={{
						transform: `rotate(${time.getMinutes() * 6 + time.getSeconds() * (360 / 3600)}deg)`,
					}}
				></div>
				<div
					className='second-hand'
					style={{transform: `rotate(${time.getSeconds() * 6}deg)`}}
				></div>
			</div>
			<div>
				<span className='h3'>3</span>
				<span className='h6'>6</span>
				<span className='h9'>9</span>
				<span className='h12'>12</span>
			</div>
			<div className='diallines'></div>
		</div>
	);
};

export default AnalogClock;
