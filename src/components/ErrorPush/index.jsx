import React, { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ErrorPush = ({ text ='Network Error' }) => {

	useEffect(() => {
		let timer;
		timer = setTimeout(() => {
			window.location.reload();
		}, 30000);
		return () => {
			clearTimeout(timer);
		};
	}, []);
	return (
		<>
			<ToastContainer
				className="p-3"
				position={'top-end'}
				style={{
					zIndex: 200
				}}
			>
				<Toast position="middle-center" bg={'danger'} delay={3000} autohide>
					<Toast.Header closeButton={false}>
						<strong className="me-auto">{text}</strong>
					</Toast.Header>
					<Toast.Body
						className={'rounded-3 text-white text-center '}
					>
						<p className={'mb-2'}>Произошла ошибка запроса.</p>
						<p className={'small'}>Страница будет обновляться каждые 30 секунд, пока соединение не восстановится.</p>
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default ErrorPush;