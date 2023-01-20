import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';

function App() {
	const [sideA, setSideA] = useState(0);
	const [sideB, setSideB] = useState(0);
	const [sideC, setSideC] = useState(0);
	const [angleA, setAngleA] = useState(0);
	const [angleB, setAngleB] = useState(0);
	const [angleC, setAngleC] = useState(0);
	const [triangleAngleClass, setTriangleAngleClass] = useState('');
	const [triangleSideClass, setTriangleSideClass] = useState('');

	const validTriangle = () =>
		sideA &&
		sideB &&
		sideC &&
		sideA + sideB > sideC &&
		sideA + sideC > sideB &&
		sideB + sideC > sideA;

	const parseInput = e => {
		const value = parseFloat(e.target.value);
		if (isNaN(value)) return 0;
		return value;
	};

	// calculateAngles calculate the 3 angles of a triangle given the side lengths using math.sin, math.cos, and math.tan
	const calculateAngles = (a, b, c) => {
		setAngleA(
			Math.acos(
				(Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * b * c)
			) *
				(180 / Math.PI)
		);
		setAngleB(
			Math.acos(
				(Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c)
			) *
				(180 / Math.PI)
		);
		setAngleC(
			Math.acos(
				(Math.pow(b, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b)
			) *
				(180 / Math.PI)
		);
	};

	const classifyTriangle = () => {
		if (angleA === 90 || angleB === 90 || angleC === 90) {
			setTriangleAngleClass('right');
		} else if (angleA > 90 || angleB > 90 || angleC > 90) {
			setTriangleAngleClass('obtuse');
		} else {
			setTriangleAngleClass('acute');
		}

		if (sideA === sideB && sideB === sideC) {
			setTriangleSideClass('equilateral');
		} else if (sideA === sideB || sideB === sideC || sideA === sideC) {
			setTriangleSideClass('isosceles');
		} else if (sideA !== sideB && sideB !== sideC && sideA !== sideC) {
			setTriangleSideClass('scalene');
		} else {
			setTriangleSideClass('invalid');
		}
	};

	useEffect(() => {
		if (validTriangle()) {
			calculateAngles(sideA, sideB, sideC);
		}
	}, [sideA, sideB, sideC]);

	useEffect(() => {
		if (validTriangle()) {
			classifyTriangle();
		}
	}, [angleC]);

	return (
		<div className="App bg-slate-700 min-h-screen flex flex-col gap-5">
			<Header />
			<div className="flex gap-5 items-center sm:justify-evenly flex-wrap flex-col sm:flex-row">
				<div className="flex justify-evenly gap-8 max-w-xs">
					<div>
						<label htmlFor="a">Side A</label>
						<br />
						<input
							onChange={e => setSideA(parseInput(e))}
							type="number"
							id="a"
							name="a"
						/>
					</div>
					<div>
						<label htmlFor="b">Side B</label>
						<br />
						<input
							onChange={e => setSideB(parseInput(e))}
							type="number"
							id="b"
							name="b"
						/>
					</div>
					<div>
						<label htmlFor="c">Side C</label>
						<br />
						<input
							onChange={e => setSideC(parseInput(e))}
							type="number"
							id="c"
							name="c"
						/>
					</div>
				</div>
				{sideA && sideB && sideC ? (
					validTriangle() ? (
						<div>
							<h2 className=" text-green-400">Valid Triangle</h2>
							<div>Angle A: {Math.round(angleA)}&deg;</div>
							<div>Angle B: {Math.round(angleB)}&deg;</div>
							<div>Angle C: {Math.round(angleC)}&deg;</div>
							<div>Triangle Angle Class: {triangleAngleClass}</div>
							<div>Triangle Side Class: {triangleSideClass}</div>
							<div className="flex justify-center mt-6">
								<Canvas sideA={sideA} sideB={sideB} sideC={sideC} />
							</div>
						</div>
					) : (
						<h2 className="text-red-600">Invalid Triangle</h2>
					)
				) : null}
			</div>
		</div>
	);
}

export default App;
