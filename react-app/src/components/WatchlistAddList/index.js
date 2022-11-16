import { useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react';
import './WatchlistAddList.css'
import {
	thunkGetAllWatchlist,
	thunkGetOneWatchlist,
	thunkGetAllStocks,
	thunkDeleteStocks,
	thunkDeleteWatchlist,
	thunkPostWatchlist
} from '../../store/watchlist';
import { Modal } from '../../context/Modal';
// import WatchlistFromModal from '../Watchlist/edit-watchlist-model';

function WatchlistAddList(symbol) {
  const dispatch = useDispatch()
  const [add, setAdd] = useState(false);
  const watchlist = useSelector((state) => state.watchlist);
	const user_id = useSelector((state) => state.session.user.id);
  let lists;

  useEffect(
		() => {
			dispatch(thunkGetAllWatchlist(user_id));
		},
		[dispatch]
	);

  if (watchlist.allWatchlists) {
		lists = Object.values(watchlist.allWatchlists);
	}
  return (
    <div>
      <button className='add-list-button' onClick={() => add == false? setAdd(true): setAdd(false)}>Add to List</button>
      {/* {add && <WatchlistFromModal></WatchlistFromModal>} */}
      {add && <Modal>
        <form className='add-form'>
          <div>{`Add ${symbol} to your list `}</div>
          <select name="add_list">

          </select>
        </form>
        <button className="cancel-button" onClick={() => add == false? setAdd(true): setAdd(false)}>Cancel</button>
      </Modal>}
    </div>
  )
}


export default WatchlistAddList
