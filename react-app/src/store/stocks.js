const GET_STOCK_DATA = 'stock/GET_STOCK_DATA';

const getStonk = (stonk) => ({
	type: GET_STOCK_DATA,
	stonk
});

export const getStonkData = (ticker) => async (dispatch) => {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	if (response.ok) {
		const data = await response.json();
		dispatch(getStonk(data));
	}
};

const initialState = { stock: null };

export default function stock(state = initialState, action) {
	const newState = { ...state };
	switch (action.type) {
		case GET_STOCK_DATA:
			newState.stock = action.stonk;
			return newState;
		default:
			return state;
	}
}
