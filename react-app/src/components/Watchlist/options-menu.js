import React from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import { thunkGetAllWatchlist, thunkGetOneWatchlist, thunkGetAllStocks, thunkDeleteStocks, thunkDeleteWatchlist, thunkPostWatchlist } from '../../store/watchlist';
import testBird from '../../assets/testbird.png'
// import User from '../User';
import WatchlistForm from './watchlistForm';
import WatchlistUpdate from './watchlistUpdate'
import { TickerSymbols } from '../../utils/stocksSymbols';

function Options ({list}, {deleteWatchlist})  {
  const [options, setOptions] = useState(false)



  return <div class="list-container">
  <div class="watchlist-picture-holder">
    <img class="small-picture" src={testBird}/>
  </div>
  <NavLink className="list-name" to={`/watchlists/${list.id}`} exact={true}>
    {list.name}

  </NavLink>
  {/* need to fix navlink */}
  <div>
    <button class="options-button"  onClick={() => {
      options==false ? setOptions(true):setOptions(false)
    }}>...</button>
    {options &&<div class="options-menu">
      <div> <button class={"options-button"}>Edit Watchlist</button> </div>
      <div> <button class="options-button" onClick={() => deleteWatchlist(list)}>Delete Watchlist</button> </div>
    </div>}
  </div>
  </div>
}


export default Options
