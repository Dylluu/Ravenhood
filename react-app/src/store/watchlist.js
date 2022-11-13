const GET_WATCHLIST = 'watchlist/GET_WATCHLIST';

const getWatchlist = (watchlist) => ({
  type: GET_WATCHLIST,
  watchlist
});

const initialState = { watchlist: null}

export default function watchlist(state = initialState, action) {
  const newState = {...state};
  switch (action.type) {
    case GET_WATCHLIST:
      newState.watchlist = action.watchlist;
      return newState;
    default:
      return state;
  }
}
