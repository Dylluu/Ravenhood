import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoggedInNav.css';
import logoGreen from '../../assets/robinHoodFeatherGreen.png';
import logoBlack from '../../assets/ravenhood-black.PNG';
import logoPurple from '../../assets/ravenhood-purple.PNG';
import { TickerSymbols } from '../../utils/stocksSymbols';
// import logoBlack from '../../assets/robinHoodFeatherBlack.png';

function LoggedInNav() {
	const history = useHistory();
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const [accountMenuOpen, setAccountMenuOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const allSymbols = Object.keys(TickerSymbols);

	useEffect(() => {
		// if(search.length === 1) {
		//     let matches = [];
		//     setSearchOpen(true)
		//     function handleSearchOne (search) {
		//         for(let i = 0; i < allSymbols.length; i++){
		//             let count = 0;
		//             if(allSymbols[i].startsWith(search.toUpperCase()) && allSymbols[i].length < 2){
		//                 matches.push(allSymbols[i])
		//             }
		//         }
		//         setSearchResults(matches)
		//     }
		//     handleSearchOne(search)
		// }
		// const searchBar = document.getElementById('search-stock');
		// searchBar.addEventListener('focusout', () => {
		// 	setSearchOpen(false)
		// })

		if (search.length > 0) {
			let matches = [];
			setSearchOpen(true);
			function handleSearch(search) {
				for (let i = 0; i < allSymbols.length; i++) {
					let count = 0;
					if (allSymbols[i].startsWith(search.toUpperCase())) {
						matches.push(allSymbols[i]);
					}
				}
				setSearchResults(matches);
			}
			handleSearch(search);
		} else {
			setSearchOpen(false);
		}
	}, [search]);

	function thousandsSeparator(value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	function handleSearchInputShadow() {
		const searchInput = document.getElementById('search-stock');
		const searchDiv = document.getElementsByClassName(
			'logged-in-search-bar-div'
		);
		searchDiv[0].classList.add('logged-in-search-bar-div-focus');
		searchInput.addEventListener('focusout', () => {
			searchDiv[0].classList.remove('logged-in-search-bar-div-focus');
		});
	}

	function handleMenuOpen() {
		const accountButton = document.getElementById('account');
		const accountDiv = document.getElementsByClassName('logged-in-nav-buttons');
		if (!accountMenuOpen && accountButton && accountDiv) {
			accountButton.classList.add('green-font');
			accountDiv[0].removeAttribute('id');
			accountDiv[0].style.borderBottom = 'solid 2px rgb(0, 200, 5)';
			setAccountMenuOpen(true);
			// const menuPopout = document.getElementsByClassName('account-menu-popout');
			// menuPopout[0].addEventListener('click', (e) => {
			//     e.stopPropagation()
			// })
		}
		if (accountMenuOpen && accountButton && accountDiv) {
			accountButton.classList.remove('green-font');
			accountDiv[0].style.borderBottom = 'solid 2px white';
			accountDiv[0].setAttribute('id', 'logged-in-nav-buttons-hover');
			setAccountMenuOpen(false);
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

	function handleWindowClick() {
		const accountButton = document.getElementById('account');
		const accountDiv = document.getElementsByClassName('logged-in-nav-buttons');
		if (accountMenuOpen && accountButton && accountDiv) {
			accountButton.classList.remove('green-font');
			accountDiv[0].style.borderBottom = 'solid 2px white';
			accountDiv[0].setAttribute('id', 'logged-in-nav-buttons-hover');
			setAccountMenuOpen(false);
		}
	}

	useEffect(() => {
		window.addEventListener('click', handleWindowClick);
	});

	return (
		<div className="logged-in-nav-wrapper">
			<img
				alt="feather"
				src={logoGreen}
				className="logged-in-feather"
				onClick={() => {
					history.push('/');
					history.go(0);
				}}
			/>
			<div className="logged-in-inner-wrapper">
				<div className="logged-in-search-bar-div">
					<div className="search-bar-inner">
						<i className="fa-solid fa-magnifying-glass" id="magnifying-glass" />
						<input
							id="search-stock"
							placeholder="Search"
							onClick={() => handleSearchInputShadow()}
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							autoComplete="off"
						></input>
					</div>
					{searchOpen &&
						searchResults.length > 0 &&
						searchResults.map((result) => (
							<div
								className="search-results"
								key={result}
								onClick={() => {
									setSearch('');
									setSearchResults([]);
									setSearchOpen(false);
									history.push(`/stocks/${result}`);
									history.go(0);
								}}
							>
								<span id="search-result-ticker">{result}</span>
								<span>{TickerSymbols[result].name}</span>
							</div>
						))}
				</div>
				<div
					className="logged-in-nav-buttons"
					id="logged-in-nav-buttons-hover"
					onClick={(e) => {
						e.stopPropagation();
						handleMenuOpen();
					}}
				>
					<span id="account">Account</span>
					{accountMenuOpen && (
						<div
							className="account-menu-popout"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="account-menu-popout-header">
								<div className="account-menu-popout-header-inner">
									<div className="account-menu-popout-name">
										<span id="account-menu-user">
											{user.first_name} {user.last_name}
										</span>
									</div>
									<div className="account-menu-popout-amounts">
										<div className="account-menu-popout-portfolio-buying">
											<span className="account-menu-popout-dollars">$0.00</span>
											<span className="portfolio-buying">Portfolio Value</span>
										</div>
										<div className="account-menu-popout-portfolio-buying">
											<span className="account-menu-popout-dollars">
												${thousandsSeparator(user.buy_power)}
											</span>
											<span className="portfolio-buying">Buying Power</span>
										</div>
									</div>
								</div>
							</div>
							<div className="account-menu-popout-middle">
								<div className="account-menu-popout-middle-buttons"
								onClick={() => {
									history.push('/history')
									handleMenuOpen()
								}}
								>
									<i
										className="fa-solid fa-clock-rotate-left"
										id="history-icon"
									/>
									<span>Transaction History</span>
								</div>
							</div>
							<NavLink
								className="account-menu-popout-middle-buttons"
								id="account-menu-popout-logout"
								to='/'
								onClick={async () => {
									dispatch(logout());
								}}
							>
								<i
									className="fa-solid fa-arrow-right-from-bracket"
									id="logout-icon"
								/>
								<span>Logout</span>
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default LoggedInNav;
