import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import testBird from '../../assets/testbird.png';
import {
	thunkGetAllStocks,
	thunkGetOneWatchlist,
	thunkGetAllWatchlist
} from '../../store/watchlist';
import SmallStockGraph from '../SmallStockGraph';

function WatchlistExpand({ list, id }) {
	const history = useHistory()
	const dispatch = useDispatch();
	const [expand, setExpand] = useState(true);
	const [menu, setMenu] = useState(false);
	const user_id = useSelector((state) => state.session.user.id);
	const watchlist = useSelector((state) => state.watchlist);
	useEffect(
		() => {
			// dispatch(thunkGetAllWatchlist(user_id))
			dispatch(thunkGetOneWatchlist(id));
			dispatch(thunkGetAllStocks(id));
		},
		[dispatch],
		expand
	);

	let stocks;
	let lists;
	if (watchlist.allStocks) {
		stocks = Object.values(watchlist.allStocks);
	}
	if (watchlist.oneWatchlists) {
		lists = Object.values(watchlist.oneWatchlists);
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
					<div className='watchlist-picture-and-navlink'>
					<NavLink
						to={`/watchlists/${list.id}`}
						exact={true}
						className="watchlist-navlink"
					>
					<img class="watchlist-picture" src={testBird} />
						{list.name}
					</NavLink>
					</div>
					{stocks &&<button
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
						{/* there might be an error related to allStocks state */}
						{stocks && stocks.map((stock) => {
							if (parseInt(stock.watchlist_id) === parseInt(id)) {
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
							}
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default WatchlistExpand;
