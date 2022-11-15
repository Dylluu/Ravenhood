import React from 'react';
import {NavLink} from 'react-router-dom';
import { useState} from 'react';
import './watchlist.css'
import testBird from '../../assets/testbird.png'
import WatchlistFromModal from './edit-watchlist-model';
function Options ({list, deleteWatchlist, id})  {
  const [options, setOptions] = useState(false)

  return <div class="list-container">
  <div class="watchlist-picture-holder">
    <img class="small-picture" src={testBird}/>
  </div>
  <NavLink className="list-name" to={`/watchlists/${list.id}`} exact={true}>
    {list.name}
  </NavLink>
  <div>
    <button class="options-button"  onClick={() => {
      options==false ? setOptions(true):setOptions(false)
    }}>...</button>
    {options &&<div class="options-menu">
      <WatchlistFromModal id = {id}/>
      <div> <button class="options-button" onClick={() => deleteWatchlist(list)}>Delete Watchlist </button> </div>
    </div>}
  </div>
  </div>
}


export default Options
