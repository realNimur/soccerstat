import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const CompetitionItem = ({ ensignUrl, countryCode, name, id }) => {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => navigate(`/competition/${id}`)}
			className={'w-100 mb-3 d-flex justify-content-between align-items-center px-1 px-sm-5 py-3'}
			variant={'outline-primary'}
		>
			<div className={'d-flex align-items-center flex-column w-50'}>
				<img width={40} height={24} src={ensignUrl}
						 alt="flag country" />
				<p>{countryCode}</p>
			</div>
			<p className={' w-50'}>{name}</p>
		</Button>
	);
};

export default CompetitionItem;