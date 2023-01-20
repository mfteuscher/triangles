import imgURL from '../assets/black-and-blue.png';

export default function Header() {
	return (
		<div className="relative h-44 sm:h-32 mb-4 bg-slate-700 text-white">
			<img className="absolute z-0 h-32" src={imgURL} />
			<h1 className="text-left absolute top-10 left-20 z-10">
				Triangle Calculator
			</h1>
		</div>
	);
}
