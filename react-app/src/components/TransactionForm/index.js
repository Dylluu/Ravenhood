import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import transactions, * as transactionActions from "../../store/transaction"
import "./transactionform.css"

const TransactionForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { ticker } = useParams();
    const [activity, setActivity] = useState("Buy");
    const [type, setType] = useState("Shares");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState({});
    // const [buyButton, setBuyButton] = useState(true);
    // const [sellButton, setSellButton] = useState(false);
    const options = [
        { value: 'Shares', text: 'Shares' },
        { value: 'Dollars', text: 'Dollars' }
    ];
    let price = 99.95 // NEED THE API PRICE
    let marketPrice = price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    let dollarAmount;
    let estimatedType;
    let isShares;

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

    if (type === "Shares" && activity === "Buy") {
        let cost = price * amount
        dollarAmount = cost.toLocaleString("en-US", { style: "currency", currency: "USD" })
        estimatedType = "Estimated Cost"
        isShares = true
    }

    if (type === "Dollars" && activity === "Buy") {
        let quantity = (amount / price)
        dollarAmount = quantity.toLocaleString('en-US', { maximumFractionDigits: 6 })
        estimatedType = "Est.Quantity"
        isShares = false
    }

    if (type === "Shares" && activity === "Sell") {
        let cost = price * amount
        dollarAmount = cost.toLocaleString("en-US", { style: "currency", currency: "USD" })
        estimatedType = "Estimated Credit"
        isShares = true
    }

    if (type === "Dollars" && activity === "Sell") {
        let quantity = (amount / price)
        dollarAmount = quantity.toLocaleString('en-US', { maximumFractionDigits: 6 })
        estimatedType = "Est.Quantity"
        isShares = false
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
            await dispatch(transactionActions.getStockTransactionsByUserId(ticker))
        }
    }

    if (!currentUserBuyPower) return null;

    return (
        <div className="transaction-container">
            <div className="top-container">
                <div className="buy-sell-container">
                    <div className="transaction-type">
                        <button className={`transaction-type-button-off ${activity == "Buy" ? "transaction-type-button-on" : ""}`} onClick={(e) => setActivity("Buy")}>Buy {ticker}</button>
                    </div>
                    <div className="transaction-type">
                        <button className={`transaction-type-button-off ${activity == "Sell" ? "transaction-type-button-on" : ""}`} onClick={(e) => setActivity("Sell")}>Sell {ticker}</button>
                    </div>
                </div>
            </div>
            <div className={`transaction-form-container-shares ${type ==
                "Dollars" ? "transaction-form-container-dollars" : ""}`}>
                <div className="transaction-order-type-container transaction-form-divs">
                    <div className="order-type">Order Type</div>
                    <div className="market-order">Market Order</div>
                </div>
                <form>
                    <div className="transaction-in-container transaction-form-divs">
                        <div className="transaction-in">{activity} In</div>
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
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="$0.00"
                                min="0"
                                max="1"
                                required
                                onInput={(e) => e.target.value = e.target.value.slice(0, 12)}
                            />
                        </div>
                    )}
                    {isShares && (
                        <div className="transaction-amount-container transaction-form-divs">
                            <div className="transaction-amount">{type}</div>
                            <input
                                className="transaction-amount-input"
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                required
                                onInput={(e) => e.target.value = e.target.value.slice(0, 12)}
                            />
                        </div>
                    )}
                </form>
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
                <button className="review-order-button">Review Order</button>
            </div>
            <div className="buying-power-container">
                {currentUserBuyPower} buying power available
            </div>
        </div>
    );
}

export default TransactionForm;
