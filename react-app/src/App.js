import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import TopNaviagtion from './components/TopNavigation';
import RealLoginForm from './components/auth/RealLoginForm';
import Splash from './components/Splash';
import MainStockGraph from './components/MainStockGraph';
import SmallStockGraph from './components/SmallStockGraph';
import CashCard from './components/CashCard';
import Watchlist from './components/Watchlist';
import LoggedInNav from './components/LoggedInNav';

function App() {
	const [loaded, setLoaded] = useState(false);
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			{/* <NavBar /> */}
			<Switch>
				<Route exact path="/">
					{!user && (
					<>
					<TopNaviagtion />
					<Splash />
					</>)}
					{user && (
					<>
					<LoggedInNav />
					</>
					)}
				</Route>
				<Route path="/login" exact={true}>
					<RealLoginForm />
				</Route>
				<Route path="/signup" exact={true}>
					<SignUpForm />
				</Route>
				<Route path="/nhut">
					<MainStockGraph />
				</Route>
				<Route path="/linh">
					<SmallStockGraph />
				</Route>
				<Route path="/cash">
					<TopNaviagtion />
					<CashCard />
				</Route>
				<Route path="/watchlists/:watchlistId">
					<TopNaviagtion/>
					<Watchlist/>
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					<h1>My Home Page</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

// Jarrod needs to add watchlist routes to the app

export default App;
