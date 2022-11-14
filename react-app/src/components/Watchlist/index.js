import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import { thunkGetAllWatchlist, thunkGetOneWatchlist, thunkGetAllStocks } from '../../store/watchlist';
import testBird from '../../assets/testbird.png'
import User from '../User';
import { TickerSymbols } from '../../utils/stocksSymbols';

function Watchlist(){
  const dispatch = useDispatch()
  const { watchlistId } = useParams()
  const watchlist = useSelector(state => state.watchlist)
  const user_id = useSelector(state => state.session.user.id)
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

  return (
    <div class="main-container">
      <div class="watchlist">
        <div class="picture-holder" >
          {/* <img class="picture" src={testBird}> </img> */}
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
          {stocks.map(stock => {
            return <div class="watchlist-data">
            <div class="name-column">{TickerSymbols[stock.symbol].name}</div>
            <div class="symbol-column">{stock.symbol}</div>
            <div class="price-column">temp price</div>
            <button class="delete-button">X</button>
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
        {lists.map( list=> {
            return <div class="list-container">
            <div class="watchlist-picture-holder">
              {/* <img class="small-picture" src={testBird}> </img> */}
            </div>
            <div class="list-name">{list.name}</div>
            <button class="options-button">...</button>
          </div>
          })}
        {/* <!-- this section will be looped to create different lists  --> */}

      </div>
  </div>
  )
}

export default Watchlist;
