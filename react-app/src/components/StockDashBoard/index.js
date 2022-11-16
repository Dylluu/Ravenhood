import React, { useEffect, useState } from 'react';
import MainStockGraph from '../MainStockGraph';
import './StockDashBoard.css';
import { useParams } from 'react-router-dom';
import WatchlistAddList from '../WatchlistAddList';
import { GetComparyOverview } from '../../utils/fetchStockFunctions';

function StockDashBoard() {
	const { ticker } = useParams();
	const [companyOverview, setCompanyOverview] = useState(null);
	// useEffect(() => {
	// 	const companyInfo = GetComparyOverview(ticker);
	// 	setCompanyOverview(companyInfo);
	// }, []);

	// useEffect(() => {
	// 	console.log(companyOverview);
	// }, [companyOverview]);

	return (
		<div className="stock-dashboard-wrapper">
			<div className="stock-dashboard-inner-wrapper">
				<div className="stock-dashboard-inner-left">
					<div className="stock-dashboard-graph-wrapper">
						<MainStockGraph />
					</div>
					<div className="stock-dashboard-inner-left-borders">asdfsd</div>
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
