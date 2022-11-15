import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'react-apexcharts';
import './MainStockGraph.css';

const directionEmojis = {
	up: '🔥',
	down: '🔻',
	'': ''
};

function MainStockGraph() {
	const stock = useSelector((state) => state.stock);
	const dispatch = useDispatch();
	const [series, setSeries] = useState([
		{
			data: []
		}
	]);
	const [price, setPrice] = useState(-1);
	const [startPrice, setStartPrice] = useState(-1);
	const [prevPrice, setPrevPrice] = useState(-1);
	const [chartColor, setChartColor] = useState(['#30642E']);
	const [priceColor, setPriceColor] = useState('#30642E');
	const [newticker, setNewTicker] = useState('');
	const [ticker, setTicker] = useState(`AMZN`);
	const [hoverPrice, setHoverPrice] = useState(null);

	// useEffect(() => {
	// 	dispatch(getStonkData(ticker));
	// }, [ticker]);

	// set color depending on the current price
	const currPrice = hoverPrice ? hoverPrice : price;
	const percentDifference = (
		((currPrice - startPrice) / startPrice) *
		100
	).toFixed(2);
	const priceDifference = (currPrice - startPrice).toFixed(2);

	useEffect(() => {
		// getting the price/percentage different from open price
		if (percentDifference > 0) setPriceColor('#30642E');
		else setPriceColor('#fd5240');
	}, [chartColor, hoverPrice]);
	useEffect(() => {
		let timeoutId;
		async function getLatestPrice() {
			try {
				const data = stock.stock;
				console.log('data', data);
				const stonk = data.chart.result[0];
				setPrevPrice(price);
				setPrice(stonk.meta.regularMarketPrice.toFixed(2));

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
				setSeries([{ data: prices }, { data: openPrice }]);
				// Change chart color based on open and current price
				let startPrice = quote.open[0];
				setStartPrice(startPrice);
				let currentPrice = quote.open[quote.open.length - 1];
				if (startPrice - currentPrice < 0) {
					setChartColor(['#30642E', 'gray']);
				} else setChartColor(['#fd5240', 'gray']);
			} catch (error) {
				console.log(error);
			}
			timeoutId = setTimeout(getLatestPrice, 6000);
		}

		if (stock.stock) getLatestPrice();

		return () => {
			clearTimeout(timeoutId);
		};
	}, [stock]);
	const direction = useMemo(
		() => (prevPrice < price ? 'up' : prevPrice > price ? 'down' : ''),
		[prevPrice, price]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		setTicker(newticker);
	};

	// if (!stock.stock) return 'YOOO DYLAN GET THIS LOADING PAGE';
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={newticker}
					onChange={(e) => setNewTicker(e.target.value)}
				/>
				<button type="submit"> Submit</button>
			</form>
			<div className="ticker">{ticker}</div>
			<div className={['price', direction].join(' ')}>
				${hoverPrice ? hoverPrice : price} {directionEmojis[direction]}
			</div>
			<div className="percentDifference" style={{ color: priceColor }}>
				<div>
					${priceDifference} ({percentDifference}%)
				</div>
			</div>
			<Chart
				options={{
					chart: {
						type: 'line',
						height: 350,
						toolbar: {
							show: false
						},
						events: {
							mouseMove: function (event, chartContext, config) {
								const points = series[0].data[config.dataPointIndex]?.y;
								setHoverPrice(points?.toFixed(2));
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
							enabled: [true, false],
							formatter: function (val, opts) {
								let time = new Date(val);
								return time.toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit'
								});
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
						width: [3, 2],
						dashArray: [0, 10]
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
				width="50%"
				height={420}
			/>
		</div>
	);
}

export default MainStockGraph;
