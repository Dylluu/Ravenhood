import React, { useEffect, useState } from 'react';
import MainStockGraph from '../MainStockGraph';
import './StockDashBoard.css';
import { useParams } from 'react-router-dom';
import WatchlistAddList from '../WatchlistAddList';
import {
	GetCompanyOverview,
	getStockVolume,
	getTodayCompanyNews
} from '../../utils/fetchStockFunctions';
import KeyStatistics from './KeyStatistics';
import CompanyNews from './CompanyNews';

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
						<div className="section-title">About</div>
						<div id="company-description">{companyOverview.Description}</div>
						<div className="section-title">Key statistics</div>
						<KeyStatistics
							stockInfo={stockInfo}
							companyOverview={companyOverview}
						/>
						<div className="section-title">News</div>
						<CompanyNews />
					</div>
				</div>
				<div className="stock-dashboard-right-wrapper">
					{/* <div className="stock-dashboard-buy-sell-wrapper">sdfsd</div> */}
					<WatchlistAddList symbol={ticker} />
				</div>
			</div>
		</div>
	);
}

export default StockDashBoard;
