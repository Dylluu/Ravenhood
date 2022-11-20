import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import useStockPriceContext from '../../context/stockCurrentPrice';

async function getStonk() {
	const response = await fetch(`https://yahoo-finance-api.vercel.app/TSLA`);
	return response.json();
}

function PortfolioNoStockGraph({ setHoverPrice, setRangePeriod }) {
	const { setPortfolioWorth } = useStockPriceContext();
	const [openPriceData, setOpenPriceData] = useState({
		data: []
	});
	const [tradingPeriods, setTradingPeriods] = useState({});
	useEffect(() => {
		const getTradingPeriod = async () => {
			const data = await getStonk();
			const startTime = data.chart.result[0].meta.tradingPeriods[0][0].start;
			const endTime = data.chart.result[0].meta.tradingPeriods[0][0].end;
			setTradingPeriods({ startTime, endTime });
		};
		getTradingPeriod();
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
				y: 0
			};
			dashedData.push(data);
		}

		setOpenPriceData({ data: dashedData });
		setPortfolioWorth(0);
	}, [tradingPeriods]);

	if (!openPriceData.data.length) return null;
	return (
		<Chart
			options={{
				chart: {
					type: 'line',
					toolbar: {
						show: false
					},
					events: {
						mouseMove: function (event, chartContext, config) {
							const points = openPriceData.data[config.dataPointIndex]?.y;
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
				colors: ['#00c805', 'black'],
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
			series={[openPriceData, openPriceData]}
			type="line"
			width="100%"
			height="100%"
		/>
	);
}

export default PortfolioNoStockGraph;
