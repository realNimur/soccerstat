import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { Context } from '../App';
import ErrorPush from '../components/ErrorPush';

const MainPage = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setCompetitionList, setCompetitioinFavoriteIds } = useContext(Context);

	useEffect(() => {
		setLoading(true);
		const competitioinsFavorite = ['Premier League', 'Bundesliga', 'Serie A', 'Primera Division', 'Ligue 1'];
		const newCompetitionList = [];
		const newCompetitioinFavoriteIds = [];

		const fetchData = async () => {
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
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<Container>
				{error && <ErrorPush />}
				<Row className={'align-items-center justify-content-center h-100'}>
					<Col>
						<Button
							onClick={() => navigate('/competitions')}
							variant={'outline-primary'}
							className={'w-100 rounded-pill py-3 mb-3'}
						>Список
							лиг/соревнований</Button>
						<Button
							onClick={() => navigate('/teams')}
							variant={'outline-primary'}
							className={'w-100 rounded-pill py-3 mb-3'}
						>Список команд</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default MainPage;