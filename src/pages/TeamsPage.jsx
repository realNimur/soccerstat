import React, { useContext, useEffect, useState } from 'react';
import GoBack from '../components/GoBackButton';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import TeamItem from '../components/TeamItem';
import { Context } from '../App';
import axios from 'axios';
import useSearchInput from '../customHooks/useSearchInput';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorPush from '../components/ErrorPush';
import { MAIN_ROUTE } from '../routes';

const TeamsPage = () => {
	const navigate = useNavigate();
	const { competitioinFavoriteIds } = useContext(Context);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [teamList, setTeamList] = useState([]);
	const { filteredList, filterValue, setFilterValue, filterByName } = useSearchInput(teamList, 'shortName');

	useEffect(async () => {
		setLoading(true);
		let teamListTemp = [];
		const requests = [];
		competitioinFavoriteIds.forEach((id, index) => {
			requests.push(`https://api.football-data.org/v2/competitions/${id}/teams`);
		});
		try {
			const request = await axios.all(requests.map(async (request) => {
				try {
					const res = await axios.get(request, { headers: { 'X-Auth-Token': process.env.REACT_APP_API_KEY } });
					if (res.status === 200) {
						teamListTemp = [...teamListTemp, ...res.data.teams];
					}
				} catch (e) {
					setError(true);
				}
			}));
			setTeamList(teamListTemp);
		} catch (e) {
			setError(true);
		}

		setLoading(false);
	}, [competitioinFavoriteIds]);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<GoBack route={MAIN_ROUTE}/>
			<Container>
				<Row>
					<div className={'d-flex align-items-stretch justify-content-evenly flex-wrap py-5'}>
						<Col sm={12}>
							<FloatingLabel
								controlId="floatingInput"
								label="Поиск"
								className="mb-3"
							>
								<Form.Control
									type="text"
									placeholder="text"
									value={filterValue}
									onChange={(e) => {
										navigate(`?search=${e.target.value}`);
										setFilterValue(e.target.value);
										filterByName(e.target.value);
									}}
								/>
							</FloatingLabel>
						</Col>
						{error && <ErrorPush />}
						{filteredList.length === 0 ? `Ничего не найдено по запросу ${filterValue}` :
							filteredList.map(item => {
								return <TeamItem
									key={item.id}
									id={item.id}
									name={item.shortName}
									crestUrl={item.crestUrl}
									founded={item.founded}
									countryName={item.area?.name}
									website={item.website}
								/>;
							})}
					</div>
				</Row>
			</Container>
		</>

	);
};

export default TeamsPage;