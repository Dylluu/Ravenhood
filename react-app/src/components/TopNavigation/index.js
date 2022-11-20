import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './TopNavigation.css';
import logo from '../../assets/ravenHood.png'

function TopNaviagtion() {

    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch()
    const onLogout = async (e) => {
        await dispatch(logout());
    };
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuOpen = () => {
        const menuTop = document.getElementById('top-menu-bar');
        const menuBottom = document.getElementById('bottom-menu-bar');
        const menuDiv = document.getElementsByClassName('menu');
        const popout = document.getElementsByClassName('splash-popout');

        if (!menuOpen) {
            // console.log('opening menu')
            menuTop.classList.add('top-transition');
            menuTop.classList.remove('top-transition2');
            menuBottom.classList.add('bottom-transition');
            menuBottom.classList.remove('bottom-transition2');
            menuDiv[0].classList.add('menu-shift');
            popout[0].classList.add('splash-pop-transition');
            setMenuOpen(true);
        }
        if (menuOpen) {
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
                <div className='ravenhood'
                    onClick={() => {
                        if (menuOpen) handleMenuOpen()
                        history.push('/')
                        history.go(0)
                    }}
                >
                    <span>Ravenhood</span>
                    <img id='logo' src={logo} />
                </div>
            </div>
            <div className='middle-top-nav'>
                <div className='middleTopWrapper'>
                    <span className='buttons-nav' >Invest</span>
                    <span className='buttons-nav'>Crypto</span>
                    <span className='buttons-nav-cash'
                        onClick={() => history.push('/cash')}
                    >Cash Card</span>
                    <span className='buttons-nav'>Learn</span>
                    <span className='buttons-nav'>Snacks</span>
                    {!user && <span className='buttons-nav'>Support</span>}
                    {user && <span className='buttons-nav'
                        onClick={onLogout}
                    >Logout</span>}
                </div>
            </div>
            <div className='login-signup-wrapper'>
                <NavLink
                    to='/login'
                    id='login'
                    className='logsign-butt'>
                    Log in
                </NavLink>
                <NavLink to='/signup' id='sign-up' className='logsign-butt'>Sign up</NavLink>
            </div>
            <div className='menu'
                onClick={() => handleMenuOpen()}
            >
                <div id='top-menu-bar' className='menu-bar'></div>
                <div id='bottom-menu-bar' className='menu-bar'></div>
            </div>
            <div className='splash-popout'>
                {/* <span className='popout-nav'>Invest</span>
                        <span className='popout-nav'>Crypto</span> */}
                {/* <span className='popout-nav'
                    onClick={() => {
                        handleMenuOpen()
                        history.push('/cash')
                    }}
                >Cash Card</span> */}
                <span className='popout-nav'
                    onClick={() => {
                        handleMenuOpen()
                        history.push('/login')
                    }}
                >Login</span>
                <span className='popout-nav'
                    onClick={() => {
                        handleMenuOpen()
                        history.push('/signup')
                    }}
                >Sign Up</span>
                {/* <span className='popout-nav'>Support</span> */}
            </div>
        </div>
    )
}

export default TopNaviagtion;
