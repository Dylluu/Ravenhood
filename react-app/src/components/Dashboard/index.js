import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import testBird from '../../assets/testbird.png'
import WatchlistExpand from './watchlist-expand'
import WatchlistForm from '../Watchlist/watchlistForm';
import { thunkAddBuyPower } from '../../store/session';
import { thunkGetAllStocks, thunkGetAllWatchlist, thunkGetOneWatchlist, thunkDeleteWatchlist} from '../../store/watchlist';

function Dashboard () {

    const [buy_power, setBuyPower] = useState('');
    const [buyPowerOpen, setBuyPowerOpen] = useState(false);
    const user = useSelector(state => state.session.user);
    function thousandsSeparator (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
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

    useEffect(() => {window.addEventListener('scroll', () => {
            const dashboardWatchlist = document.getElementsByClassName('dashboard-watchlists-wrapper');
            dashboardWatchlist[0].style.marginTop = `${window.scrollY}px`
        })
    }, [window.scrollY])

    const addBuyPower = async (e) => {
        e.preventDefault();
        const data = await dispatch(thunkAddBuyPower(buy_power));
    }

    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-inner-wrapper'>
                <div className='dashboard-inner-left'>
                <div className='dashboard-graph-wrapper'></div>
                <div className='buying-power-wrapper'>
                    <div className='buy-power-div'>
                        <span id='buying-power'>Buying Power</span>
                        <span id='buying-power-amount'>${thousandsSeparator(user.buy_power)}</span>
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
                            <div className='watchlist-list-row'>
                                <WatchlistExpand list = {list} id = {list.id}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
