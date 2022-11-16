import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainStockHistoricalGraph from '../MainStockHistoricalGraph';
import './MainStockPage.css';

function MainStockPage({
	setShowOneDay,
	setHoverPrice,
	showOneDay,
	hoverPrice
}) {
	const { ticker } = useParams();
	const [showOneWeek, setShowOneWeek] = useState(false);
	const [showThreeMonth, setShowThreeMonth] = useState(false);
	const [showOneYear, setShowOneYear] = useState(false);
	const [showFiveYear, setShowFiveYear] = useState(false);
	const [range, setRange] = useState(null);

	const showGraph = (range) => {
		setShowOneDay(false);
		setShowOneWeek(false);
		setShowThreeMonth(false);
		setShowOneYear(false);
		setShowFiveYear(false);
		switch (range) {
			case '1d':
				setRange('1d');
				setShowOneDay(true);
				break;
			case '1w':
				setRange('1w');
				setShowOneWeek(true);
				break;
			case '3m':
				setRange('3m');
				setShowThreeMonth(true);
				break;
			case '1y':
				setRange('1y');
				setShowOneYear(true);
				break;
			case '5y':
				setRange('5y');
				setShowFiveYear(true);
				break;
		}
	};
	return (
		<>
			{showOneWeek && (
				<MainStockHistoricalGraph
					setHoverPrice={setHoverPrice}
					range={range}
					tikcer={ticker}
					hoverPrice={hoverPrice}
				/>
			)}
			{showThreeMonth && (
				<MainStockHistoricalGraph
					setHoverPrice={setHoverPrice}
					range={range}
					tikcer={ticker}
					hoverPrice={hoverPrice}
				/>
			)}
			{showOneYear && (
				<MainStockHistoricalGraph
					setHoverPrice={setHoverPrice}
					range={range}
					tikcer={ticker}
					hoverPrice={hoverPrice}
				/>
			)}
			{showFiveYear && (
				<MainStockHistoricalGraph
					setHoverPrice={setHoverPrice}
					range={range}
					tikcer={ticker}
					hoverPrice={hoverPrice}
				/>
			)}
			<div className="range-options">
				<div
					className={`range-select ${showOneDay ? 'selected' : ''}`}
					onClick={() => showGraph('1d')}
				>
					1D
				</div>
				<div
					className={`range-select ${showOneWeek ? 'selected' : ''}`}
					onClick={() => showGraph('1w')}
				>
					1W
				</div>
				<div
					className={`range-select ${showThreeMonth ? 'selected' : ''}`}
					onClick={() => showGraph('3m')}
				>
					3M
				</div>
				<div
					className={`range-select ${showOneYear ? 'selected' : ''}`}
					onClick={() => showGraph('1y')}
				>
					1Y
				</div>
				<div
					className={`range-select ${showFiveYear ? 'selected' : ''}`}
					onClick={() => showGraph('5y')}
				>
					5Y
				</div>
			</div>
			
		</>
	);
}

export default MainStockPage;
