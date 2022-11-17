import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import './MainStockHistoricalGraph.css';
import * as stockFunctions from '../../utils/fetchStockFunctions';
import * as stockActions from '../../store/stocks';
import useSiteColorContext from '../../context/SiteColor';
import { useDispatch, useSelector } from 'react-redux';

const getRangePeriod = (range) => {
	switch (range) {
		case '1w':
			return 'past week';
		case '3m':
			return 'past 3 months';
		case '1y':
			return 'past year';
		case '5y':
			return 'past 5 years';
	}
};
function MainStockHistoricalGraph({ setHoverPrice, range, hoverPrice }) {
	const { ticker } = useParams();
	const dispatch = useDispatch();
	const { setSiteColor } = useSiteColorContext();
	const stockData = useSelector((state) => state.stockData);
	const [series, setSeries] = useState([
		{
			data: []
		}
	]);
	const [chartColor, setChartColor] = useState(['#00c805']);
	const [priceColor, setPriceColor] = useState('#00c805');
	const [type, setType] = useState('datetime');
	const [APILimit, setAPILimit] = useState(false);
	const [startPrice, setStartPrice] = useState(-1);
	const [endPrice, setEndPrice] = useState(-1);
	const [rangePeriod, setRangePeriod] = useState(getRangePeriod(range));

	// set color depending on the current price
	const currPrice = hoverPrice ? hoverPrice : endPrice;
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

	//Fetching for stocks
	useEffect(() => {
		async function getStockHistoricalData() {
			let data;
			try {
				switch (range) {
					case '1w':
						setType('numeric');
						if (stockData.oneWeek.length) {
							data = stockData.oneWeek;
							break;
						}
						data = await stockFunctions.getOneWeekStockData(ticker);
						await dispatch(stockActions.loadOneWeek(data));
						break;
					case '3m':
						setType('datetime');
						if (stockData.threeMonths.length) {
							data = stockData.threeMonths;
							break;
						}
						data = await stockFunctions.GetThreeMonthsStockData(ticker);
						await dispatch(stockActions.loadThreeMonths(data));
						break;
					case '1y':
						setType('datetime');
						if (stockData.oneYear.length) {
							data = stockData.oneYear;
							break;
						}
						data = await stockFunctions.getOneYearStockData(ticker);
						await dispatch(stockActions.loadOneYear(data));
						break;
					case '5y':
						setType('datetime');
						if (stockData.fiveYear.length) {
							data = stockData.fiveYear;
							break;
						}
						data = await stockFunctions.getFiveYearStockData(ticker);
						await dispatch(stockActions.loadFiveYear(data));
						break;
				}
				setSeries([{ data }]);
			} catch {
				setAPILimit(true);
			}
		}
		getStockHistoricalData();
	}, [range]);

	//Setting chart color
	useEffect(() => {
		// set data color
		if (series[0].data.length) {
			const startPrice = series[0].data[0].y;
			const endPrice = series[0].data[series[0].data.length - 1].y;
			setStartPrice(startPrice);
			setEndPrice(endPrice);
			if (startPrice - endPrice < 0) {
				setChartColor(['#00c805', 'black']);
				setSiteColor('green');
			} else {
				setChartColor(['#ff5404', 'black']);
				setSiteColor('red');
			}
		}
	}, [series, rangePeriod]);

	//loading screen in api keys ran out
	if (APILimit)
		return (
			<div className="graph-loading-screen">
				OOPS WE BROKE AND ONLY GOT 5 api request/minute
			</div>
		);

	//graph loading screen
	if (!series[0].data.length)
		return <div className="graph-loading-screen">Loading...</div>;

	return (
		<div id="chart-historical">
			<div className="percentDifference" style={{ color: priceColor }}>
				<p>
					${priceDifference} ({percentDifference}%){' '}
				</p>
				<p style={{ color: 'gray', paddingLeft: '1rem' }}>{rangePeriod}</p>
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
									if (config.dataPointIndex != -1) {
										const points = series[0].data[config.dataPointIndex]?.y;
										setHoverPrice(Number(points).toFixed(2));
										setRangePeriod('');
									}
								},
								mouseLeave: function () {
									setHoverPrice(null);
									setRangePeriod(getRangePeriod(range));
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
								offsetY: -220,
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
		</div>
	);
}

export default MainStockHistoricalGraph;
