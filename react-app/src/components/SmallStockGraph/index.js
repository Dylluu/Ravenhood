import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, LinearScale, TimeScale } from 'chart.js';
import './SmallStockGraph.css';

ChartJs.register(LinearScale, TimeScale);
async function getStonks() {
	const response = await fetch(`https://yahoo-finance-api.vercel.app/TSLA`);
	return response.json();
}
export default function SmallStockGraph() {
	const [series, setSeries] = useState([]);
	const [chartColor, setChartColor] = useState(['#30642E']);

	useEffect(() => {
		let timeoutId;
		async function getLatestPrice() {
			try {
				const data = await getStonks();
				const stonk = data.chart.result[0];
				// Setting prices values for graphs
				const quote = stonk.indicators.quote[0];
				const prices = stonk.timestamp.map((timestamp, index) => ({
					x: new Date(timestamp * 1000),
					y: quote.open[index]
				}));
				const openPrice = stonk.timestamp.map((timestamp, index) => ({
					x: new Date(timestamp * 1000),
					y: quote.open[0]
				}));
				setSeries(prices);
				console.log(prices);
				// Change chart color based on open and current price
				let startPrice = quote.open[0];
				let currentPrice = quote.open[quote.open.length - 1];
				if (startPrice - currentPrice < 0) {
					setChartColor(['#30642E', 'gray']);
				} else setChartColor(['#fd5240', 'gray']);
			} catch (error) {
				console.log(error);
			}
			timeoutId = setTimeout(getLatestPrice, 1000000);
		}

		getLatestPrice();

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div className="LineGraph">
			<Line
				data={{
					datasets: [
						{
							type: 'line',
							data: series,
							backgroundColor: 'white',
							borderWidth: 2,
							pointBorderColor: 'rgba(0, 0, 0, 0)',
							pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
							pointHoverBorderColor: '#5AC53B',
							pointHoverBorderColor: '#00000',
							pointHoverBorderWidth: '4',
							pointHoverRadius: 6
						}
					]
				}}
				options={{
					legend: {
						display: false
					},
					scales: {
						y: {
							ticks: {
								display: false
							}
						},
						x: {
							type: 'time'
						}
					}
				}}
			/>
		</div>
	);
}
