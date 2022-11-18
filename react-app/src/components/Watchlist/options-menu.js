import React, { useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { useState} from 'react';
import './watchlist.css'
import testBird from '../../assets/testbird.png'
import WatchlistFromModal from './edit-watchlist-model';
function Options ({list, deleteWatchlist, id})  {
  const [options, setOptions] = useState(false)
  const history = useHistory();

  useEffect(() => {
    if(options) window.addEventListener('click', handleOptions)
  }, [options])

  function handleOptions() {
    options==false ? setOptions(true):setOptions(false)
  }

  return <div class="list-container">
    <div className='watchlist-pic-and-navlink'
    onClick={() => history.push(`/watchlists/${list.id}`)}
    >
  <div class="watchlist-picture-holder">
    <img class="small-picture" src={testBird}/>
  </div>
  {/* <div></div> */}
  <NavLink className="list-name" to={`/watchlists/${list.id}`} exact={true}>
    {list.name}
  </NavLink>
  </div>
  <div>
    <button className="options-button"
    onClick={(e) => {
      e.stopPropagation()
      handleOptions()
    }}><i className="fa-solid fa-ellipsis"
    id='options-button'
    /></button>
    {options &&<div class="options-menu">
      <WatchlistFromModal id = {id} setOptions={setOptions}/>
      <div>
        <div class="options-icon-text">
          <button class="options-button" onClick={() => deleteWatchlist(list)}>
            <div className='options-icon-text'>
              <i class="fa-regular fa-circle-xmark"></i> Delete List
            </div>
          </button>
        </div>
      </div>
    </div>}
  </div>
  </div>
}


export default Options
