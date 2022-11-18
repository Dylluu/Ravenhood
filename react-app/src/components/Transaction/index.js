import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as transactionActions from "../../store/transaction";
import "./transaction.css";
import TransactionForm from "../TransactionForm";

const Transactions = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { ticker } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions)

    // let transactionsObj;
    // if (transactions) {
    //     transactionsObj = Object.values(transactions.transactionsByUserId)
    //     console.log(transactionsObj)
    // }


    useEffect(() => {
        dispatch(transactionActions.getStockTransactionsByUserId(ticker))
        dispatch(transactionActions.getAllOfMyTransactions())
        return () => {
            dispatch(transactionActions.cleanUpTransactions());
        }
    }, [dispatch], ticker);

    return (
        // { transactionsObj }
        <TransactionForm />
    )
}

export default Transactions;
