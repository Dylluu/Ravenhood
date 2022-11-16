import React from 'react';
import {NavLink} from 'react-router-dom';
import { useState} from 'react';
import './AddListStock.css'

function AddListStock ({list, deleteWatchlist, id})  {
  const [add, setAdd] = useState(false)

  return (
  <div className='add-to-watchlists'>
    <div className='stock-info-holder'>
      <div className='stock-name'>
        I'm a stock!! (stock symbol)
      </div>
      <div className='stock-detail'>
        I have something down here
      </div>
    </div>
    <button className='add-to-watchlists-button'  >
      {/* onclick wanted to add */}
      <i class="fa-solid fa-check"></i> Add to Lists
    </button>
    {add && <div> hi</div>}
  </div>
  )
}

export default AddListStock
