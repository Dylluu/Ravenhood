import React from 'react';
import MainStockGraph from '../MainStockGraph';
import './StockDashBoard.css';
import { useParams } from 'react-router-dom';
import WatchlistAddList from '../WatchlistAddList';
function StockDashBoard() {
	const {ticker} = useParams();
	return (
		<div className="stock-dashboard-wrapper">
			<div className="stock-dashboard-inner-wrapper">
				<div className="stock-dashboard-inner-left">
					<div className="stock-dashboard-graph-wrapper">
						<MainStockGraph />
					</div>
					<div className="stock-dashboard-inner-left-borders"></div>
				</div>
				<div className='stock-dashboard-right-wrapper'>
					<div className="stock-dashboard-buy-sell-wrapper"></div>
					<WatchlistAddList symbol = {ticker}/>
				</div>

			</div>

		</div>
	);
}

export default StockDashBoard;
