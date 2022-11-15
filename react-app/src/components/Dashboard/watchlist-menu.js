import React from 'react';
import {NavLink} from 'react-router-dom';
import { useState} from 'react';
import './Dashboard.css';
import testBird from '../../assets/testbird.png'
import WatchlistFromModal from '../Watchlist/edit-watchlist-model';
function PortfolioOptions ({list, deleteWatchlist, id})  {
  const [options, setOptions] = useState(false)

  return <div>
    <button class="options-button"  onClick={() => {
      options==false ? setOptions(true):setOptions(false)
    }}>...</button>
    {options &&<div class="options-menu">
      <WatchlistFromModal id = {id}/>
      <div>
        <button class="options-button" onClick={() => deleteWatchlist(list)}>
            <div className='options-icon-text'>
              <i class="fa-regular fa-circle-xmark"></i> Delete List
            </div>
          </button>
      </div>
    </div>}
  </div>
}


export default PortfolioOptions
