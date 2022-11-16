import React from 'react';
import { NavLink } from 'react-router-dom';
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
		<div className="watchlist-list-body">
			<div>
				<div className="watchlist-list">
					<img class="watchlist-picture" src={testBird} />
					<NavLink
						to={`/watchlists/${list.id}`}
						exact={true}
						className="watchlist-navlink"
					>
						{list.name}
					</NavLink>
					<button
						class="watchlist-expand-button"
						onClick={() => {
							expand == false ? setExpand(true) : setExpand(false);
						}}
					>
						{expand == false ? 'v' : '^'}
					</button>
				</div>
				{expand && (
					<div>
						{/* there might be an error related to allStocks state */}
						{stocks.map((stock) => {
							if (parseInt(stock.watchlist_id) === parseInt(id)) {
								return (
									<div className="watchlist-stocks-body">
										<div id="expand-watchlist-symbol"> {stock.symbol}</div>
										<SmallStockGraph ticker={stock.symbol} graph={true} />
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
