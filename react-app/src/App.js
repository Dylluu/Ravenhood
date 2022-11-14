import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import MainStockPage from './components/MainStockPage';
import MainStockHistoricalGraph from './components/MainStockHistoricalGraph';
import SmallStockGraph from './components/SmallStockGraph';

function App() {
	const [loaded, setLoaded] = useState(false);
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
					<TopNaviagtion />
					<Splash />
				</Route>
				<Route path="/login" exact={true}>
					<RealLoginForm />
				</Route>
				<Route path="/signup" exact={true}>
					<SignUpForm />
				</Route>
				<Route path="/stocks/:ticker">
					<MainStockPage />
				</Route>
				<Route path="/linh">
					<MainStockHistoricalGraph />
				</Route>
				<Route path="/nhut">
					<SmallStockGraph ticker={'AMZN'} />
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

export default App;
