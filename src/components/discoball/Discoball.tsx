import {FC, useEffect, useRef} from 'react';

import './discoball.css';

type Props = {
	onDiscoBallClick: Function;
};

const Discoball: FC<Props> = ({onDiscoBallClick}) => {
	const ballRef = useRef<HTMLDivElement>(null);
	const radius = 30;
	const mirrorSize = radius / 7.5;
	const rows = 18;
	const angleIncLatitude = Math.PI / rows;

	useEffect(() => {
		const ball = ballRef.current;

		if (ball) {
			ball.style.width = `${2 * radius}px`;
			ball.style.height = `${2 * radius}px`;
			ball.style.marginLeft = `-${radius}px`;

			ball.innerHTML = '';

			for (let a = 0; a < Math.PI; a += angleIncLatitude) {
				const z = radius * Math.cos(a);
				const r = radius * Math.sin(a);
				const circumference = 2 * Math.PI * r;
				const mirrorsInRow = Math.floor(circumference / (1.2 * mirrorSize));
				const angleIncRow = (2 * Math.PI) / mirrorsInRow;

				for (let b = 0; b < 2 * Math.PI; b += angleIncRow) {
					const x = r * Math.cos(b);
					const y = r * Math.sin(b);
					addMirror(x, y, z, a, b);
				}
			}
		} // eslint-disable-next-line
	}, []);

	const addMirror = (x: number, y: number, z: number, a: number, b: number) => {
		const ball = ballRef.current;
		if (!ball) return;

		const mirror = document.createElement('div');
		mirror.classList.add('mirror');
		mirror.setAttribute('data-angle', a.toString());

		mirror.style.width = `${mirrorSize}px`;
		mirror.style.height = `${mirrorSize}px`;
		mirror.style.transform = `translateX(${radius + x - mirrorSize / 2}px) translateY(${
			radius + y - mirrorSize / 2
		}px) translateZ(${z}px) rotateZ(${b}rad) rotateY(${a}rad)`;

		mirror.style.backgroundColor = rainbowColour(a);
		mirror.style.animation = addSparkle();

		ball.appendChild(mirror);
	};

	const rainbowColour = (a: number) => {
		const h = (360 * -a) / Math.PI;
		const normal = Math.floor(Math.random() * 20) + 30;
		const bright = Math.floor(Math.random() * 40) + 30;
		const l = a > 1 && a < 2 ? bright : normal;
		return `hsl(${h}, 100%, ${l}%)`;
	};

	const addSparkle = () => {
		const delay = Math.floor(Math.random() * 3);
		return `sparkle 1.5s ${delay}s infinite`;
	};

	return (
		<div className='ball-container hover:cursor-pointer' onClick={() => onDiscoBallClick()}>
			<div className='string' />
			<div ref={ballRef} className='discoball' />
			<div className='glow' />
		</div>
	);
};

export default Discoball;
