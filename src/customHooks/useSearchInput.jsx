import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSearchInput = (originalList, searchCell) => {
	let { search, pathname } = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(search).get('search');


	const [filterValue, setFilterValue] = useState('');
	const [filteredList, setFilteredList] = useState([]);

	const filterByName = (text) => {
		const newFilteredArray = originalList.slice().filter((item) => {
			if (new RegExp(text.trim(), 'gmi').test(item[searchCell])) {
				return item;
			}
		});
		if (text === '') {
			setFilteredList(originalList.slice());
		} else {
			setFilteredList(newFilteredArray);
		}
	};

	useEffect(() => {
		setFilteredList(originalList);
		if (query) {
			setFilterValue(query);
			filterByName(filterValue);
		}
		if (query === '') navigate(pathname);
	}, [filterValue, originalList]);

	return { filteredList, filterValue, setFilterValue, filterByName };
};

export default useSearchInput;