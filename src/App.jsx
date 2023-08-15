import { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
	const [isloading, setIsLoading] = useState(true);
	const [tours, setTours] = useState([]);

	function removeTour(tourId) {
		const newTours = tours.filter((tourI) => tourI.id !== tourId);
		setTours(newTours);
	}

	const fetchTours = async () => {
		setIsLoading(true);
		try {
			const resp = await fetch(url);
			const tours = await resp.json();
			setTours(tours);
		} catch (err) {
			//setIsLoading(false);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		fetchTours();
	}, []);

	if (isloading) {
		return (
			<main>
				<Loading />
			</main>
		);
	}

	if (tours.length < 1) {
		return (
			<main>
				<div className="title">
					<h2>no tours left</h2>
					<button
						type="button"
						style={{ marginTop: '2rem' }}
						className="btn"
						onClick={fetchTours}
					>
						refresh
					</button>
				</div>
			</main>
		);
	}

	return (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	);
};

export default App;
