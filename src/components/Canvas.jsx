import { useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const SCALE = 100;

export default function Canvas({ sideA, sideB, sideC }) {
	const [triangle, setTriangle] = useState({
		A: { x: 0, y: 0 },
		B: { x: 0, y: 0 },
		C: { x: 0, y: 0 },
	});

	useEffect(() => {
		const A = Math.acos(
			(sideB * SCALE * (sideB * SCALE) +
				sideC * SCALE * (sideC * SCALE) -
				sideA * SCALE * (sideA * SCALE)) /
				(2 * (sideB * SCALE) * (sideC * SCALE))
		);
		const B = Math.acos(
			(sideC * SCALE * (sideC * SCALE) +
				sideA * SCALE * (sideA * SCALE) -
				sideB * SCALE * (sideB * SCALE)) /
				(2 * (sideC * SCALE) * (sideA * SCALE))
		);
		const C = Math.acos(
			(sideA * SCALE * (sideA * SCALE) +
				sideB * SCALE * (sideB * SCALE) -
				sideC * SCALE * (sideC * SCALE)) /
				(2 * (sideA * SCALE) * (sideB * SCALE))
		);

		setTriangle({
			A: { x: 0, y: 0 },
			B: { x: sideA * SCALE, y: 0 },
			C: { x: sideC * SCALE * Math.cos(B), y: sideC * SCALE * Math.sin(B) },
		});
	}, [sideA, sideB, sideC]);

	return (
		<Stage
			width={sideA * SCALE + 20}
			height={Math.max(triangle.B.y, triangle.C.y) + 20}
		>
			<Layer>
				<Line
					points={[
						triangle.A.x,
						triangle.A.y,
						triangle.B.x,
						triangle.B.y,
						triangle.C.x,
						triangle.C.y,
						triangle.A.x,
						triangle.A.y,
					]}
					stroke={'black'}
					strokeWidth={2}
				/>
			</Layer>
		</Stage>
	);
}
