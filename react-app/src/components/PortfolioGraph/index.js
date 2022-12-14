import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import './PortfolioGraph.css';
import { thunkGetWholePortfolio } from '../../store/portfolio';
import { getPortfolioPerformancedifference } from '../../utils/fetchStockFunctions';
import useSiteColorContext from '../../context/SiteColor';
import useStockPriceContext from '../../context/stockCurrentPrice';
import PortfolioNoStockGraph from '../PortfolioNoStockGraph';

function PortfolioGraph({ portfolio }) {
	const { setSiteColor } = useSiteColorContext();
	const { setPortfolioWorth } = useStockPriceContext();
	const user_buypower = useSelector((state) => state.session.user.buy_power);
	const [portfolioValue, setPortfolioValue] = useState(null);
	const [stockOwned, setStockOwned] = useState(null);

	// Data variables
	const [series, setSeries] = useState({
		data: []
	});

	const [openPriceData, setOpenPriceData] = useState({
		data: []
	});

	// Price variables
	const [price, setPrice] = useState(0);
	const [startPrice, setStartPrice] = useState(null);
	const [hoverPrice, setHoverPrice] = useState(null);

	// chart and price display color variables
	const [chartColor, setChartColor] = useState(['#00c805']);
	const [priceColor, setPriceColor] = useState('#00c805');

	// trading period variable for graphing full day
	const [tradingPeriods, setTradingPeriods] = useState({});

	// Today Word
	const [rangePeriod, setRangePeriod] = useState('Today');

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
		const stockOwned = {};
		let portfolioValue;
		const portfolioArr = Object.values(portfolio);
		portfolioArr.forEach(
			(stock) => (stockOwned[stock.symbol] = stock.num_shares)
		);
		portfolioValue = portfolioArr.map((a) => a.num_shares * a.average_price);
		setStockOwned(stockOwned);
		setPortfolioValue(portfolioValue);
	}, [portfolio]);

	useEffect(() => {
		let timeoutId;
		const getCurrentStockValueData = async () => {
			try {
				const MarketValues = await getPortfolioPerformancedifference(
					stockOwned
				);
				setTradingPeriods({
					startTime: MarketValues.TradingPeriodStartTime,
					endTime: MarketValues.TradingPeriodEndTime
				});
				const portfolioCurrentValue = portfolioValue.reduce((a, b) => a + b);
				let data = [
					{
						x: new Date(MarketValues.dataLength[0] * 1000),
						y: portfolioCurrentValue
					}
				];
				for (let i = 1; i < MarketValues.dataLength.length; i++) {
					const timestamp = MarketValues.dataLength[i];
					const value = MarketValues.portfolioArr[i];
					data[i] = {
						x: new Date(timestamp * 1000),
						y: value
					};
				}
				const filterData = data.filter((timestamp) => timestamp.y !== 0);
				setSeries({ data: filterData });
				let currentPrice =
					MarketValues.portfolioArr[
						MarketValues.portfolioArr.length - 1
					].toFixed(2);
				setStartPrice(portfolioCurrentValue);
				setPortfolioWorth(filterData[filterData.length - 1].y.toFixed(2));
				setPrice(currentPrice);
				if (portfolioCurrentValue - currentPrice < 0) {
					setChartColor(['#00c805', 'black']);
					setSiteColor('green');
				} else {
					setChartColor(['#ff5404', 'black']);
					setSiteColor('red');
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (stockOwned && Object.values(stockOwned).length)
			getCurrentStockValueData();

		// return () => {
		// 	// console.log('cleaned');
		// 	clearTimeout(timeoutId);
		// };
	}, [stockOwned, portfolioValue]);

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
				y: startPrice
			};
			dashedData.push(data);
		}
		setOpenPriceData({ data: dashedData });
	}, [startPrice]);

	const show = Object.values(portfolio).length ? true : false;
	const makeItGreen = show ? priceColor : '#00c805';
	return (
		<div className="main-stock-page-wrapper">
			<div className="price">
				$
				{hoverPrice
					? parseFloat(hoverPrice + user_buypower).toLocaleString(undefined, {
							maximumFractionDigits: 2
					  })
					: parseFloat(parseFloat(price) + user_buypower).toLocaleString(
							undefined,
							{
								maximumFractionDigits: 2
							}
					  )}
			</div>
			<div className="graph-page-wrapper">
				<div id="chart">
					<div className="percentDifference" style={{ color: makeItGreen }}>
						<p>
							${priceDifference} (
							{isNaN(percentDifference) ? 0 : percentDifference}%)
						</p>
						<div className="range-period">{rangePeriod}</div>
					</div>
					<div className="graph-holder">
						{show && (
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
												setHoverPrice(Number(points?.toFixed(2)));
												setRangePeriod('');
											},
											mouseLeave: function () {
												setHoverPrice(null);
												setRangePeriod('Today');
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
											offsetY: -250,
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
						)}
						{!show && (
							<PortfolioNoStockGraph
								setHoverPrice={setHoverPrice}
								setRangePeriod={setRangePeriod}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PortfolioGraph;
