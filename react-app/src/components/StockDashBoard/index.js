import React from 'react';
import MainStockGraph from '../MainStockGraph';
import './StockDashBoard.css';
function StockDashBoard() {
	return (
		<div className="stock-dashboard-wrapper">
			<div className="stock-dashboard-inner-wrapper">
				<div className="stock-dashboard-inner-left">
					<div className="stock-dashboard-graph-wrapper">
						<MainStockGraph />
					</div>
					<div className="stock-dashboard-inner-left-borders">sdfasdfasd</div>
				</div>
				<div className="stock-dashboard-buy-sell-wrapper"></div>
			</div>
		</div>
	);
}

export default StockDashBoard;
