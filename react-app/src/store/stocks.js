const LOAD_ONE_WEEK = 'stocks/ONE_WEEK_DATA';
const LOAD_THREE_MONTHS = 'stocks/THREE_MONTHS_DATA';
const LOAD_ONE_YEAR = 'stocks/ONE_YEAR_DATA';
const LOAD_FIVE_YEAR = 'stocks/FIVE_YEAR_DATA';
const CLEAN_UP_STOCK_DATA = 'stocks/CLEAN_UP_STOCK_DATA';

export const loadOneWeek = (data) => {
	return {
		type: LOAD_ONE_WEEK,
		data
	};
};

export const loadThreeMonths = (data) => {
	return {
		type: LOAD_THREE_MONTHS,
		data
	};
};

export const loadOneYear = (data) => {
	return {
		type: LOAD_ONE_YEAR,
		data
	};
};

export const loadFiveYear = (data) => {
	return {
		type: LOAD_FIVE_YEAR,
		data
	};
};

export const cleanUpStockData = () => {
	return {
		type: CLEAN_UP_STOCK_DATA
	};
};
const initialState = {
	oneWeek: [],
	threeMonths: [],
	oneYear: [],
	fiveYear: []
};
export default function stockDataReducer(state = initialState, action) {
	const newState = { ...state };
	const cleanState = initialState;
	switch (action.type) {
		case LOAD_ONE_WEEK:
			newState.oneWeek = action.data;
			return newState;
		case LOAD_THREE_MONTHS:
			newState.threeMonths = action.data;
			return newState;
		case LOAD_ONE_YEAR:
			newState.oneYear = action.data;
			return newState;
		case LOAD_FIVE_YEAR:
			newState.fiveYear = action.data;
			return newState;
		case CLEAN_UP_STOCK_DATA:
			return cleanState;
		default:
			return state;
	}
}
