import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GoBackButton = ({ route }) => {
	const navigate = useNavigate();
	return (
		<>
			<style>
				{
					`
					.navigation-buttons{
						z-index:1000;
					}
					.navigation-button{
						opacity: .4;
					}
					.navigation-button:hover{
						opacity: 1 ;
					}
					`
				}
			</style>
			<div
				className="d-flex flex-column align-items-center justify-content-end  justify-content-sm-center position-fixed mx-3 navigation-buttons"
				style={{ left: 0, top: '0', bottom: '10px' }}
			>
				<Button
					variant={'secondary'}
					className={'navigation-button mb-2'}
					onClick={() => navigate(route)}
				>&lt; Назад</Button>
				<Button
					variant={'secondary'}
					className={'navigation-button '}
					onClick={() => navigate('/')}
				>Главная</Button>
			</div>
		</>
	);
};

export default GoBackButton;