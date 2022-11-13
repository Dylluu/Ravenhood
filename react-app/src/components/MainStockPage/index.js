import React from 'react';
import { useParams } from 'react-router-dom';
import MainStockGraph from '../MainStockGraph';
import './MainStockPage.css';

function MainStockPage() {
	const { ticker } = useParams();
	return (
		<div className="main-stock-page-wrapper">
			<div className="graph-wrapper">
				<MainStockGraph ticker={ticker} />
				<h1>hello</h1>
			</div>
		</div>
	);
}

export default MainStockPage;
