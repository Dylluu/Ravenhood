import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import testBird from '../../assets/testbird.png'
import WatchlistExpand from './watchlist-expand'
import WatchlistForm from '../Watchlist/watchlistForm';
import { thunkGetAllStocks, thunkGetAllWatchlist, thunkGetOneWatchlist } from '../../store/watchlist';

function Dashboard () {
    const dispatch = useDispatch()
    const [add, setAdd] = useState(false)
    const user_id = useSelector(state => state.session.user.id)
    const watchlist = useSelector(state => state.watchlist)
    let lists

    useEffect(() => {
        dispatch(thunkGetAllWatchlist(user_id))
    }, [dispatch])

    if (watchlist.allWatchlists) {
        lists = Object.values(watchlist.allWatchlists)
      }
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-inner-wrapper'>
                <div className='dashboard-inner-left'>
                <div className='dashboard-graph-wrapper'></div>
                <div className='buying-power-wrapper'>
                    <div className='buy-power-div'>
                        <span id='buying-power'>Buying Power</span>
                        <span id='buying-power-amount'>$0.00</span>
                    </div>
                </div>
                    <div className='dashboard-inner-left-borders'></div>
                </div>
                <div className='dashboard-watchlists-wrapper'>
                    <div className='watchlists-header-dashboard'>
                        <div className='watchlist-header-title'>Lists</div>
                        <button className='watchlist-add-button' onClick={() => {
                            add == false ? setAdd(true): setAdd(false)
                        }}>+</button>
                    </div>
                    {add && <div>
                        <WatchlistForm add = {add} setAdd= {setAdd}/>
                    </div>}
                    <div className='watchlist-list-body'>
                        {lists && lists.map(list => (
                            <WatchlistExpand list = {list} id = {list.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
