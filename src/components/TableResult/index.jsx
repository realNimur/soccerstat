import React from 'react';
import { Table } from 'react-bootstrap';
import TableResultItem from '../TableResultItem';

const TableResult = ({ matchList, paramId, variant = 'matchTeam' }) => {
	const isCompetitionMatch = variant === 'competitionMatch';
	const colTable = isCompetitionMatch ? 4 : 3;
	let pastDate = '';

	return (
		<Table striped bordered hover>
			<tbody className={'small text-center align-middle'}>
			{
				matchList.length === 0 &&
				<tr>
					<td>Результатов нет</td>
				</tr>
			}
			{matchList.length > 0 && matchList.map((match) => {
				let {
					id,
					awayTeam: { name: awayTeamName, id: awayTeamId },
					homeTeam: { name: homeTeamName, id: homeTeamId },
					score: {
						fullTime: { awayTeam: awayTeamScore, homeTeam: homeTeamScore },
						extraTime: { awayTeam: awayTeamExtraScore, homeTeam: homeTeamExtraScore },
						penalties: { awayTeam: awayTeamPenaltiesScore, homeTeam: homeTeamPenaltiesScore },
						winner,
					},
					status,
					utcDate: date,
				} = match;
				let fullDate;
				let timeMatch = null;
				let utcHours = null;
				let utcMinutes = null;

				if (isCompetitionMatch) {
					if (new Date(date).toLocaleString().slice(0, 10) === new Date(pastDate).toLocaleString().slice(0, 10)) {
						fullDate = null;
					} else {
						fullDate = new Date(date).toLocaleDateString('ru-RU', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						});
					}
					pastDate = date;
					utcHours = new Date(date).getUTCHours();
					utcMinutes = new Date(date).getUTCMinutes() === 0 ? '00' : new Date(date).getUTCMinutes();
					timeMatch = `${utcHours}:${utcMinutes}`;
				} else {
					fullDate = new Date(date).toLocaleDateString('ru-RU', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric'
					});
				}

				return <TableResultItem
					key={id}
					fullDate={fullDate}
					colTable={colTable}
					isCompetitionMatch={isCompetitionMatch}
					status={status}
					awayTeamExtraScore={awayTeamExtraScore}
					homeTeamExtraScore={homeTeamExtraScore}
					awayTeamPenaltiesScore={awayTeamPenaltiesScore}
					homeTeamPenaltiesScore={homeTeamPenaltiesScore}
					timeMatch={timeMatch}
					winner={winner}
					homeTeamId={homeTeamId}
					homeTeamName={homeTeamName}
					paramId={paramId}
					homeTeamScore={homeTeamScore}
					awayTeamId={awayTeamId}
					awayTeamName={awayTeamName}
					awayTeamScore={awayTeamScore}
				/>;
			})}
			</tbody>
		</Table>
	);
};

export default TableResult;