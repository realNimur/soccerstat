import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useDateFilter = (originalArray) => {
	let { search, pathname } = useLocation();
	const navigate = useNavigate();
	const [filteredArray, setFilteredArray] = useState([]);
	const [visibleCalendar, setVisibleCalendar] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const filterByDate = (startDate, endDate) => {
		const formatStartDate = startDate.toISOString();
		const formatEndDate = endDate.toISOString();

		const filteredArray = originalArray.slice().filter(({ utcDate: date }) => {
			const currentFormatDate = new Date(date).toISOString();
			if (endDate) {
				if (currentFormatDate > formatStartDate && currentFormatDate < formatEndDate) {
					return date;
				}
			} else {
				if (currentFormatDate > formatStartDate) {
					return date;
				}
			}
		});
		setFilteredArray(filteredArray);
	};

	const resetButtonHandler = () => {
		setStartDate(null);
		setEndDate(null);
		navigate(pathname);
		setFilteredArray(originalArray);
		window.scrollTo(0, 0)
	};

	useEffect(() => {
		const dateFrom = new URLSearchParams(search).get('dateFrom') && new Date(new URLSearchParams(search).get('dateFrom'));
		const dateTo = new URLSearchParams(search).get('dateTo') && new Date(new URLSearchParams(search).get('dateTo'));
		setFilteredArray(originalArray);
		if (dateFrom && dateTo) {
			setStartDate(dateFrom);
			setEndDate(dateTo);
			filterByDate(dateFrom, dateTo);
		}
	}, [originalArray]);

	return {
		visibleCalendar,
		setVisibleCalendar,
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		filterByDate,
		resetButtonHandler,
		filteredArray
	};
};

export default useDateFilter;