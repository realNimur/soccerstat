import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { COMPETITIONS_ROUTE } from '../routes';
import GoBack from '../components/GoBackButton';
import TableResult from '../components/TableResult';
import DateFilter from '../components/DateFilter';
import useDateFilter from '../customHooks/useDateFilter';
import Loader from '../components/Loader';
import ErrorPush from '../components/ErrorPush';

const MatchesCompetitionPage = () => {
	const param = useParams();
	const [matchList, setMatchList] = useState([]);
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
	} = useDateFilter(matchList);


	useEffect(async () => {
		setLoading(true);
		try {
			const request = await axios.get(`https://api.football-data.org/v2/competitions/${param.id}/matches`, {
				headers: {
					'X-Auth-Token': process.env.REACT_APP_API_KEY
				}
			});
			setMatchList(request.data.matches);
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
				<GoBack route={COMPETITIONS_ROUTE} />
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
						<TableResult paramId={param.id} matchList={filteredArray} variant={'competitionMatch'} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default MatchesCompetitionPage;