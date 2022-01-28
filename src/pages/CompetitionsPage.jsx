import React, { useContext } from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../routes';
import useSearchInput from '../customHooks/useSearchInput';
import GoBack from '../components/GoBackButton';
import CompetitionItem from '../components/CompetitionItem';


const CompetitionsPage = () => {
	const navigate = useNavigate();

	const { competitionList } = useContext(Context);
	const { filteredList, filterValue, setFilterValue, filterByName } = useSearchInput(competitionList, 'name');

	return (
		<>
			<GoBack route={MAIN_ROUTE} />
			<Container className={'mt-4'}>
				<Row>
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
				</Row>
				<Row>
					<Col>
						{filteredList.length > 0 &&
						filteredList.map(item =>
							<CompetitionItem
								key={item.id}
								id={item.id}
								name={item.name}
								countryCode={item.area.countryCode}
								ensignUrl={item.area.ensignUrl}
							/>)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CompetitionsPage;