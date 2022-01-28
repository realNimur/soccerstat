import React, { forwardRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import styles from './styles.module.css';
import CalendarSvg from '../../img/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/ru';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

registerLocale('ru-RU', es);

const DateFilter = ({
											visibleCalendar,
											setVisibleCalendar,
											startDate,
											setStartDate,
											endDate,
											setEndDate,
											filterByDate,
											resetButtonHandler
										}) => {
	const navigate = useNavigate();

	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		if (dates[1] !== null) {
			navigate(`?dateFrom=${start.toISOString()}&dateTo=${end.toISOString()}`);
			setVisibleCalendar(false);
			filterByDate(start, end);
		}
	};

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<Button variant={'primary'} className="mb-2" onClick={onClick} ref={ref}>
			{value ? value : '2022'}
		</Button>
	));

	return (
		<>
			<style>{`
			.react-datepicker-popper{
			z-index: 1000;
			}
			.react-datepicker__year-wrapper{
				justify-content: space-evenly;
			}
			.react-datepicker__year .react-datepicker__year-text{
				padding: 5px'
			}
			.react-datepicker__navigation-icon::before{
				width: 15px;
				height: 15px;
				top: 7px;
			}
		`}</style>
			<div
				className={`position-fixed ${styles['calendar']} ${visibleCalendar && styles['open']}`}
			>
				{!visibleCalendar &&
				<div
					className={`d-flex flex-column align-items-center border-0 p-3 bg-warning small ${styles['button-opacity']}`}
					type={'button'}
					onClick={() => setVisibleCalendar(true)}
				>
					<img width={60} height={60} src={CalendarSvg} alt="calendar" className={'mb-3'} />
					{endDate && <>
						<p className={'text-white'}>{startDate.toLocaleDateString()}</p>
						<p className={'text-white'}>{endDate.toLocaleDateString()}</p>
					</>}

					<Button
						size={'sm'}
						variant={'primary mt-2'}
						onClick={(e) => {
							e.stopPropagation();
							resetButtonHandler();
							setStartDate(new Date());
							setEndDate(null);
						}}
					>Сбросить</Button>
				</div>
				}
				{visibleCalendar &&
				<>
					<div className="text-center">
						<DatePicker
							selected={startDate}
							onChange={(date) => {
								setStartDate(date);
							}}
							showYearPicker
							dateFormat="yyyy"
							customInput={<ExampleCustomInput />}
						/>
					</div>
					<DatePicker
						selected={startDate}
						onChange={onChange}
						startDate={startDate}
						endDate={endDate}
						locale="ru-RU"
						selectsRange
						inline
					/>
				</>
				}
			</div>
		</>
	);
};

export default DateFilter;