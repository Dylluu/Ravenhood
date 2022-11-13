const GET_ALL_WATCHLIST = 'watchlist/GET_ALL_WATCHLIST';
const GET_ONE_WATCHLIST = 'watchlist/GET_ONE_WATCHLIST';
const POST_WATCHLIST = 'watchlist/POST_WATCHLIST';
const UPDATE_WATCHLIST = 'watchlist/UPDATE_WATCHLIST';
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST';

const getAllWatchlist = (payload) => ({
  type: GET_ALL_WATCHLIST,
  payload
});

const getOneWatchlist = (payload) => ({
  type: GET_ONE_WATCHLIST,
  payload
})

const postWatchlist = (payload) => ({
  type: POST_WATCHLIST,
  payload
})

const updateWatchlist = (payload) => ({
  type: UPDATE_WATCHLIST,
  payload
})

const deleteWatchlist = (id) => ({
  type: DELETE_WATCHLIST,
  id
})



const initialState = {}

export default function watchlist(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WATCHLIST:
      let newStateGetAll = {...state}
      newStateGetAll.allWatchlist = {...action.payload}
      return newStateGetAll;
    case GET_ONE_WATCHLIST:
      let newStateGetOne = {...state}
      newStateGetOne.watchlist = {...action.payload}
      return newStateGetOne;
    case POST_WATCHLIST:
      // WIP
      return 'hi'
    case UPDATE_WATCHLIST:
      let newStateUpdate = {...state}
      newStateUpdate[action.payload.id] = action.payload
      return newStateUpdate
    case DELETE_WATCHLIST:
      let newStateDelete = {...state}
      delete newStateDelete[action.id]
      return newStateDelete
    default:
      return state;
  }
}
