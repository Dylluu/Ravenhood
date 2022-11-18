import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import { thunkGetAllWatchlist, thunkUpdateWatchlist } from '../../store/watchlist';

const WatchlistForm = ({id, setShowModal, setOptions}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const  watchlistId  = id
  const watchlist = useSelector(state => state.watchlist)
  const user_id = useSelector(state => state.session.user.id)
  const [name, setName] = useState("")
  let stocks
  let lists
  const submitHandler = async (e) => {
    e.preventDefault()

    let list = {
      name,
      watchlistId
    }

    await dispatch(thunkUpdateWatchlist(list))
    await dispatch(thunkGetAllWatchlist(user_id))
    history.push(`/watchlists/${watchlistId}`)
    setShowModal(false)
    setOptions(false)
  }

  return <div className='update-modal'
  onClick={(e) => e.stopPropagation()}
  >
    <div className='update-modal-title'>
      <span>Edit List</span>
      <i className="fa-solid fa-xmark"
            id='add-to-form-x'
            onClick={() => {
              setShowModal(false)
              setOptions(false)
            }}
            />
      </div>
    <form className='update-modal-form' onSubmit={submitHandler}>
    <input
    type="text"
    name="name"
    onChange={(e) => setName(e.target.value)}
    value={name}
    id='update-modal-input'
    placeholder='Update List Name'
    autoComplete='off'
    />
    <button
    id='save-update-watchlist'
    className='create-list-button' type="submit"
    // onClick={() => submitHandler()}
    >Save</button>
    </form>
  </div>
}

export default WatchlistForm
