import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import Loader from './components/Loader';
import ErrorPush from './components/ErrorPush';
import { routes } from './routes';
import axios from 'axios';
import './App.css';

export const Context = createContext([]);

function App() {
	const [competitionList, setCompetitionList] = useState([]);
	const [competitioinFavoriteIds, setCompetitioinFavoriteIds] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(async () => {
		setLoading(true);
		const competitioinsFavorite = ['Premier League', 'Bundesliga', 'Serie A', 'Primera Division', 'Ligue 1'];
		const newCompetitionList = [];
		const newCompetitioinFavoriteIds = [];

		try {
			const request = await axios.get(`https://api.football-data.org/v2/competitions/`, {
				params: {
					plan: 'TIER_ONE',
				},
				headers: {
					'X-Auth-Token': process.env.REACT_APP_API_KEY
				}
			});

			request.data.competitions.forEach(competitioin => {
				competitioinsFavorite.forEach(competitioinFavorite => {
					if (competitioin.name === competitioinFavorite) {
						newCompetitionList.push(competitioin);
						newCompetitioinFavoriteIds.push(competitioin.id);
					}
				});
			});

			setCompetitioinFavoriteIds(newCompetitioinFavoriteIds);
			setCompetitionList(newCompetitionList);
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<Context.Provider value={{ competitionList, competitioinFavoriteIds }}>
			<div className="App d-flex justify-content-center">
				{error && <ErrorPush text={error} />}
				<BrowserRouter>
					<Routes>
						{routes.map(({ url, Component }) => {
							return <Route path={url} element={<Component />} key={url} />;
						})}
					</Routes>
				</BrowserRouter>
			</div>
		</Context.Provider>
	);
}

export default App;
