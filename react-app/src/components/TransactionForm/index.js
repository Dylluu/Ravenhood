import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import * as transactionActions from "../../store/transaction"
import "./transactionform.css"
import { getStockLattestPrice } from "../../utils/fetchStockFunctions";

const TransactionForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user_id = useSelector(state => state.session.user.id)
    const { ticker } = useParams();
    const [isBuy, setisBuy] = useState(true);
    const [type, setType] = useState("Shares");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState({});
    const options = [
        { value: 'Shares', text: 'Shares' },
        { value: 'Dollars', text: 'Dollars' }
    ];
    let price = getStockLattestPrice(ticker) // NEED THE API PRICE
    console.log(price)
    let marketPrice = price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    let dollarAmount;
    let estimatedType;
    let isShares;
    let buyOrSell;

    const currentUserBuyPower = useSelector((state) => {
        let num = state?.session?.user?.buy_power
        let buyPower = num?.toLocaleString("en-US", { style: "currency", currency: "USD" })
        return buyPower
    })
    // console.log(currentUserBuyPower)

    const handleChange = event => {
        // console.log(event.target.value);
        setType(event.target.value);
        setAmount("")
    };

    if (type === "Shares" && isBuy) {
        let cost = price * amount
        dollarAmount = cost.toLocaleString("en-US", { style: "currency", currency: "USD" })
        estimatedType = "Estimated Cost"
        isShares = true
        buyOrSell = "Buy"
    }

    if (type === "Dollars" && isBuy) {
        let quantity = (amount / price)
        dollarAmount = quantity.toLocaleString('en-US', { maximumFractionDigits: 6 })
        estimatedType = "Est.Quantity"
        isShares = false
        buyOrSell = "Buy"
    }

    if (type === "Shares" && !isBuy) {
        let cost = price * amount
        dollarAmount = cost.toLocaleString("en-US", { style: "currency", currency: "USD" })
        estimatedType = "Estimated Credit"
        isShares = true
        buyOrSell = "Sell"
    }

    if (type === "Dollars" && !isBuy) {
        let quantity = (amount / price)
        dollarAmount = quantity.toLocaleString('en-US', { maximumFractionDigits: 6 })
        estimatedType = "Est.Quantity"
        isShares = false
        buyOrSell = "Sell"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let numberOfShares;
        if (isBuy && type === "Shares") {
            numberOfShares = parseFloat(amount).toFixed(6)
        } else if (!isBuy && type === "Shares") {
            numberOfShares = -Math.abs(amount).toFixed(6)
        } else if (isBuy && type === "Dollars") {
            let quantity = amount / price
            numberOfShares = parseFloat(quantity).toFixed(6)
        } else if (!isBuy && type === "Dollars") {
            let quantity = amount / price
            numberOfShares = -Math.abs(quantity).toFixed(6)
        }

        const transaction = {
            symbol: ticker,
            user_id: user_id,
            is_purchase: isBuy,
            num_shares: numberOfShares,
            transaction_price: parseFloat(price)
        }

        let createdTransaction = null;

        if (transaction.is_purchase) {
            createdTransaction = await dispatch(transactionActions.createBuyTransaction(transaction))
                .catch(async (res) => {
                    const data = await res.json();
                    // console.log(data)
                    if (data && data.errors) setErrors(data.errors);
                });
        }

        if (!transaction.is_purchase) {
            createdTransaction = await dispatch(transactionActions.createSellTransaction(transaction))
                .catch(async (res) => {
                    const data = await res.json();
                    // console.log(data)
                    if (data && data.errors) setErrors(data.errors);
                });
        }

        if (createdTransaction) {
            // console.log(createdTransaction)
            await dispatch(transactionActions.getStockTransactionsByUserId(ticker))
        }
        // console.log("hi")
    }

    if (!currentUserBuyPower) return null;

    return (
        <div className="transaction-container">
            <div className="top-container">
                <div className="buy-sell-container">
                    <div className="transaction-type">
                        <button className={`transaction-type-button-off ${isBuy ? "transaction-type-button-on" : ""}`} onClick={(e) => setisBuy(true)}>Buy {ticker}</button>
                    </div>
                    <div className="transaction-type">
                        <button className={`transaction-type-button-off ${!isBuy ? "transaction-type-button-on" : ""}`} onClick={(e) => setisBuy(false)}>Sell {ticker}</button>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={`transaction-form-container-shares ${type == "Dollars" ? "transaction-form-container-dollars" : ""}`}>
                    <div className="transaction-order-type-container transaction-form-divs">
                        <div className="order-type">Order Type</div>
                        <div className="market-order">Market Order</div>
                    </div>

                    <div className="transaction-in-container transaction-form-divs">
                        <div className="transaction-in">{buyOrSell} In</div>
                        <select className="shares-dollars" value={type} onChange={handleChange}>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    {!isShares && (
                        <div className="transaction-amount-container transaction-form-divs">
                            <div className="transaction-amount">{type}</div>
                            <input
                                className="transaction-amount-input"
                                type="number"
                                value={amount}
                                onChange={(e) => { if (e.target.value.length < 8) setAmount(e.target.value) }}
                                placeholder="$0.00"
                                min="0"
                                max="10000000"
                                required
                                step="any"
                            />
                        </div>
                    )}
                    {isShares && (
                        <div className="transaction-amount-container transaction-form-divs">
                            <div className="transaction-amount">{type}</div>
                            <input
                                className="transaction-amount-input"
                                type="number"
                                value={amount}
                                onChange={(e) => { if (e.target.value.length < 8) setAmount(e.target.value) }}
                                placeholder="0"
                                min="0"
                                max="10000000"
                                required
                                step="any"
                            />
                        </div>
                    )}

                    {isShares && (
                        <div className="transaction-market-price-container transaction-form-divs">
                            <div className="market-price">Market Price</div>
                            <div className="market-price-amount">{marketPrice}</div>
                        </div>
                    )}
                    <div className="transaction-estimated-cost-container transaction-form-divs">
                        <div className="estimated-cost">{estimatedType}</div>
                        <div className="estimated-cost-amount">{dollarAmount}</div>
                    </div>
                </div>
                <div className="transaction-place-order-container">
                    <button className="review-order-button" type="submit">Review Order</button>
                </div>
                <div className="buying-power-container">
                    {currentUserBuyPower} buying power available
                </div>
            </form>
        </div>
    );
}

export default TransactionForm;
