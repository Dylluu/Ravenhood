import React from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import { thunkGetAllWatchlist, thunkGetOneWatchlist, thunkGetAllStocks, thunkDeleteStocks, thunkDeleteWatchlist, thunkPostWatchlist } from '../../store/watchlist';
import testBird from '../../assets/testbird.png'
// import User from '../User';
import WatchlistForm from './watchlistForm';
import { TickerSymbols } from '../../utils/stocksSymbols';

function Watchlist(){
  const dispatch = useDispatch()
  const history = useHistory()
  const { watchlistId } = useParams()
  const watchlist = useSelector(state => state.watchlist)
  const user_id = useSelector(state => state.session.user.id)
  const [name, setName] = useState("")
  let stocks
  let lists

  useEffect(() => {
    dispatch(thunkGetAllWatchlist(user_id))
    dispatch(thunkGetOneWatchlist(watchlistId))
    dispatch(thunkGetAllStocks(watchlistId))
  }, [dispatch], watchlistId)

  if (watchlist.allStocks) {
    stocks = Object.values(watchlist.allStocks)
  }
  if (watchlist.allWatchlists) {
    lists = Object.values(watchlist.allWatchlists)
  }

  const deleteWatchlist = async(list) => {
    await dispatch(thunkDeleteWatchlist(list.id))
    await dispatch(thunkGetAllWatchlist(user_id))
    history.push(`/watchlists/${watchlistId}`)
  }

  const deleteStock = async (stock) => {
    await dispatch(thunkDeleteStocks(stock))
    await dispatch(thunkGetAllStocks(watchlistId))
    history.push(`/watchlists/${watchlistId}`)
  }

  return (
    <div class="main-container">
      <div class="watchlist">
        <div class="picture-holder" >
          <img class="picture" src={testBird}/>
        </div>
        <div class="watchlist-title">
          <h3>Watchlist Template</h3>
        </div>
        <div class="item-count">
          {watchlist.allStocks?<p> {Object.keys(watchlist.allStocks).length} items</p>:'nope'}
        </div>
        <div class="watchlist-table">
          <div class="watchlist-header">
            <div class="name-column">Name</div>
            <div class="symbol-column">Symbol</div>
            <div class="price-column">Price</div>
          </div>

          {/* <!-- this section gets for looped to include all stocks in watchlist --> */}
          {stocks && stocks.map(stock => {
            // eventually put name-column/symbol column in a navlink together
            return <div class="watchlist-data">
            <div class="name-column">{TickerSymbols[stock.symbol].name}</div>
            <div class="symbol-column">{stock.symbol}</div>
            <div class="price-column">temp price</div>
            <button class="delete-button" onClick={() =>deleteStock(stock)}>X</button>
            </div>
          })}
          {/* <!-- button will delete the stock from the watchlist --> */}


        </div>
      </div>
      <div class="watchlist-select">
        <div class="watchlist-list-header">
          <h2 class="list-title">Lists</h2>
          <button class="add-button">+</button>
          {/* <!-- button will create a list --> */}
        </div>
        {lists && lists.map( list=> {
            return <div class="list-container">
              <div class="watchlist-picture-holder">
                <img class="small-picture" src={testBird}/>
              </div>
              <NavLink className="list-name" to={`/watchlists/${list.id}`} exact={true}>
                {list.name}
              </NavLink>
              {/* need to fix navlink */}
              <button class="options-button" onClick={() => deleteWatchlist(list)}>...</button>
          </div>
          })}
          {/* temporary stuff */}
          {/* <WatchlistForm/> */}
          {/* <div>
            <form onSubmit={submitHandler}>
            <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
            <button type="submit">Add List</button>
            </form>
          </div> */}
        {/* <!-- this section will be looped to create different lists  --> */}

      </div>
  </div>
  )
}

export default Watchlist;
