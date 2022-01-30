import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';


const TeamItem = ({ id, name, crestUrl, founded, countryName, website }) => {
	const navigate = useNavigate();
	return (
		<>
			<Col xs={12} sm={6} md={4} lg={3} className={'mb-2'}>
				<Card
					className={'mx-1 rounded-3 justify-content-center align-items-center pt-2 h-100 small'}
				>
					<img width={60} height={60} src={crestUrl} alt="logo team" className={'mx-2'} />
					<Card.Body className={'d-flex flex-column text-center p-0'}>
						<Card.Title>{name}</Card.Title>
						<Card.Text className={'mb-3'}>
							<span>Страна: {countryName}</span>
							<span className={'d-block'}>Год основания: {founded}</span>
						</Card.Text>
						<Button
							size={'sm'}
							variant="outline-primary"
							className={'mb-4'}
							onClick={() => {
								navigate(`/team/${id}`);
							}}
						>Матчи команды</Button>
					</Card.Body>
					<Card.Footer className={'p-2 w-100 text-center'}>
						<span>Веб-сайт:</span>
						<a target={'_blank'} rel={'noreferrer'} className={'d-block'} href={website}>{name}</a>
					</Card.Footer>
				</Card>
			</Col>
		</>

	);
};

export default TeamItem;