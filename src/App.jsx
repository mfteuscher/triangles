import './App.css';

function App() {
	return (
		<div className="App">
			<h1>Triangle Calculator</h1>
			<label for="a">Side A</label>
			<br />
			<input type="number" id="a" name="a" />
			<br />
			<label for="b">Side B</label>
			<br />
			<input type="number" id="b" name="b" />
			<br />
			<label for="c">Side C</label>
			<br />
			<input type="number" id="c" name="c" />
			<br />
		</div>
	);
}

export default App;
