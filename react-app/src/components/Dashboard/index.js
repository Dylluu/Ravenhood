import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';

function Dashboard () {

    const user = useSelector(state => state.session.user);
    function thousandsSeparator (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // useEffect(() => {window.addEventListener('scroll', () => {
    //         const dashboardWatchlist = document.getElementsByClassName('dashboard-watchlists-wrapper');
    //         dashboardWatchlist[0].style.paddingTop = `${window.scrollY}`
    //     })
    // }, [])

    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-inner-wrapper'>
                <div className='dashboard-inner-left'>
                <div className='dashboard-graph-wrapper'></div>
                <div className='buying-power-wrapper'>
                    <div className='buy-power-div'>
                        <span id='buying-power'>Buying Power</span>
                        <span id='buying-power-amount'>${thousandsSeparator(user.buy_power)}</span>
                    </div>
                </div>
                    <div className='dashboard-inner-left-borders'></div>
                </div>
                <div className='dashboard-watchlists-wrapper'></div>
            </div>
        </div>
    )
}

export default Dashboard;
