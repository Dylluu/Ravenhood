import { useHistory } from "react-router-dom";

const apikey = '3MO65OQ6CPMMNJTQ';
const apikeyStockInfo = ['LHU9QYGE8G6XZO0T', '03A3G6JU0R69U3TN'];

export async function getStonks(range, ticker) {
	let rangeFunction, apiKey;
	let outputsize = '';
	let interval = '';
	switch (range) {
		case '1w':
			rangeFunction = 'TIME_SERIES_INTRADAY';
			apiKey = apikey;
			outputsize = '&outputsize=full';
			interval = '&interval=15min';
			break;
		case '1m':
			rangeFunction = 'TIME_SERIES_INTRADAY';
			interval = '&interval=60min';
			apiKey = apikey;
			break;
		case '3m':
			rangeFunction = 'TIME_SERIES_DAILY_ADJUSTED';
			outputsize = '&outputsize=compact';
			apiKey = apikey;
			break;
		case '1y':
			rangeFunction = 'TIME_SERIES_DAILY_ADJUSTED';
			outputsize = '&outputsize=full';
			apiKey = apikey;
			break;
		case '5y':
			rangeFunction = 'TIME_SERIES_WEEKLY';
			apiKey = apikey;
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

// get Stock Volumne per day
export async function getStockVolume(ticker) {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	const data = await response.json();
	let volume
	try {
		volume = data.chart.result[0].indicators.quote[0].volume.reduce(
			(a, b) => a + b,
			0
		);
	} catch (TypeError) {
		window.location.replace('error/badStock')
	}
	const openPrice = data.chart.result[0].indicators.quote[0].open[0];
	return [volume, openPrice];
}
// Get Company Overview function
export async function GetCompanyOverview(ticker) {
	const baseURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apikey}`;
	const response = await fetch(baseURL);
	return response.json();
}

//Get Today Company News
export async function getTodayCompanyNews(ticker) {
	let todayDate = new Date();
	todayDate.setDate(todayDate.getDate() - 1);
	todayDate = todayDate.toISOString().split('T')[0];
	const baseURL = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${todayDate}&to=${todayDate}&token=cdqn3niad3ifho9o8em0cdqn3niad3ifho9o8emg`;
	const response = await fetch(baseURL);
	return response.json();
}

export async function getTodayNews(ticker) {
	const baseURL = `https://finnhub.io/api/v1/news?category=general&token=cdqn3niad3ifho9o8em0cdqn3niad3ifho9o8emg`;
	const response = await fetch(baseURL);
	return response.json();
}

async function getStonk(ticker) {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	return response.json();
}

export async function getPortfolioPerformancedifference(portfolio) {
	const ownedStock = Object.keys(portfolio);

	const ownedStockData = await Promise.all(
		ownedStock.map(async (ticker) => await getStonk(ticker))
	);

	const dataLength = ownedStockData[0].chart.result[0].timestamp;
	const TradingPeriodStartTime =
		ownedStockData[0].chart.result[0].meta.tradingPeriods[0][0].start;
	const TradingPeriodEndTime =
		ownedStockData[0].chart.result[0].meta.tradingPeriods[0][0].end;
	const portfolioArr = [];
	for (let i = 0; i <= dataLength.length - 1; i++) {
		let PortfolioTotal = 0;
		ownedStockData.forEach((stock) => {
			const key = stock.chart.result[0].meta.symbol;
			const price =
				stock.chart.result[0].indicators.quote[0].close[i] * portfolio[key];
			PortfolioTotal += price;
		});
		portfolioArr[i] = PortfolioTotal;
	}
	return {
		portfolioArr,
		dataLength,
		TradingPeriodStartTime,
		TradingPeriodEndTime
	};
}
