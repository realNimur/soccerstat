import React, { useState } from 'react';
import Loader from '../components/Loader';

const useLoader = () => {
	const [loading, setLoading] = useState(false);

	if(loading){
		return <Loader />
	}

	return {setLoading};
};

export default useLoader;