const apiKeys = '3MO65OQ6CPMMNJTQ';
const apiKeysStockInfo = ['LHU9QYGE8G6XZO0T', '03A3G6JU0R69U3TN'];

export async function getStonks(range, ticker) {
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
	const baseURl = `https://www.alphavantage.co/query?function=${rangeFunction}&symbol=${ticker}${outputsize}${interval}&apikey=${apiKey}`;
	const response = await fetch(baseURl);
	return response.json();
}

export const getRangePeriod = (range) => {
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

export async function getOneWeekStockData(ticker) {
	const data = await getStonks('1w', ticker);
	const stonk = data['Time Series (15min)'];
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
			new Date(date.split(' ')[0].replace(/-/g, '/')).getTime() >= checkDate &&
			time >= '09:30' &&
			time <= '16:00'
		);
	});
	const oneWeekData = oneWeekDates.map((date) => ({
		x: date,
		y: stonk[date]['4. close']
	}));

	return oneWeekData.reverse();
}

export async function GetThreeMonthsStockData(ticker) {
	const data = await getStonks('3m', ticker);
	const stonk = data['Time Series (Daily)'];
	const timeSeries = Object.keys(data['Time Series (Daily)']);
	const date = new Date(timeSeries[0].replace(/-/g, '/'));
	const threeMonth = date.setMonth(date.getMonth() - 3);

	// filter everyday for the last 3 months
	const threeMonthDate = timeSeries.filter(
		(date) => new Date(date.replace(/-/g, '/')).getTime() >= threeMonth
	);
	const prices = threeMonthDate.map((date) => ({
		x: date,
		y: stonk[date]['4. close']
	}));

	return prices.reverse();
}

export async function getOneYearStockData(ticker) {
	const data = await getStonks('1y', ticker);
	const stonk = data['Time Series (Daily)'];
	const oneYearSeries = Object.keys(stonk);
	const one = new Date(oneYearSeries[0].replace(/-/g, '/'));
	const OneYearLater = one.setFullYear(one.getFullYear() - 1);
	const oneYearDate = oneYearSeries.filter(
		(date) => new Date(date.replace(/-/g, '/')).getTime() >= OneYearLater
	);
	const oneYearPrices = oneYearDate.map((date) => ({
		x: date,
		y: stonk[date]['4. close']
	}));

	return oneYearPrices.reverse();
}

export async function getFiveYearStockData(ticker) {
	const data = await getStonks('5y', ticker);
	const stonk = data['Weekly Time Series'];
	const fiveYearSeries = Object.keys(stonk);
	const five = new Date(fiveYearSeries[0].replace(/-/g, '/'));
	const fiveYearTime = five.setFullYear(five.getFullYear() - 5);
	const fiveYearDate = fiveYearSeries.filter(
		(date) => new Date(date.replace(/-/g, '/')).getTime() >= fiveYearTime
	);
	const fiveYearPrices = fiveYearDate.map((date) => ({
		x: date,
		y: stonk[date]['4. close']
	}));
	return fiveYearPrices.reverse();
}

// get lattest price of Stock base on ticker
export async function getStockLattestPrice(ticker) {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	const data = await response.json();
	const stonk = data.chart.result[0];
	const price = stonk.meta.regularMarketPrice.toFixed(2);
	return price;
}
