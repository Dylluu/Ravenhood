import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoggedInNav.css';
import logoGreen from '../../assets/robinHoodFeatherGreen.png';
// import logoBlack from '../../assets/robinHoodFeatherBlack.png';

function LoggedInNav () {
    const dispatch = useDispatch()

    function handleSearchInputShadow () {
        const searchInput = document.getElementById('search-stock');
        const searchDiv = document.getElementsByClassName('logged-in-search-bar-div');
        searchDiv[0].classList.add('logged-in-search-bar-div-focus');
        searchInput.addEventListener('focusout', () => {
            searchDiv[0].classList.remove('logged-in-search-bar-div-focus');
        })
    }

    return (
        <div className='logged-in-nav-wrapper'>
            <img alt='feather' src={logoGreen} className='logged-in-feather'
            onClick={() => {
                console.log('logging out')
                dispatch(logout())}}
            />
            <div className='logged-in-inner-wrapper'>
                <div className='logged-in-search-bar-div'>
                <i className="fa-solid fa-magnifying-glass" id='magnifying-glass'/>
                <input id='search-stock'
                placeholder='Search'
                onClick={() => handleSearchInputShadow()}
                ></input>
                </div>
            <div className='logged-in-nav-buttons'>
                <span id='account'>Account</span>
            </div>
            </div>
        </div>
    )
}

export default LoggedInNav;
