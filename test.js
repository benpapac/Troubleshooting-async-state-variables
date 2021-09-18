import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../GameContext';
import Card from '../Card/Card';
import Axios from 'axios';

const GiphHeaven = () => {
	const game = useContext(GameContext);
	const [input, setInput] = useState('');
	const [search, setSearch] = useState('heaven');
	const [searchArray, setSearchArray] = useState();

	useEffect(() => {
		console.log(search);
		getGiphs(search);
	}, []);

	console.log(searchArray);
	function getGiphs(search) {
		const url = `${game.searchOptions.base}${game.searchOptions.search}q=${search}&api_key=${game.searchOptions.key}&limit=${game.searchOptions.winLimit}&offset=${game.searchOptions.offset}&rating=${game.searchOptions.rating}&lang=en`;
		Axios.get(url)
			.then(function (response) {
				setSearchArray(response.data.data);
			})
			.catch(function (response) {
				console.error(response);
			});
	}

	function handleChange(event) {
		setInput(event.target.value);
		setSearch(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		getGiphs(search);
		setInput('');
	}

	return (
		<div>
			<form className='form' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='find cool stuff'
					onChange={handleChange}
				/>
			</form>
			{searchArray.map((giph) => {
				return <Card card={giph} key={giph.title} />;
			})}
		</div>
	);
};

export default GiphHeaven;
