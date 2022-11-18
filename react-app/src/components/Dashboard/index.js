import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import testBird from '../../assets/testbird.png';
import WatchlistExpand from './watchlist-expand';
import WatchlistForm from '../Watchlist/watchlistForm';
import { thunkAddBuyPower } from '../../store/session';
import {
	thunkGetAllStocks,
	thunkGetAllWatchlist,
	thunkGetOneWatchlist,
	thunkDeleteWatchlist
} from '../../store/watchlist';
import { thunkGetWholePortfolio } from '../../store/portfolio';
import { getTodayNews } from '../../utils/fetchStockFunctions';
import CompanyNews from '../StockDashBoard/CompanyNews';

function Dashboard() {
	const [buy_power, setBuyPower] = useState('');
	const [buyPowerOpen, setBuyPowerOpen] = useState(false);
	const [todayNews, setTodayNews] = useState([]);
	const user = useSelector((state) => state.session.user);
	function thousandsSeparator(value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	const dispatch = useDispatch();
	const [add, setAdd] = useState(false);
	const user_id = useSelector((state) => state.session.user.id);
	const watchlist = useSelector((state) => state.watchlist);
	let lists;

	useEffect(() => {
		dispatch(thunkGetAllWatchlist(user_id));
		dispatch(thunkGetWholePortfolio(user_id));
	}, [dispatch]);

	useEffect(() => {
		const news = async () => {
			try {
				const todayNews = await getTodayNews();
				setTodayNews(todayNews);
			} catch {
				setTodayNews([]);
			}
		};
		news();
	}, []);

	if (watchlist.allWatchlists) {
		lists = Object.values(watchlist.allWatchlists);
	}

	// useEffect(() => {window.addEventListener('scroll', () => {
	//         const dashboardWatchlist = document.getElementsByClassName('dashboard-watchlists-wrapper');
	//         if(dashboardWatchlist[0]) {
	//             dashboardWatchlist[0].style.marginTop = `${window.scrollY}px`
	//         }
	//     })
	// }, [window.scrollY])

	const addBuyPower = async (e) => {
		e.preventDefault();
		const data = await dispatch(thunkAddBuyPower(buy_power));
	};

	let maxNews, BloombergNews;
	if (todayNews.length) {
		maxNews = todayNews.filter((news) => news.source !== 'Bloomberg');
		BloombergNews = todayNews.filter((news) => news.source == 'Bloomberg');
	}

	if (!todayNews.length) return null;
	return (
		<div className="dashboard-wrapper">
			<div className="dashboard-inner-wrapper">
				<div className="dashboard-inner-left">
					<div className="dashboard-graph-wrapper"></div>
					<div className="buying-power-wrapper">
						<div className="buy-power-div">
							<span id="buying-power">Buying Power</span>
							<span id="buying-power-amount">
								${thousandsSeparator(user.buy_power)}
							</span>
						</div>
					</div>
					<div className="dashboard-inner-left-borders">
						<div className="section-title">News</div>
						<div className="company-news-wrapper">
							{maxNews?.map((eachNews) => (
								<CompanyNews news={eachNews} />
							))}
							{BloombergNews?.map((eachNews) => (
								<CompanyNews news={eachNews} />
							))}
						</div>
					</div>
				</div>
				<div className="dashboard-watchlists-wrapper">
					<div
						className="watchlists-header-wrapper"
						id="watchlists-header-wrapper-for-stocks"
					>
						<div
							className="watchlists-header-dashboard"
							id="watchlists-header-dashboard-for-stocks"
						>
							<div
								className="watchlist-header-title"
								id="watchlist-header-title-for-stocks"
							>
								Stocks
							</div>
						</div>
					</div>
					<div className="watchlists-header-wrapper">
						<div className="watchlists-header-dashboard">
							<div className="watchlist-header-title">Lists</div>
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
					<div className="watchlist-list-body-wrapper">
						<div className="watchlist-list-body">
							{lists &&
								lists.map((list) => (
									<div className="watchlist-list-row">
										<WatchlistExpand list={list} id={list.id} />
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
