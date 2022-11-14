import React from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import { thunkGetAllWatchlist, thunkUpdateWatchlist } from '../../store/watchlist';
// import testBird from '../../assets/testbird.png'
// import User from '../User';
// import { TickerSymbols } from '../../utils/stocksSymbols';
const WatchlistForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { watchlistId } = useParams()
  const watchlist = useSelector(state => state.watchlist)
  const user_id = useSelector(state => state.session.user.id)
  const [name, setName] = useState("")
  let stocks
  let lists
  const submitHandler = async (e) => {
    e.preventDefault()
    let submitList= Object.values(watchlist.allWatchlists)
    let count = Object.values(submitList).length

    let list = {
      // id: count+1,
      name,
      watchlistId
    }

    await dispatch(thunkUpdateWatchlist(list))
    await dispatch(thunkGetAllWatchlist(user_id))
    history.push(`/watchlists/${watchlistId}`)
  }

  return <div>
    <form onSubmit={submitHandler}>
    <input
    type="text"
    name="name"
    onChange={(e) => setName(e.target.value)}
    value={name}
    />
    <button type="submit">Add List</button>
    </form>
  </div>
}

export default WatchlistForm
