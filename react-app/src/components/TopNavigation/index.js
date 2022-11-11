import React from 'react';
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './TopNavigation.css';
import logo from '../../assets/Robinhood-logo.png'

function TopNaviagtion() {

    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuOpen = () => {
        const menuTop = document.getElementById('top-menu-bar');
        const menuBottom = document.getElementById('bottom-menu-bar');
        const menuDiv = document.getElementsByClassName('menu');
        const popout = document.getElementsByClassName('splash-popout');

        if(!menuOpen) {
            console.log('opening menu')
            menuTop.classList.add('top-transition');
            menuTop.classList.remove('top-transition2');
            menuBottom.classList.add('bottom-transition');
            menuBottom.classList.remove('bottom-transition2');
            menuDiv[0].classList.add('menu-shift');
            popout[0].classList.add('splash-pop-transition');
            setMenuOpen(true);
        }
        if(menuOpen){
            menuTop.classList.remove('top-transition');
            menuTop.classList.add('top-transition2');
            menuBottom.classList.add('bottom-transition2');
            menuBottom.classList.remove('bottom-transition');
            menuDiv[0].classList.remove('menu-shift');
            popout[0].classList.remove('splash-pop-transition');
            setMenuOpen(false);
        }
    }

    return (
        <div className='nav-wrapper'>
            <div className='logo-wrapper'>
                <div className='robinhood'
                onClick={() => console.log('Robinhood')}
                >
                    <img id='logo' src={logo}/>
                </div>
            </div>
            <div className='middle-top-nav'>
                <div className='middleTopWrapper'>
                <span className='buttons-nav'>Invest</span>
                <span className='buttons-nav'>Crypto</span>
                <span className='buttons-nav'>Cash Card</span>
                <span className='buttons-nav'>Learn</span>
                <span className='buttons-nav'>Snacks</span>
                <span className='buttons-nav'>Support</span>
                </div>
            </div>
            <div className='login-signup-wrapper'>
                <NavLink
                to='/login'
                id='login'
                className='logsign-butt'>
                    Log in
                </NavLink>
                    <div id='sign-up' className='logsign-butt'>Sign up</div>
            </div>
            <div className='menu'
            onClick={() => handleMenuOpen()}
            >
                <div id='top-menu-bar' className='menu-bar'></div>
                <div id='bottom-menu-bar' className='menu-bar'></div>
            </div>
        </div>
    )
}

export default TopNaviagtion;