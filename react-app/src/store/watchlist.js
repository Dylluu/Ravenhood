const GET_ALL_WATCHLIST = 'watchlist/GET_ALL_WATCHLIST';
const GET_ONE_WATCHLIST = 'watchlist/GET_ONE_WATCHLIST';
const POST_WATCHLIST = 'watchlist/POST_WATCHLIST';
const UPDATE_WATCHLIST = 'watchlist/UPDATE_WATCHLIST';
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST';
const GET_ALL_STOCKS = 'watchlist/GET_ALL_STOCKS'
const POST_STOCKS = 'watchlist/POST_STOCKS'
const DELETE_STOCKS = 'watchlist/DELETE_STOCKS'

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

const getAllStocks = (payload) => ({
  type: GET_ALL_STOCKS,
  payload
})

const postStocks = (payload) => ({
  type: POST_STOCKS,
  payload
})

const deleteStocks = (id) => ({
  type: DELETE_STOCKS,
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
    case GET_ALL_STOCKS:
      let newStateGetStocks = {...state}
      newStateGetStocks.allStocks = {...action.payload}
      return newStateGetStocks
    case POST_WATCHLIST:
      let newStateCreate = {...state}
      let id = action.payload.id
      newStateCreate.allWatchlist[id] = action.payload
      return newStateCreate
    case POST_STOCKS:
      let newStateCreateStocks = {...state}
      let stockId = action.payload.id
      newStateCreateStocks.allStocks[stockId] = action.payload
      return newStateCreateStocks
    case UPDATE_WATCHLIST:
      let newStateUpdate = {...state}
      newStateUpdate[action.payload.id] = action.payload
      return newStateUpdate
    case DELETE_WATCHLIST:
      let newStateDelete = {...state}
      delete newStateDelete[action.id]
      return newStateDelete
    case DELETE_STOCKS:
      let newStateDeleteStocks = {...state}
      delete newStateDeleteStocks[action.id]
      return newStateDeleteStocks
    default:
      return state;
  }
}
