import React, { useEffect, useState } from 'react';
import MainStockGraph from '../MainStockGraph';
import './StockDashBoard.css';
import { useParams } from 'react-router-dom';
import WatchlistAddList from '../WatchlistAddList';
import {
	GetCompanyOverview,
	getStockVolume,
	getTodayCompanyNews,
	getPortfolioPerformancedifference
} from '../../utils/fetchStockFunctions';
import KeyStatistics from './KeyStatistics';
import CompanyNews from './CompanyNews';
import Transactions from '../Transaction';

function StockDashBoard() {
	const { ticker } = useParams();
	const [companyOverview, setCompanyOverview] = useState(null);
	const [stockInfo, setStockInfo] = useState(null);
	const [companyNews, setCompanyNews] = useState(null);

	useEffect(() => {
		const companyInfo = async () => {
			const companyInfo = await GetCompanyOverview(ticker);
			const stockInfo = await getStockVolume(ticker);
			const companynews = await getTodayCompanyNews(ticker);
			setCompanyNews(companynews);
			setStockInfo(stockInfo);
			setCompanyOverview(companyInfo);
		};
		companyInfo();
	}, []);

	let fiveNewsMax;
	if (companyNews) {
		fiveNewsMax =
			companyNews.length > 5 ? companyNews.slice(0, 5) : companyNews;
	}
	if (!companyOverview) return null;

	return (
		<div className="stock-dashboard-wrapper">
			<div className="stock-dashboard-inner-wrapper">
				<div className="stock-dashboard-inner-left">
					<div id="Company-name">{companyOverview.Name}</div>
					<div className="stock-dashboard-graph-wrapper">
						<MainStockGraph />
					</div>
					<div className="stock-dashboard-inner-left-borders">
						<div className="stock-holding-wrapper"></div>
						<div className="section-title"
						id='about'
						>About</div>
						<div id="company-description">{companyOverview.Description}</div>
						<div className="section-title">Key statistics</div>
						<KeyStatistics
							stockInfo={stockInfo}
							companyOverview={companyOverview}
						/>
						<div className="section-title">News</div>
						<div className="company-news-wrapper">
							{fiveNewsMax?.map((eachNews) => (
								<CompanyNews news={eachNews} />
							))}
						</div>
					</div>
				</div>
				<div className="stock-dashboard-right-wrapper">
					<Transactions />
					<WatchlistAddList symbol={ticker} />
				</div>
			</div>
		</div>
	);
}

export default StockDashBoard;
