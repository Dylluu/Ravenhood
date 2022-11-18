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

const deleteStocks = (stock) => ({
  type: DELETE_STOCKS,
  stock
})

export const thunkGetAllWatchlist = (user_id) => async dispatch => {
  const response = await fetch('/api/watchlist')
  if(response.ok) {
    const list = await response.json()
    dispatch(getAllWatchlist(normalizeArrUser(list.watchlists, user_id)))
    // this might be actually no normalizeArr and  instead just list
  }
}

export const thunkGetOneWatchlist = (id) => async dispatch => {
  const response = await fetch(`/api/watchlist/${id}`)
  if(response.ok) {
    const watchlist = await response.json()
    dispatch(getOneWatchlist(watchlist))
  }
}

export const thunkPostWatchlist = (data) => async dispatch => {
  console.log(data)
  const response = await fetch(`/api/watchlist`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.ok) {
    const event = await response.json()
    dispatch(postWatchlist(event))
  }
}

export const thunkUpdateWatchlist = (data) => async dispatch => {
  const response = await fetch(`/api/watchlist/${data.watchlistId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const watchlist = await response.json();
    dispatch(updateWatchlist(watchlist))
    return watchlist
  }
}

export const thunkDeleteWatchlist = (id) => async dispatch => {
  const response = await fetch(`/api/watchlist/${id}`, {
    method: 'delete'
  })
  if (response.ok) {
    const watchlist = await response.json()
    console.log(watchlist)
    dispatch(deleteWatchlist(id))
    // return watchlist
  }
}

export const thunkGetAllStocks = (id) => async dispatch => {
  const response = await fetch(`/api/watchlist/${id}/stocks`)
  if(response.ok) {
    const list = await response.json()
    dispatch(getAllStocks(normalizeArr(list.stocks)))
    // this might be actually no normalizeArr and instead just list
  }
}

export const thunkPostStocks = (data) => async dispatch => {
  console.log('mydata',data)
  
  const response = await fetch(`/api/watchlist/${data.watchlist_id}/stocks`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log('myresponse', response)
  if(response.ok) {
    const stock = await response.json()
    console.log("mystock", stock)
    dispatch(postStocks(stock))
    return stock
  }
}

export const thunkDeleteStocks = (stock) => async dispatch => {
  const response = await fetch(`/api/watchlist/stocks/${stock.id}`, {
    method: 'delete'
  })
  if (response.ok) {
    const stock = await response.json()
    dispatch(deleteStocks(stock))
    return stock
  }
}

const initialState = {}

export default function watchlist(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WATCHLIST:
      let newStateGetAll = {...state}
      newStateGetAll.allWatchlists = {...action.payload}
      return newStateGetAll;
    case GET_ONE_WATCHLIST:
      let newStateGetOne = {...state}
      newStateGetOne.oneWatchlist = {...action.payload}
      return newStateGetOne;
    case GET_ALL_STOCKS:
      let newStateGetStocks = {...state}
      newStateGetStocks.allStocks = {...action.payload}
      return newStateGetStocks
    case POST_WATCHLIST:
      let newStateCreate = {...state}
      let id = action.payload.id
      console.log('my id', id)
      newStateCreate.allWatchlists[id] = action.payload
      return newStateCreate
    case POST_STOCKS:
      let newStateCreateStocks = {...state}
      let stockId = action.payload.id
      console.log('my id', stockId)

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

const normalizeArr = (arr) => {
  if (!(arr instanceof Array)) throw new Error ("Invalid Data Type: Not an Array")
  let obj = {}
  arr.forEach(el => {
    obj[el.id] = el
  })
  return obj
}

const normalizeArrUser = (arr, user_id) => {
  if (!(arr instanceof Array)) throw new Error ("Invalid Data Type: Not an Array")
  let obj = {}
  arr.forEach(el => {
    if (el.user_id === user_id)
      obj[el.id] = el
  })
  return obj
}
