import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BadStock.css';
import flyingBird from '../../assets/flyingBird.gif';

function BadStock () {
    return (
        <div className='bad-stock-wrapper'>
            <div className='bad-stock-inner'>
            <img alt='flyingBird' src={flyingBird} id='flying-bird'/>
            <span id='bad-stock-text'>Sorry, the Yahoo API does not have data for this stock.</span>
            </div>
        </div>
    )
}

export default BadStock;
