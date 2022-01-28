import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<Container>
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