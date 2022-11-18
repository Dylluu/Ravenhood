import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import './TransactionHistory.css';


function TransactionHistory () {

    const user = useSelector((state) => state.session.user);

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
                        {/* <span id="first-transaction">When you have your first transaction, it will show up here.</span> */}
                        <span id="history-title">History</span>
                        <div className="each-transaction">
                            <div className="each-transaction-inner">
                                <div className="each-transaction-inner-left">
                                    <span className="transaction-history-label">Apple Buy</span>
                                    <span className="transaction-history-date">Nov 10</span>
                                </div>
                                <div className="each-transaction-inner-right">
                                    <span className="transaction-history-label">$145.39</span>
                                    <span className="transaction-history-date">1 share at $145.39</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory;
