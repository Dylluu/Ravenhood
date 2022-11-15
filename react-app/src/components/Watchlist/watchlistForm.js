import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useState,} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import { thunkGetAllWatchlist, thunkPostWatchlist } from '../../store/watchlist';

const WatchlistForm = ({add, setAdd}) => {
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

    let list = {
      name,
      user_id
    }

    await dispatch(thunkPostWatchlist(list))
    await dispatch(thunkGetAllWatchlist(user_id))
    // history.push(`/watchlists/${watchlistId}`)
  }

  return <div >
      {add&&<form onSubmit={submitHandler} className='add-form'>
      <input
      className='add-form-input'
      type="text"
      name="name"
      onChange={(e) => setName(e.target.value)}
      value={name}
      />
      <div className='add-button-holder'>
        <button className='cancel-button' onClick={() => {
          add == false ? setAdd(true): setAdd(false)
        }}>Cancel</button>
        <button className='create-list-button' type="submit">Create</button>
      </div>
      </form>}
  </div>
}

export default WatchlistForm
