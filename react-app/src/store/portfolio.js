import { getAllTransactions } from "./transaction";

const GET_WHOLE_PORTFOLIO = 'portfolio/GET_WHOLE_PORTFOLIO'
const ADD_STOCK_TO_PORTFOLIO='portfolio/ADD_STOCK_TO_PORTFOLIO'
const UPDATE_STOCK_IN_PORTFOLIO='portfolio/UPDATE_STOCK_IN_PORTFOLIO'
const DELETE_STOCK_IN_PORTFOLIO='portfolio/DELETE_STOCK_IN_PORTFOLIO'


const getWholePortfolio = (payload) => ({
  type: GET_WHOLE_PORTFOLIO,
  payload
});

const addStockToPortfolio = (payload) => ({
  type: ADD_STOCK_TO_PORTFOLIO,
  payload
})

const updateStockInPortfolio = () => ({
  type: UPDATE_STOCK_IN_PORTFOLIO,
  payload
})

const deleteStockInPortfolio = () => ({
  type: DELETE_STOCK_IN_PORTFOLIO,
  payload
})


export const thunkGetWholePortfolio = (user_id) => async (dispatch) => {
  const response = await fetch (`/api/portfolio/${user_id}`)

  if (response.ok) {
    const wholePortfolio = await response.json()
    dispatch(getWholePortfolio(normalizeArrUser(wholePortfolio), user_id))
  }
}

export const thunkAddStockToPortfolio = (data) => async (dispatch) => {
  const response = await fetch (`/api/portfolio/${data.user_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const addToPortfolio = await response.json()
    dispatch(addStockToPortfolio(addToPortfolio))
  }
}

export const thunkUpdateStockInPortfolio = (data) => async (dispatch) => {
  const response = await fetch(`/api/portfolio/${data.symbol}`, {
    method: "PUT",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const updateInPortfolio = await response.json()
    dispatch(updateStockInPortfolio(updateInPortfolio))
  }
}

export const thunkDeleteStockInPortfolio = (symbol) => async (dispatch) => {
  const response = await fetch(`/api/portfolio/${symbol}`, {
    method: "DELETE",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const deleteFromPortfolio = await response.json()
    dispatch(deleteStockInPortfolio(deleteFromPortfolio))
  }
}


initialState = {}

const portfolio = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_WHOLE_PORTFOLIO:
      newState.userPortfolio = {...action.payload}
      return newState
    case ADD_STOCK_TO_PORTFOLIO:
      let symbol = action.payload.symbol
      newState.userPortfolio[symbol] = action.payload
      return newState
    case UPDATE_STOCK_IN_PORTFOLIO:
      newState[action.payload.symbol] = action.payload
      return newState
    case DELETE_STOCK_IN_PORTFOLIO:
      delete newState[action.symbol]
      return newState
    default:
      return state
  }
}

export default portfolio

const normalizeArrUser = (arr, user_id) => {
  if (!(arr instanceof Array)) throw new Error ("Invalid Data Type: Not an Array")
  let obj = {}
  arr.forEach(el => {
    if (el.user_id === user_id)
      obj[el.id] = el
  })
  return obj
}
