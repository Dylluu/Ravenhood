import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainStockHistoricalGraph from '../MainStockHistoricalGraph';
import './MainStockPage.css';

function MainStockPage({ setShowOneDay, setHoverPrice }) {
	const { ticker } = useParams();
	const [showOneWeek, setShowOneWeek] = useState(false);
	const [showOneMonth, setShowOneMonth] = useState(false);
	const [showThreeMonth, setShowThreeMonth] = useState(false);
	const [showOneYear, setShowOneYear] = useState(false);
	const [showFiveYear, setShowFiveYear] = useState(false);
	const [range, setRange] = useState(null);
	const [showHistoricalGraph, setShowHistoricalGraph] = useState(false);

	const showGraph = (range) => {
		setShowOneDay(false);
		setShowHistoricalGraph(false);
		switch (range) {
			case '1d':
				setRange('1d');
				setShowOneDay(true);
				break;
			case '1w':
				setRange('1w');
				setShowHistoricalGraph(true);
				break;
			case '1m':
				setRange('1w');
				setShowHistoricalGraph(true);
				break;
			case '3m':
				setRange('3m');
				setShowHistoricalGraph(true);
				break;
			case '1y':
				setRange('1y');
				setShowHistoricalGraph(true);
				break;
			case '5y':
				setRange('5y');
				setShowHistoricalGraph(true);
		}
	};
	return (
		<>
			{showHistoricalGraph && (
				<MainStockHistoricalGraph
					setHoverPrice={setHoverPrice}
					range={range}
					tikcer={ticker}
				/>
			)}
			<div className="range-options">
				<p onClick={() => showGraph('1d')}>1D</p>
				<p>1W</p>
				<p>1M</p>
				<p onClick={() => showGraph('3m')}>3M</p>
				<p>1Y</p>
				<p>5Y</p>
			</div>
		</>
	);
}

export default MainStockPage;
