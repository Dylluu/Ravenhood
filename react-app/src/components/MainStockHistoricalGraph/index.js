import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import './MainStockHistoricalGraph.css';
// const apiKeys = [
// 	'3MO65OQ6CPMMNJTQ',
// 	'39IUG3VMDLMFIEX0',
// 	'4GDMAT3E0KC2FFZU',
// 	'G7J7RWW57SHS3FGR',
// 	'UDCCY4YOYH87SG5E'
// ];
const apiKeys = '3MO65OQ6CPMMNJTQ';
const apiKeysStockInfo = ['LHU9QYGE8G6XZO0T', '03A3G6JU0R69U3TN'];

async function getStonks(range, ticker) {
	let rangeFunction, apiKey;
	let outputsize = '';
	let interval = '';
	switch (range) {
		case '1w':
			rangeFunction = 'TIME_SERIES_INTRADAY';
			apiKey = apiKeys;
			outputsize = '&outputsize=full';
			interval = '&interval=15min';
			break;
		case '1m':
			rangeFunction = 'TIME_SERIES_INTRADAY';
			interval = '&interval=60min';
			apiKey = apiKeys;
			break;
		case '3m':
			rangeFunction = 'TIME_SERIES_DAILY_ADJUSTED';
			outputsize = '&outputsize=compact';
			apiKey = apiKeys;
			break;
		case '1y':
			rangeFunction = 'TIME_SERIES_DAILY_ADJUSTED';
			outputsize = '&outputsize=full';
			apiKey = apiKeys;
			break;
		case '5y':
			rangeFunction = 'TIME_SERIES_WEEKLY';
			apiKey = apiKeys;
			break;
	}
	console.log(apiKey);
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
	const [type, setType] = useState('datetime');
	const [APILimit, setAPILimit] = useState(false);

	useEffect(() => {
		async function getStockHistoricalData() {
			const data = await getStonks(range, ticker);
			let stonk;
			try {
				switch (range) {
					case '1w':
						stonk = data['Time Series (15min)'];
						const oneWeekTimeSeries = Object.keys(stonk);
						const firstDate = new Date(
							oneWeekTimeSeries[0].split(' ')[0].replace(/-/g, '/')
						);
						const checkDate = firstDate.setDate(firstDate.getDate() - 7);
						const oneWeekDates = oneWeekTimeSeries.filter((date) => {
							const newDate = new Date(date);

							//Extract hours and minutes to compare
							let hour = newDate.getHours();
							hour = hour < 10 ? '0' + hour : hour;
							const minute = newDate.getMinutes();
							const time = `${hour}:${minute}`;

							// filter one week of date between 9:30-4:00pm EST
							return (
								new Date(date.split(' ')[0].replace(/-/g, '/')).getTime() >=
									checkDate &&
								time >= '09:30' &&
								time <= '16:00'
							);
						});
						const oneWeekData = oneWeekDates.map((date) => ({
							x: date,
							y: stonk[date]['4. close']
						}));
						setType('numeric');
						setSeries([{ data: oneWeekData.reverse() }]);
						break;
					case '3m':
						stonk = data['Time Series (Daily)'];
						const timeSeries = Object.keys(data['Time Series (Daily)']);
						const date = new Date(timeSeries[0].replace(/-/g, '/'));
						const threeMonth = date.setMonth(date.getMonth() - 3);

						// filter everyday for the last 3 months
						const threeMonthDate = timeSeries.filter(
							(date) =>
								new Date(date.replace(/-/g, '/')).getTime() >= threeMonth
						);
						const prices = threeMonthDate.map((date) => ({
							x: date,
							y: stonk[date]['4. close']
						}));
						setType('datetime');
						setSeries([{ data: prices.reverse() }]);
						break;
					case '1y':
						stonk = data['Time Series (Daily)'];
						const oneYearSeries = Object.keys(stonk);
						const one = new Date(oneYearSeries[0].replace(/-/g, '/'));
						const OneYearLater = one.setFullYear(one.getFullYear() - 1);
						const oneYearDate = oneYearSeries.filter(
							(date) =>
								new Date(date.replace(/-/g, '/')).getTime() >= OneYearLater
						);
						const oneYearPrices = oneYearDate.map((date) => ({
							x: date,
							y: stonk[date]['4. close']
						}));
						setType('datetime');
						setSeries([{ data: oneYearPrices.reverse() }]);
						break;
					case '5y':
						stonk = data['Weekly Time Series'];
						const fiveYearSeries = Object.keys(stonk);
						const five = new Date(fiveYearSeries[0].replace(/-/g, '/'));
						const fiveYearTime = five.setFullYear(five.getFullYear() - 5);
						const fiveYearDate = fiveYearSeries.filter(
							(date) =>
								new Date(date.replace(/-/g, '/')).getTime() >= fiveYearTime
						);
						const fiveYearPrices = fiveYearDate.map((date) => ({
							x: date,
							y: stonk[date]['4. close']
						}));
						setType('datetime');
						setSeries([{ data: fiveYearPrices.reverse() }]);
						break;
				}
			} catch {
				setAPILimit(true);
			}
		}

		getStockHistoricalData();
	}, [range]);

	if (APILimit)
		return (
			<div className="graph-loading-screen">
				OOPS WE BROKE AND ONLY GOT 5 api request/minute
			</div>
		);
	if (!series[0].data.length)
		return <div className="graph-loading-screen">Loading...</div>;

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
								setHoverPrice(Number(points).toFixed(2));
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
						type: type,
						labels: {
							show: false
						},
						axisTicks: {
							show: false
						},
						tooltip: {
							offsetY: -200,
							formatter: function (val, opts) {
								switch (type) {
									case 'datetime':
										let date = new Date(val);
										return date.toLocaleDateString();
									case 'numeric':
										let time = new Date(val);
										return `${time.toLocaleString('en-US')}`;
								}
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
