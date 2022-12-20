import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import transactions, { getAllOfMyTransactions } from '../../store/transaction';
import './TransactionHistory.css';
import TickerSymbols from '../../utils/stocksSymbols';


function TransactionHistory() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const userTransactions = useSelector((state) => state.transactions.allOfMyTransactions);
    let userTransactionsArray = Object.values(userTransactions);
    const userTransactionsReversed = userTransactionsArray.reverse();

    function parseTransactionDate(date) {
        let splitDate = date.split(' ');
        return `${splitDate[2]} ${splitDate[1]}`;
    }

    useEffect(() => {
        dispatch(getAllOfMyTransactions())
        // console.log(userTransactionsArray, '----------')
        // console.log(TickerSymbols)
    }, [dispatch])

    if(!userTransactions) return null;

    return (
        <div className="transaction-history-wrapper">
            <div className="transaction-history-user-name">
                <div className="transaction-history-name-inner">
                    <span>{user.first_name} {user.last_name}</span>
                </div>
            </div>
            <div className="transaction-history-list-wrapper">
                <div className="transaction-history-list-inner">
                    <div className="transaction-history">
                        {userTransactionsArray.length == 0 && <span id="first-transaction">When you have your first transaction, it will show up here.</span>}
                        {userTransactionsArray.length > 0 &&
                            <>
                                <span id="history-title">History</span>
                                {userTransactionsReversed.map((transaction) => (
                                    <div className="each-transaction"
                                        key={transaction.id}
                                    >
                                        <div className="each-transaction-inner">
                                            <div className="each-transaction-inner-left">
                                                <span className="transaction-history-label"
                                                    id="transaction-history-company"
                                                >{TickerSymbols?.TickerSymbols[transaction.symbol]?.name} {transaction.is_purchase ? 'Buy' : 'Sell'}</span>
                                                <span className="transaction-history-date">{parseTransactionDate(transaction.transaction_date)}</span>
                                            </div>
                                            <div className="each-transaction-inner-right">
                                                <span className="transaction-history-label">{transaction.transaction_price.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                })}</span>
                                                <span className="transaction-history-date">{Math.abs(transaction.num_shares)} {transaction.num_shares == 1 ? 'share' : 'shares'}</span>
                                            </div>
                                        </div>
                                    </div>))}
                            </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory;
