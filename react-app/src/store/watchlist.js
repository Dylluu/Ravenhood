const GET_ALL_WATCHLIST = 'watchlist/GET_ALL_WATCHLIST';
const GET_ONE_WATCHLIST = 'watchlist/GET_ONE_WATCHLIST';
const POST_WATCHLIST = 'watchlist/POST_WATCHLIST';
const UPDATE_WATCHLIST = 'watchlist/UPDATE_WATCHLIST';
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST';

const getAllWatchlist = (watchlist) => ({
  type: GET_ALL_WATCHLIST,
  watchlist
});

const getOneWatchlist = (watchlist) => ({
  type: GET_ONE_WATCHLIST,
  watchlist
})

const postWatchlist = (watchlist) => ({
  type: POST_WATCHLIST,
  watchlist
})

const updateWatchlist = (watchlist) => ({
  type: UPDATE_WATCHLIST,
  watchlist
})

const deleteWatchlist = (watchlist) => ({
  type: DELETE_WATCHLIST,
  watchlist
})



const initialState = { watchlist: null}

export default function watchlist(state = initialState, action) {
  const newState = {...state};
  switch (action.type) {
    case GET_ALL_WATCHLIST:
      newState.watchlist = action.watchlist;
      return newState;
    case GET_ONE_WATCHLIST:
      newState.watchlist = action.watchlist;
      return newState;
    default:
      return state;
  }
}
