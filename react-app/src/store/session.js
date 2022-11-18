// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER';

const setUser = (user) => ({
	type: SET_USER,
	payload: user
});

const updateUser = (BP) => ({
	type: UPDATE_USER,
	payload: BP
})

const removeUser = () => ({
	type: REMOVE_USER
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch('/api/auth/', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.'];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch('/api/auth/logout', {
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (first_name, last_name, email, password, buy_power) => async (dispatch) => {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			first_name,
			last_name,
			email,
			password,
			buy_power
		})
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.'];
	}
};

export const thunkAddBuyPower = (updateBuyPower, user_id) => async dispatch => {
	// console.log("WORKING, ENTERED BP THUNK")
	const response = await fetch(`/api/users/BP/${user_id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updateBuyPower)
	})

	// console.log("WORKING", response)
	// console.log(typeof (user_id))

	if (response.ok) {
		const updatedBuyingPower = await response.json();
		dispatch(updateUser(updatedBuyingPower))
		// console.log("RESPONSE OK", updatedBuyingPower)
		return updatedBuyingPower
	}
}

export default function reducer(state = initialState, action) {
	const newState = { ...state }
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case UPDATE_USER:
			newState.user.buy_power = action.payload.buy_power
			// console.log("TIRED", newState)
			return newState
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
