import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AddListStock.css'
import { thunkGetAllWatchlist, thunkGetOneWatchlist, thunkGetAllStocks, thunkDeleteStocks, thunkDeleteWatchlist, thunkPostWatchlist } from '../../store/watchlist';

function AddListStock ()  {
  const dispatch = useDispatch()
  const history = useHistory()
  const [add, setAdd] = useState(false)
  const { watchlistId } = useParams()
  const watchlist = useSelector(state => state.watchlist)
  const user_id = useSelector(state => state.session.user.id)
  let stocks
  let lists

  if (watchlist.allStocks) {
    stocks = Object.values(watchlist.allStocks)
  }
  if (watchlist.allWatchlists) {
    lists = Object.values(watchlist.allWatchlists)
  }
  useEffect(() => {
    dispatch(thunkGetAllWatchlist(user_id))
    dispatch(thunkGetOneWatchlist(watchlistId))
    dispatch(thunkGetAllStocks(watchlistId))
  }, [dispatch, watchlistId], watchlistId)

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
    <button className='add-to-watchlists-button' onClick={add == false ? setAdd(true) : setAdd(false)} >
      {/* onclick wanted to add */}
      <i class="fa-solid fa-check"></i> Add to Lists
    </button>
    {add && <div>hi</div>}
  </div>
  )
}

export default AddListStock
