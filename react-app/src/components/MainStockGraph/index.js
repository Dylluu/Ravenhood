import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import MainStockPage from '../MainStockPage';
import * as stockActions from '../../store/stocks';
import './MainStockGraph.css';
import { useDispatch, useSelector } from 'react-redux';

const directionEmojis = {
	up: '🔥',
	down: '🔻',
	'': ''
};

async function getStonks(ticker) {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	return response.json();
}

function MainStockGraph() {
	const { ticker } = useParams();
	const stockData = useSelector((state) => state.stockData);
	const dispatch = useDispatch();
	// Data variables
	const [series, setSeries] = useState({
		data: []
	});
	const [openPriceData, setOpenPriceData] = useState({
		data: []
	});

	// Display variable, to render graph depending on selection
	const [showOneDay, setShowOneDay] = useState(true);

	// Price variables
	const [price, setPrice] = useState(-1);
	const [startPrice, setStartPrice] = useState(-1);
	const [prevPrice, setPrevPrice] = useState(-1);
	const [hoverPrice, setHoverPrice] = useState(null);
	const [openPrice, setOpenPrice] = useState(null);

	// chart and price display color variables
	const [chartColor, setChartColor] = useState(['#5AC53B']);
	const [priceColor, setPriceColor] = useState('#5AC53B');

	// trading period variable for graphing full day
	const [tradingPeriods, setTradingPeriods] = useState({});

	// set color depending on the current price
	const currPrice = hoverPrice ? hoverPrice : price;
	const percentDifference = (
		((currPrice - startPrice) / startPrice) *
		100
	).toFixed(2);
	const priceDifference = (currPrice - startPrice).toFixed(2);

	// useState for utilizing add to list button
	const [add, setAdd] = useState(false)

	useEffect(() => {
		// getting the price/percentage different from open price
		if (percentDifference > 0) setPriceColor('#5AC53B');
		else setPriceColor('#fd5240');
	}, [chartColor, hoverPrice, add]);

	useEffect(() => {
		let timeoutId;
		async function getLatestPrice() {
			try {
				const data = await getStonks(ticker);
				const stonk = data.chart.result[0];
				setPrevPrice(price);
				setPrice(stonk.meta.regularMarketPrice.toFixed(2));

				// Setting prices values for graphs
				const quote = stonk.indicators.quote[0];
				const prices = stonk.timestamp.map((timestamp, index) => ({
					x: new Date(timestamp * 1000),
					y: quote.open[index]
				}));

				// get trading period data for dashed open price
				const startTime = stonk.meta.tradingPeriods[0][0].start;
				const endTime = stonk.meta.tradingPeriods[0][0].end;
				setTradingPeriods({ startTime, endTime });
				setOpenPrice(quote.open[0]);

				setSeries({ data: prices });
				// Change chart color based on open and current price
				let startPrice = quote.open[0];
				setStartPrice(startPrice);
				let currentPrice = quote.open[quote.open.length - 1];
				if (startPrice - currentPrice < 0) {
					setChartColor(['#5AC53B', 'black']);
				} else setChartColor(['#fd5240', 'black']);
			} catch (error) {
				console.log(error);
			}
			timeoutId = setTimeout(getLatestPrice, 6000);
		}

		getLatestPrice();

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	useEffect(() => {
		console.log(stockData);
		dispatch(stockActions.cleanUpStockData());
		console.log(stockData);
	}, []);
	// generate graph data point for open price,
	// will trigger once open price has been set
	useEffect(() => {
		const dashedData = [];
		for (
			let i = tradingPeriods.startTime;
			i <= tradingPeriods.endTime;
			i += 60
		) {
			const data = {
				x: i * 1000,
				y: openPrice
			};
			dashedData.push(data);
		}
		console.log('yooooooo');
		setOpenPriceData({ data: dashedData });
	}, [openPrice]);

	const direction = useMemo(
		() => (prevPrice < price ? 'up' : prevPrice > price ? 'down' : ''),
		[prevPrice, price]
	);

	if (!series.data.length && !openPrice) return null;
	return (
		<div className='stock-page-outer'>
			<div className="main-stock-page-wrapper">
				<div className="ticker">{ticker}</div>
				<div className={['price', direction].join(' ')}>
					${hoverPrice ? hoverPrice : price} {directionEmojis[direction]}
				</div>
				<div id="chart">
					{showOneDay && (
						<>
							<div className="percentDifference" style={{ color: priceColor }}>
								<div>
									${priceDifference} ({percentDifference}%)
								</div>
							</div>
							<Chart
								options={{
									chart: {
										type: 'line',
										toolbar: {
											show: false
										},
										events: {
											mouseMove: function (event, chartContext, config) {
												const points = series.data[config.dataPointIndex]?.y;
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
											offsetY: -200,
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
										width: [2, 2],
										dashArray: [0, 10]
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
								series={[series, openPriceData]}
								type="line"
								width="100%"
								height="100%"
							/>
						</>
					)}
					<MainStockPage
						setShowOneDay={setShowOneDay}
						setHoverPrice={setHoverPrice}
						hoverPrice={hoverPrice}
						showOneDay={showOneDay}
					/>
				</div>
			</div>
			<div className='add-to-watchlists'>
				<div className='stock-info-holder'>
					<div className='stock-name'>
						I'm a stock!!
					</div>
					<div className='stock-detail'>
						I have something down here
					</div>
				</div>
				<button className='add-to-watchlists-button'>
					{/* onclick wanted to add */}
					<i class="fa-solid fa-check"></i> Add to Lists
					</button>
			</div>

		</div>
	);
}

export default MainStockGraph;
