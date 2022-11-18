import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import testBird from '../../assets/testbird.png';
import { thunkGetWholePortfolio } from '../../store/portfolio';
import SmallStockGraph from '../SmallStockGraph';

function PortfolioExpand({ port, id }) {
	const history = useHistory()
	const dispatch = useDispatch();
	const [expand, setExpand] = useState(true);
	const [menu, setMenu] = useState(false);
	const user_id = useSelector((state) => state.session.user.id);
	const portfolio = useSelector((state) => state.portfolio);
	useEffect(
		() => {
			dispatch(thunkGetWholePortfolio)
		},
		[dispatch],
		expand
	);

	let ports

	if (portfolio.userPortfolio) {
		ports = Object.values(portfolio.userPortfolio)
	}

	return (
		<div className="watchlist-list-body"
		id='watch-list-body-expand'
		>
			<div>
				<div className='watchlist-list-wrapper'
				onClick={() => setExpand(!expand)}
				>
				<div className="watchlist-list">
					<div className='watchlist-picture-and-navlink'
					id='watchlist-pic-and-navlink-for-portfolio'
					>
					<div
						className="watchlist-navlink"
						id='watchlist-pic-and-navlink-for-portfolio'
					>
					<img class="watchlist-picture" src={testBird} />
						My Portfolio
					</div>
					</div>
					{port &&<button
						class="watchlist-expand-button"
						onClick={() => {
							expand == false ? setExpand(true) : setExpand(false);
						}}
					>
						{expand == false ? (<i id='chevron-down' className="fa-solid fa-chevron-up" />) : (<i className="fa-solid fa-chevron-up" id='chevron-up'/>)}
					</button>}
				</div>
				</div>
				{expand && (
					<div>
						{ports && ports.map((stock) => {
								return (
									<div className='watchlist-stocks-body-wrapper'
									onClick={() => {
										history.push(`/stocks/${stock.symbol}`)
										// history.go(0)
									}}
									>
									<div className="watchlist-stocks-body">
										<div id="expand-watchlist-symbol"> {stock.symbol}</div>
										<SmallStockGraph ticker={stock.symbol} graph={true} />
									</div>
									</div>
								);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default PortfolioExpand;
