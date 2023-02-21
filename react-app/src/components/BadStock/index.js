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
            <span id='bad-stock-text'>The Yahoo Finance API has recently shut down, we are currently working on implementing a new API</span>
            </div>
        </div>
    )
}

export default BadStock;
