import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
	return (
		<>
			<div
				className="position-fixed bg-light d-flex align-items-center justify-content-center"
				style={{
					top: 0,
					left: 0,
					right: 0,
					bottom: 0
				}}
			>
				<Spinner animation="grow" variant="primary" />
			</div>
		</>

	);
};

export default Loader;