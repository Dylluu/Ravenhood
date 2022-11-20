

import React from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css';
import {
	thunkGetAllWatchlist,
	thunkGetOneWatchlist,
	thunkGetAllStocks,
	thunkDeleteStocks,
	thunkDeleteWatchlist,
	thunkPostWatchlist
} from '../../store/watchlist';
import testBird from '../../assets/testbird.png';
import { Modal } from '../../context/Modal';
import Options from './options-menu';
import WatchlistForm from './watchlistForm';
import WatchlistUpdate from './watchlistUpdate';
import { TickerSymbols } from '../../utils/stocksSymbols';
import SmallStockGraph from '../SmallStockGraph';
function Watchlist() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [options, setOptions] = useState(false);
	const [add, setAdd] = useState(false);
	const { watchlistId } = useParams();
	const watchlist = useSelector((state) => state.watchlist);
	const currWatchlist = useSelector((state) => state.watchlist.oneWatchlist?.name)
	const user_id = useSelector((state) => state.session.user.id);
	let stocks;
	let lists;
	let count;

	useEffect(
		() => {
			dispatch(thunkGetAllWatchlist(user_id));
			dispatch(thunkGetOneWatchlist(watchlistId));
			dispatch(thunkGetAllStocks(watchlistId));
		},
		[dispatch, watchlistId],
		watchlistId
	);

	if (watchlist.allStocks) {
		stocks = Object.values(watchlist.allStocks);
	}
	if (watchlist.allWatchlists) {
		lists = Object.values(watchlist.allWatchlists);
	}

	const deleteWatchlist = async (list) => {
		await dispatch(thunkDeleteWatchlist(list.id));
		await dispatch(thunkGetAllWatchlist(user_id));
		history.push(`/watchlists/5`);
	};

	const deleteStock = async (stock) => {
		await dispatch(thunkDeleteStocks(stock));
		await dispatch(thunkGetAllStocks(watchlistId));
		// history.push(`/watchlists/${watchlistId}`);
	};

	return (
		<div className='watchlist-main-container-wrapper'>
			<div className="main-container">
				<div className="watchlist">
					<div className="picture-holder">
						<img className="picture" src={testBird} />
					</div>
					<div className="watchlist-title">
						{currWatchlist}
					</div>
					<div className="item-count">
						{stocks && watchlist.allStocks ? (
							<p>
								{' '}
								{
									stocks.filter((stock) => {
										return stock.watchlist_id == watchlistId;
									}).length
								}{' '}
								items
							</p>
						) : (
							'nope'
						)}
					</div>
					<div className="watchlist-table">
						<div className="watchlist-header">
							<div className="name-column"
								id='name-column-title'
							>Name</div>
							<div className="symbol-column"
								id='symbol-colu'
							>Symbol</div>
							<div className="price-column">Price</div>
							<div className="today-column">Today</div>
						</div>

						{/* <!-- this section gets for looped to include all stocks in watchlist --> */}
						{stocks &&
							stocks.map((stock) => {
								// eventually put name-column/symbol column in a navlink together
								if (parseInt(stock.watchlist_id) === parseInt(watchlistId)) {
									return (
										<div className="watchlist-data"
											onClick={() => history.push(`/stocks/${stock.symbol}`)}
										>
											<div className="name-column"
												id='name-column'
											>
												{TickerSymbols[stock.symbol].name}
											</div>
											{/* <div>{stock.watchlist_id} </div> */}
											{/* <div> {stock.watchlist_id === watchlistId ? watchlistId :''}  </div> */}
											<div class="symbol-column"
												id='symbol-column'
											>{stock.symbol}</div>
											<SmallStockGraph ticker={stock.symbol} graph={false} />
											{stock.watchlist_id !== 5 &&<button
												class="delete-button"
												onClick={(e) =>{
													e.stopPropagation()
													deleteStock(stock)
												}}
											>
												<i class="fa-solid fa-xmark" />
											</button>}
										</div>
									);
								}
							})}
						{/* <!-- button will delete the stock from the watchlist --> */}
					</div>
				</div>
				<div className="dashboard-watchlists-wrapper"
					id='watchlist-page-watchlist'
				>
					<div className="watchlists-header-wrapper">
						<div className="watchlists-header-dashboard">
							<div className='watchlist-header-title'>Lists</div>
							<button
								className="watchlist-add-button"
								onClick={() => {
									add == false ? setAdd(true) : setAdd(false);
								}}
							>
								+
							</button>
						</div>
					</div>
					{add && (
						<div>
							<WatchlistForm add={add} setAdd={setAdd} />
						</div>
					)}
					{lists &&
						lists.map((list) => (
							<div className='watchlist-list-row'
								id='watchlist-list-row'
							>
								<Options
									list={list}
									deleteWatchlist={deleteWatchlist}
									id={list.id}
								/>
							</div>
						))}
					{/* temporary stuff */}

					{/* <div>
            <form onSubmit={submitHandler}>
            <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
            <button type="submit">Add List</button>
            </form>
          </div> */}
					{/* <!-- this section will be looped to create different lists  --> */}
				</div>
			</div>
		</div>
	);
}

export default Watchlist;
