import React, { useEffect, useState } from 'react';

function numberFormat(labelValue) {
	// Nine Zeroes for Billions
	return Math.abs(Number(labelValue)) >= 1.0e12
		? (Math.abs(Number(labelValue)) / 1.0e12).toFixed(2) + 'T'
		: Math.abs(Number(labelValue)) >= 1.0e9
		? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
		: // Six Zeroes for Millions
		Math.abs(Number(labelValue)) >= 1.0e6
		? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
		: // Three Zeroes for Thousands
		Math.abs(Number(labelValue)) >= 1.0e3
		? Math.abs(Number(labelValue)) / 1.0e3 + ' thousands'
		: Math.abs(Number(labelValue));
}
function KeyStatistics({ companyOverview, stockInfo }) {
	let dividend = (Number(companyOverview.DividendYield) * 100).toFixed(2);

	return (
		<div id="statistics-wrapper">
			<div className="company-statistic-info-box">
				<div className="company-statistic-info-title">Market cap</div>
				<div className="company-statistic-info-body">
					{numberFormat(companyOverview.MarketCapitalization)}
				</div>
			</div>
			<div className="company-statistic-info-box">
				<div className="company-statistic-info-title">Price-Earnings ratio</div>
				<div className="company-statistic-info-body">
					{companyOverview.TrailingPE}
				</div>
			</div>
			<div className="company-statistic-info-box">
				<div className="company-statistic-info-title">Dividend yield</div>
				<div className="company-statistic-info-body">
					{dividend == 0 ? '--' : dividend}
				</div>
			</div>
			<div className="company-statistic-info-box">
				<div className="company-statistic-info-title">Open price</div>
				<div className="company-statistic-info-body">
					${stockInfo[1].toFixed(2)}
				</div>
			</div>
			<div className="company-statistic-info-box">
				<div className="company-statistic-info-title">Volume</div>
				<div className="company-statistic-info-body">
					{numberFormat(stockInfo[0])}
				</div>
			</div>
			<div className="company-statistic-info-box">
				<div className="company-statistic-info-title">52 Week high</div>
				<div className="company-statistic-info-body">
					${companyOverview['52WeekHigh']}
				</div>
			</div>
			<div className="company-statistic-info-box">
				<div className="company-statistic-info-title">52 Week low</div>
				<div className="company-statistic-info-body">
					${companyOverview['52WeekLow']}
				</div>
			</div>
		</div>
	);
}

export default KeyStatistics;
