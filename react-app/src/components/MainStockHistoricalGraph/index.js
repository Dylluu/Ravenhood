import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';

const apiKeys = ['3MO65OQ6CPMMNJTQ', '39IUG3VMDLMFIEX0', '4GDMAT3E0KC2FFZU'];
const apiKeysStockInfo = ['LHU9QYGE8G6XZO0T', '03A3G6JU0R69U3TN'];

async function getStonks(range, ticker) {
	let rangeFunction = '';
	let apiKey = '';
	switch (range) {
		case 'daily':
			rangeFunction = 'TIME_SERIES_DAILY_ADJUSTED';
			apiKey = apiKeys[0];
			break;
		case 'weekly':
			rangeFunction = 'TIME_SERIES_WEEKLY';
			apiKey = apiKeys[1];
			break;
		case 'monthly':
			rangeFunction = 'TIME_SERIES_MONTHLY';
			apiKey = apiKeys[2];
	}
	const response = await fetch(
		`https://www.alphavantage.co/query?function=${rangeFunction}&symbol=${ticker}&apikey=${apiKey}`
	);
	return response.json();
}

function MainStockHistoricalGraph() {
	const [stockData, setStockData] = useState(null);
	useEffect(() => {
		async function getStockHistoricalData() {
			const data = await getStonks('daily', 'AMZN');
			console.log(data);
			setStockData(data);
		}
		getStockHistoricalData();
	}, []);

	return <div id="chart-historical">hello</div>;
}

export default MainStockHistoricalGraph;
