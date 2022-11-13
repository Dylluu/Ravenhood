import React from 'react';
import { useState } from 'react';
import testBird from '../../assets/testbird.png'

function Watchlist(){
  return (
    <div class="main-container">
    <div class="watchlist">
      <div class="picture-holder" >
        <img class="picture" src={testBird}> </img>
      </div>
      <div class="watchlist-title">
        <h3>Watchlist Template</h3>
      </div>
      <div class="item-count">
        {/* <!-- the number will be the actual number of items --> */}
        <p>5 items</p>
      </div>
      <div class="watchlist-table">
        <div class="watchlist-header">
          <div class="name-column">Name</div>
          <div class="symbol-column">Symbol</div>
          <div class="price-column">Price</div>
        </div>
        <div class="watchlist-data">
        {/* <!-- this section gets for looped to include all stocks in watchlist --> */}
          <div class="name-column">Tesla</div>
          <div class="symbol-column">TSLA</div>
          <div class="price-column">$177.00</div>
        {/* <!-- button will delete the stock from the watchlist --> */}
          <button class="delete-button">X</button>
        </div>
      </div>
    </div>
    <div class="watchlist-select">
      <div class="watchlist-list-header">
        <h2 class="list-title">Lists</h2>
        <button class="add-button">+</button>
        {/* <!-- button will create a list --> */}
      </div>
      {/* <!-- this section will be looped to create different lists  --> */}
      <div class="list-container">
        <div class="watchlist-picture-holder">
          <img class="small-picture" src={testBird}> </img>
        </div>
        <div class="list-name">Watchlist Template</div>
        <button class="options-button">...</button>
      </div>
    </div>
  </div>
  )
}

export default Watchlist;
