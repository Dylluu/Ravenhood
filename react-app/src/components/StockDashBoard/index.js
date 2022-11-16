import React from 'react';

function StockDashBoard() {
	return (
		<div className="dashboard-wrapper">
			<div className="dashboard-inner-wrapper">
				<div className="dashboard-inner-left">
					<div className="dashboard-graph-wrapper"></div>

					<div className="dashboard-inner-left-borders"></div>
				</div>
				<div className="dashboard-watchlists-wrapper">
					<div className="watchlists-header-dashboard"></div>

					<div className="watchlist-list-body"></div>
				</div>
			</div>
		</div>
	);
}

export default StockDashBoard;
