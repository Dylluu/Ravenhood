// const GET_ALL_TRANSACTIONS = "stocks/GET_ALL_TRANSACTIONS"
const GET_ONE_STOCK_TRANSACTIONS_BY_USER_ID = "stocks/GET_ONE_STOCK_TRANSACTIONS_BY_USER_ID"
const CLEAN_UP_TRANSACTIONS = "stocks/CLEANUP"
const GET_ALL_OF_MY_TRANSACTIONS = "stocks/GET_ALL_OF_MY_TRANSACTIONS"

// const getAllTransactionsAction = (payload) => ({
//     type: GET_ALL_TRANSACTIONS,
//     payload
// });

const getStockTransactionsByUserIdAction = (payload) => ({
    type: GET_ONE_STOCK_TRANSACTIONS_BY_USER_ID,
    payload
});

const getAllOfMyTransactionsAction = (payload) => ({
    type: GET_ALL_OF_MY_TRANSACTIONS,
    payload
})

export const cleanUpTransactions = () => {
    return {
        type: CLEAN_UP_TRANSACTIONS
    }
}

export const createBuyTransaction = (transaction) => async (dispatch) => {
    // console.log("buy", transaction)
    const response = await fetch(`/api/stocks/${transaction.symbol}/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
    })
}

export const createSellTransaction = (transaction) => async (dispatch) => {
    // console.log("sell", transaction)
    const response = await fetch(`/api/stocks/${transaction.symbol}/sell`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
    })
}

// export const getAllTransactions = () => async (dispatch) => {
//     const response = await fetch("/api/stocks")

//     if (response.ok) {
//         const allTransactions = await response.json()
//         dispatch(getAllTransactionsAction(allTransactions))
//     }
// }

export const getStockTransactionsByUserId = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${symbol}`)

    if (response.ok) {
        const myTransactions = await response.json()
        dispatch(getStockTransactionsByUserIdAction(myTransactions))
    }
}

export const getAllOfMyTransactions = () => async (dispatch) => {
    const response = await fetch(`/api/stocks`)

    if (response.ok) {
        const allMyTransactions = await response.json()
        dispatch(getAllOfMyTransactionsAction(allMyTransactions))
    }
}

const initialState = {
    // allTransactions: {},
    currentStockTransactionsByUserId: {},
    allOfMyTransactions: {}
}

const transactions = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        // case GET_ALL_TRANSACTIONS:
        //     const allTransactions = {};
        //     action.payload.transactions.forEach(transaction => {
        //         allTransactions[transaction.id] = transaction
        //     })
        //     newState.allTransactions = allTransactions
        //     return newState

        case GET_ONE_STOCK_TRANSACTIONS_BY_USER_ID:
            newState.currentStockTransactionsByUserId = action.payload
            return newState

        case CLEAN_UP_TRANSACTIONS:
            newState.currentStockTransactionsByUserId = {}
            newState.allOfMyTransactions = {}
            return newState

        case GET_ALL_OF_MY_TRANSACTIONS:
            newState.allOfMyTransactions = action.payload
            return newState

        default:
            return state
    }
}

export default transactions;
