import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import { routes } from './routes';
import './App.css';

export const Context = createContext({});

function App() {
	const [competitionList, setCompetitionList] = useState([]);
	const [competitioinFavoriteIds, setCompetitioinFavoriteIds] = useState([]);

	return (
		<Context.Provider
			value={{ competitionList, competitioinFavoriteIds, setCompetitionList, setCompetitioinFavoriteIds }}>
			<div className="App d-flex justify-content-center">
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
