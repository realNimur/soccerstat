import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TEAMS_ROUTE } from '../routes';
import { Col, Container, Row } from 'react-bootstrap';
import DateFilter from '../components/DateFilter';
import useDateFilter from '../customHooks/useDateFilter';
import GoBack from '../components/GoBackButton';
import TableResult from '../components/TableResult';
import ErrorPush from '../components/ErrorPush';
import Loader from '../components/Loader';

const MatchesTeamPage = () => {
	const param = useParams();
	const [matchesTeam, setMatchesTeam] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const {
		visibleCalendar,
		setVisibleCalendar,
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		filterByDate,
		resetButtonHandler,
		filteredArray
	} = useDateFilter(matchesTeam);


	useEffect(async () => {
		setLoading(true);
		try {
			const request = await axios.get(`https://api.football-data.org/v2/teams/${param.id}/matches/`, {
				headers: {
					'X-Auth-Token': process.env.REACT_APP_API_KEY
				}
			});
			setMatchesTeam(request.data.matches);
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<Container>
				{error && <ErrorPush />}
				<GoBack route={TEAMS_ROUTE} />
				<Row>
					<Col sm={12}>
						<DateFilter
							visibleCalendar={visibleCalendar}
							setVisibleCalendar={setVisibleCalendar}
							startDate={startDate}
							setStartDate={setStartDate}
							endDate={endDate}
							setEndDate={setEndDate}
							filterByDate={filterByDate}
							resetButtonHandler={resetButtonHandler}
						/>
					</Col>
					<Col sm={12}>
						<TableResult matchList={filteredArray} paramId={param.id} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default MatchesTeamPage;