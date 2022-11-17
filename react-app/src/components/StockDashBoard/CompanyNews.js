import React, { useEffect, useState } from 'react';

function getPublishedHour(timestamp) {
	const publishTime = new Date(timestamp);
	const now = new Date();
	const hourAgo = now.getHours() - publishTime.getHours();
	return hourAgo + 'h';
}

function CompanyNews({ news }) {
	const shorttenSummary = news.summary.split(' ').slice(0, 50);
	const summary =
		shorttenSummary.length == 50
			? shorttenSummary.join(' ') + ' ...'
			: shorttenSummary.join(' ');
	return (
		<a href={news.url} target="_blank">
			<div className="company-news">
				<div className="news-left-col">
					<div className="news-sourse">
						{news.source}
						<p id="news-published-time">
							{getPublishedHour(news.datetime * 1000)}
						</p>
					</div>
					<div className="news-headline">{news.headline}</div>
					<div className="news-summary">{summary}</div>
				</div>
				<div className="news-right-col">
					{news.image && <img src={news.image} alt="Picture Unavailable" />}
				</div>
			</div>
		</a>
	);
}

export default CompanyNews;
