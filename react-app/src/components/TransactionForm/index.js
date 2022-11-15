import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import transactions, * as transactionActions from "../../store/transaction"
import "./transactionform.css"

const TransactionForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { symbol } = useParams();
    const [activity, setActivity] = useState("Buy")
    const [type, setType] = useState("Shares");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState({});
    let price = 99.95 // NEED THE API PRICE
    let dollarAmount;

    const currentUserBuyPower = useSelector((state) => {
        let num = state?.session?.user?.buy_power
        let buyPower = num.toLocaleString("en-US", { style: "currency", currency: "USD" })
        return buyPower
    })
    // console.log(currentUserBuyPower)

    if (type === "Shares") {
        let cost = price * amount
        dollarAmount = cost.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transaction = {
            type: type,
            amount: amount,
        }

        const createdTransaction = await dispatch(transactionActions.createTransaction(transaction))
            .catch(async (res) => {
                const data = await res.json();
                // console.log(data)
                if (data && data.errors) setErrors(data.errors);
            });

        if (createdTransaction) {
            //console.log(createdTransaction)
            await dispatch(transactionActions.getStockTransactionsByUserId(symbol))
        }
    }

    if (!currentUserBuyPower) return null;

    return (
        <div className="transaction-container">
            <div className="buy-sell-container">
                <div className="transaction-type">
                    <button className="transaction-type-button">Buy {symbol}</button>
                </div>
                <div className="transaction-type">
                    <button className="transaction-type-button">Sell {symbol}</button>
                </div>
            </div>
            <div className="transaction-form-container">
                <div className="transaction-order-type-container transaction-form-divs">
                    <div className="order-type">Order Type</div>
                    <div className="market-order">Market Order</div>
                </div>
                <form>
                    <div className="transaction-in-container transaction-form-divs">
                        <div className="transaction-in">{activity} In</div>
                        <select className="shares-dollars">
                            <option value="Shares">Shares</option>
                            <option value="Dollars">Dollars</option>
                        </select>
                    </div>
                    <div className="transaction-amount-container transaction-form-divs">
                        <div className="transaction-amount">{type}</div>
                        <input
                            className="transaction-amount-input"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            min=".01"
                            required
                        />
                    </div>
                </form>
                <div className="transaction-market-price-container transaction-form-divs">
                    <div className="market-price">Market Price</div>
                    <div className="market-price-amount">{price}</div>
                </div>
                <div className="transaction-estimated-cost-container transaction-form-divs">
                    <div className="estimated-cost">Estimated Cost</div>
                    <div className="estimated-cost-amount">{dollarAmount}</div>
                </div>
                <div className="transaction-place-order-container">
                    <button className="review-order-button">Review Order</button>
                </div>
            </div>
            <div className="buying-power-container">
                {currentUserBuyPower} buying power available
            </div>
        </div>
    );
}

export default TransactionForm;
