import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoggedInNav.css';
import logoGreen from '../../assets/robinHoodFeatherGreen.png';
// import logoBlack from '../../assets/robinHoodFeatherBlack.png';

function LoggedInNav () {
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    function handleSearchInputShadow () {
        const searchInput = document.getElementById('search-stock');
        const searchDiv = document.getElementsByClassName('logged-in-search-bar-div');
        searchDiv[0].classList.add('logged-in-search-bar-div-focus');
        searchInput.addEventListener('focusout', () => {
            searchDiv[0].classList.remove('logged-in-search-bar-div-focus');
        })
    }

    function handleMenuOpen () {
        const accountButton = document.getElementById('account');
        const accountDiv = document.getElementsByClassName('logged-in-nav-buttons');
        if(!accountMenuOpen) {
            accountButton.classList.add('green-font')
            accountDiv[0].removeAttribute('id')
            accountDiv[0].style.borderBottom = 'solid 2px rgb(0, 200, 5)'
            setAccountMenuOpen(true)
            // const menuPopout = document.getElementsByClassName('account-menu-popout');
            // menuPopout[0].addEventListener('click', (e) => {
            //     e.stopPropagation()
            // })
        }
        if(accountMenuOpen) {
            accountButton.classList.remove('green-font');
            accountDiv[0].style.borderBottom = 'solid 2px white'
            accountDiv[0].setAttribute('id', 'logged-in-nav-buttons-hover')
            setAccountMenuOpen(false)
        }
    }

    // useEffect(() => {
    //     if(accountMenuOpen) {
    //     window.addEventListener('click', setAccountMenuOpen(false))
    //     }
    //     if(!accountMenuOpen) {
    //         window.removeEventListener('click' ,() => {
    //             handleMenuOpen()})
    //     }
    // }, [accountMenuOpen])

    function handleWindowClick () {
        const accountButton = document.getElementById('account');
        const accountDiv = document.getElementsByClassName('logged-in-nav-buttons');
        if(accountMenuOpen) {
            accountButton.classList.remove('green-font')
            accountDiv[0].style.borderBottom = 'solid 2px white'
            accountDiv[0].setAttribute('id', 'logged-in-nav-buttons-hover')
            setAccountMenuOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleWindowClick)
    })


    return (
        <div className='logged-in-nav-wrapper'>
            <img alt='feather' src={logoGreen} className='logged-in-feather'/>
            <div className='logged-in-inner-wrapper'>
                <div className='logged-in-search-bar-div'>
                <i className="fa-solid fa-magnifying-glass" id='magnifying-glass'/>
                <input id='search-stock'
                placeholder='Search'
                onClick={() => handleSearchInputShadow()}
                ></input>
                </div>
            <div className='logged-in-nav-buttons' id='logged-in-nav-buttons-hover'
            onClick={(e) => {
                e.stopPropagation()
                handleMenuOpen()
            }}
            >
                <span id='account'>Account</span>
                {accountMenuOpen && <div className='account-menu-popout'
                onClick={(e) => e.stopPropagation()}
                >
                    <div className='account-menu-popout-header'>
                        <div className='account-menu-popout-header-inner'>
                            <div className='account-menu-popout-name'>
                                <span id='account-menu-user'>{user.first_name} {user.last_name}</span>
                                </div>
                            <div className='account-menu-popout-amounts'>
                                <div className='account-menu-popout-portfolio-buying'>
                                    <span className='account-menu-popout-dollars'>$0.00</span>
                                    <span className='portfolio-buying'>Portfolio Value</span>
                                </div>
                                <div className='account-menu-popout-portfolio-buying'>
                                    <span className='account-menu-popout-dollars'>$0.00</span>
                                    <span className='portfolio-buying'>Buying Power</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='account-menu-popout-middle'>
                        <div className='account-menu-popout-middle-buttons'>
                            <i className="fa-solid fa-clock-rotate-left"
                            id='history-icon'
                            />
                            <span>Transaction History</span>
                        </div>
                    </div>
                        <div className='account-menu-popout-middle-buttons' id='account-menu-popout-logout'
                        onClick={() => {
                            dispatch(logout())
                            history.go(0)
                        }
                        }
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket" id='logout-icon'/>
                            <span>Logout</span>
                        </div>
                </div>}
            </div>
            </div>
        </div>
    )
}

export default LoggedInNav;
