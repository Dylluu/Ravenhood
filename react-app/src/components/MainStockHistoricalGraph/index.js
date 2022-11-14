import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import './MainStockHistoricalGraph.css';
const apiKeys = [
	'3MO65OQ6CPMMNJTQ',
	'39IUG3VMDLMFIEX0',
	'4GDMAT3E0KC2FFZU',
	'G7J7RWW57SHS3FGR',
	'UDCCY4YOYH87SG5E'
];
const apiKeysStockInfo = ['LHU9QYGE8G6XZO0T', '03A3G6JU0R69U3TN'];

async function getStonks(range, ticker) {
	let rangeFunction, apiKey;
	let outputsize = '';
	let interval = '';
	switch (range) {
		case '1w':
			rangeFunction = 'TIME_SERIES_INTRADAY';
			apiKey = apiKeys[0];
			outputsize = '&outputsize=full';
			interval = '&interval=15min';
			break;
		case '1m':
			rangeFunction = 'TIME_SERIES_INTRADAY';
			interval = '&interval=60min';
			apiKey = apiKeys[1];
			break;
		case '3m':
			rangeFunction = 'TIME_SERIES_DAILY_ADJUSTED';
			outputsize = '&outputsize=compact';
			apiKey = apiKeys[2];
			break;
		case '1y':
			rangeFunction = 'TIME_SERIES_DAILY_ADJUSTED';
			outputsize = '&outputsize=full';
			apiKey = apiKeys[3];
			break;
		case '5y':
			rangeFunction = 'TIME_SERIES_WEEKLY';
			apiKey = apiKeys[4];
			break;
	}
	const baseURl = `https://www.alphavantage.co/query?function=${rangeFunction}&symbol=${ticker}${outputsize}${interval}&apikey=${apiKey}`;
	const response = await fetch(baseURl);
	return response.json();
}

function MainStockHistoricalGraph({ setHoverPrice, range }) {
	const { ticker } = useParams();

	const [series, setSeries] = useState([
		{
			data: []
		}
	]);
	const [chartColor, setChartColor] = useState(['#5AC53B']);
	const [priceColor, setPriceColor] = useState('#5AC53B');

	useEffect(() => {
		async function getStockHistoricalData() {
			const data = await getStonks(range, ticker);
			switch (range) {
				case '1w':
					break;
				case '3m':
					const stonk = data['Time Series (Daily)'];
					const timeSeries = Object.keys(data['Time Series (Daily)']);
					const date = new Date(timeSeries[0].replace(/-/g, '/'));
					const threeMonth = date.setMonth(date.getMonth() - 3);
					const threeMonthDate = timeSeries.filter(
						(date) => new Date(date.replace(/-/g, '/')).getTime() >= threeMonth
					);
					const prices = threeMonthDate.map((date) => ({
						x: date,
						y: stonk[date]['4. close']
					}));
					setSeries([{ data: prices }]);
					break;
			}
		}

		getStockHistoricalData();
	}, []);

	if (!series[0].data.length) return null;
	return (
		<div id="chart-historical">
			<Chart
				options={{
					chart: {
						type: 'line',
						toolbar: {
							show: false
						},
						events: {
							mouseMove: function (event, chartContext, config) {
								const points = series[0].data[config.dataPointIndex]?.y;
								setHoverPrice(points);
							},
							mouseLeave: function () {
								setHoverPrice(null);
							}
						},
						zoom: {
							enabled: false
						}
					},
					xaxis: {
						type: 'datetime',
						labels: {
							show: false
						},
						tooltip: {
							offsetY: -200,
							formatter: function (val, opts) {
								let time = new Date(val);
								return time.toLocaleDateString();
							}
						}
					},
					yaxis: {
						show: false
					},
					grid: {
						show: false
					},
					stroke: {
						width: 2
					},
					colors: chartColor,
					tooltip: {
						enabled: true,
						shared: true,
						items: {
							display: 'none'
						},
						x: {
							show: false
						}
					},
					legend: {
						show: false
					}
				}}
				series={series}
				type="line"
				width="100%"
				height="100%"
			/>
		</div>
	);
}

export default MainStockHistoricalGraph;
