import MatchesTeamPage from './pages/MatchesTeamPage';
import MatchesCompetitionPage from './pages/MatchesCompetitionPage';
import MainPage from './pages/MainPage';
import TeamsPage from './pages/TeamsPage';
import CompetitionsPage from './pages/CompetitionsPage';

export const MAIN_ROUTE = '/';
export const TEAMS_ROUTE = '/teams';
export const COMPETITIONS_ROUTE = '/competitions';
export const TEAM_ROUTE = '/team/:id';
export const COMPETITION_ROUTE = '/competition/:id';

export const routes = [
	{
		url: TEAM_ROUTE,
		Component: MatchesTeamPage
	},
	{
		url: COMPETITION_ROUTE,
		Component: MatchesCompetitionPage
	},
	{
		url: MAIN_ROUTE,
		Component: MainPage
	},
	{
		url: TEAMS_ROUTE,
		Component: TeamsPage
	},
	{
		url: COMPETITIONS_ROUTE,
		Component: CompetitionsPage
	},
];