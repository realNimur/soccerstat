import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TableResultItem = (
	{
		fullDate,
		colTable,
		isCompetitionMatch,
		status,
		awayTeamExtraScore,
		homeTeamExtraScore,
		awayTeamPenaltiesScore,
		homeTeamPenaltiesScore,
		timeMatch,
		winner,
		homeTeamId,
		homeTeamName,
		paramId,
		homeTeamScore,
		awayTeamId,
		awayTeamName,
		awayTeamScore
	}) => {
	return (
		<>
			{
				fullDate &&
				<tr>
					<td colSpan={colTable} className={'fw-bold'}>{fullDate}
						{!isCompetitionMatch && status === 'POSTPONED' &&
						<span className={'ms-2 bg-warning p-1'}>ПЕРЕНЕСЕНО</span>}</td>
				</tr>
			}
			<tr>
				{isCompetitionMatch &&
				<td>{timeMatch}{status === 'POSTPONED' && <p className={'ms-2 bg-warning p-1 small'}>ПЕРЕНЕСЕНО</p>}</td>
				}
				<td>
					{winner === 'HOME_TEAM' && <Badge bg="success" className={'mx-2'} pill>Winner</Badge>}
					<Link to={`/team/${homeTeamId}`}>{homeTeamName}</Link>
					{!isCompetitionMatch && Number(paramId) === homeTeamId &&
					<Badge pill className={'ms-2'} bg="primary">T</Badge>}
				</td>
				<td style={{ minWidth: '50px' }}>{homeTeamScore ?? '-'} : {awayTeamScore ?? '-'}</td>
				<td>
					{winner === 'AWAY_TEAM' && <Badge bg="success" className={'mx-2'} pill>Winner</Badge>}
					<Link to={`/team/${awayTeamId}`}>{awayTeamName}</Link>
					{!isCompetitionMatch && Number(paramId) === awayTeamId &&
					<Badge pill className={'ms-2'} bg="primary">T</Badge>}
				</td>
			</tr>
			{
				awayTeamExtraScore && <tr>
					<td colSpan={colTable}>Extra time: {homeTeamExtraScore} : {awayTeamExtraScore}</td>
				</tr>
			}
			{
				awayTeamPenaltiesScore && <tr>
					<td colSpan={colTable}>Penalty: {homeTeamPenaltiesScore} : {awayTeamPenaltiesScore}</td>
				</tr>
			}
		</>
	);
};

export default TableResultItem;