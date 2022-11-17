import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import MainStockPage from '../MainStockPage';
import * as stockActions from '../../store/stocks';
import './MainStockGraph.css';
import { useDispatch, useSelector } from 'react-redux';
import useSiteColorContext from '../../context/SiteColor';
import useStockPriceContext from '../../context/stockCurrentPrice';

async function getStonks(ticker) {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	return response.json();
}

function MainStockGraph() {
	const { ticker } = useParams();
	const stockData = useSelector((state) => state.stockData);
	const { setSiteColor } = useSiteColorContext();
	const { setPriceContext } = useStockPriceContext();
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
	const [chartColor, setChartColor] = useState(['#00c805']);
	const [priceColor, setPriceColor] = useState('#00c805');

	// trading period variable for graphing full day
	const [tradingPeriods, setTradingPeriods] = useState({});

	// set color depending on the current price
	const currPrice = hoverPrice ? hoverPrice : price;
	const percentDifference = (
		((currPrice - startPrice) / startPrice) *
		100
	).toFixed(2);
	const priceDifference = (currPrice - startPrice).toFixed(2);

	useEffect(() => {
		// getting the price/percentage different from open price
		if (percentDifference > 0) setPriceColor('#00c805');
		else setPriceColor('#ff5404');
	}, [chartColor, hoverPrice]);

	useEffect(() => {
		let timeoutId;
		async function getLatestPrice() {
			try {
				const data = await getStonks(ticker);
				console.log(data);
				const stonk = data.chart.result[0];
				setPrevPrice(price);
				setPrice(stonk.meta.regularMarketPrice.toFixed(2));
				setPriceContext(stonk.meta.regularMarketPrice.toFixed(2));

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
					if (showOneDay) setSiteColor('green');
					setChartColor(['#00c805', 'black']);
				} else {
					if (showOneDay) setSiteColor('red');
					setChartColor(['#ff5404', 'black']);
				}
			} catch (error) {
				console.log(error);
			}
			timeoutId = setTimeout(getLatestPrice, 6000);
		}

		getLatestPrice();

		return () => {
			clearTimeout(timeoutId);
		};
	}, [showOneDay]);

	useEffect(() => {
		dispatch(stockActions.cleanUpStockData());
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
		setOpenPriceData({ data: dashedData });
	}, [openPrice]);

	if (!series.data.length && !openPrice) return null;
	return (
		<div className="main-stock-page-wrapper">
			<div className="price">${hoverPrice ? hoverPrice : price}</div>
			<div className="graph-page-wrapper">
				{showOneDay && (
					<div id="chart">
						<div className="percentDifference" style={{ color: priceColor }}>
							<div>
								${priceDifference} ({percentDifference}%)
							</div>
						</div>
						<div className="graph-holder">
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
											offsetY: -220,
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
						</div>
					</div>
				)}
				<MainStockPage
					setShowOneDay={setShowOneDay}
					setHoverPrice={setHoverPrice}
					hoverPrice={hoverPrice}
					showOneDay={showOneDay}
				/>
			</div>
		</div>
	);
}

export default MainStockGraph;
