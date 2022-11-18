import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import * as transactionActions from '../../store/transaction';
import * as sessionActions from "../../store/session"
import {
    thunkGetWholePortfolio,
    thunkAddStockToPortfolio,
    thunkUpdateStockInPortfolio,
    thunkDeleteStockInPortfolio
} from '../../store/portfolio';
import './transactionform.css';
import useStockPriceContext from "../../context/stockCurrentPrice";
import SiteColorContext from "../../context/SiteColor";


const TransactionForm = () => {
    const dispatch = useDispatch();
    const { priceContext } = useStockPriceContext()
    const { siteColor } = SiteColorContext()
    const history = useHistory();
    const user_id = useSelector((state) => state.session.user.id);
    const portfolio = useSelector((state) => state.portfolio.userPortfolio);
    const buyingPowerInt = useSelector((state) => state.session.user.buy_power)
    const { ticker } = useParams();
    const [isBuy, setisBuy] = useState(true);
    const [type, setType] = useState("Shares");
    const [amount, setAmount] = useState("");
    // const [finalPrice, setFinalPrice] = useState("")
    const [finalCost, setFinalCost] = useState("")
    const [finalAmount, setFinalAmount] = useState("")
    const [errors, setErrors] = useState({});
    const [inputErrors, setInputErrors] = useState({})
    const [isPlaced, setIsPlaced] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const options = [
        { value: 'Shares', text: 'Shares' },
        { value: 'Dollars', text: 'Dollars' }
    ];
    let price = priceContext // NEED THE API PRICE
    let marketPrice = price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    let dollarAmount;
    let dollarAmountInt;
    let estimatedType;
    let isShares;
    let dollarsToShares;
    let buyOrSell;
    let isGreen;

    useEffect(() => {
        dispatch(thunkGetWholePortfolio(user_id));
        dispatch(transactionActions.getStockTransactionsByUserId(ticker));
        dispatch(transactionActions.getAllOfMyTransactions());
    }, [dispatch]);

    const currentUserBuyPower = useSelector((state) => {
        let num = state?.session?.user?.buy_power;
        let buyPower = num?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return buyPower;
    });
    // console.log(currentUserBuyPower)

    const handleChange = (event) => {
        // console.log(event.target.value);
        setType(event.target.value);
        setAmount('');
        setInputErrors({});
    };

    if (type === 'Shares' && isBuy) {
        let cost = price * amount;
        dollarAmount = cost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        dollarAmountInt = parseFloat(cost)
        estimatedType = 'Estimated Cost';
        isShares = true;
        buyOrSell = 'Buy';
    }

    if (type === 'Dollars' && isBuy) {
        let quantity = amount / price;
        dollarAmount = quantity.toLocaleString('en-US', {
            maximumFractionDigits: 6
        });
        dollarAmountInt = parseFloat(quantity)
        estimatedType = 'Est.Quantity';
        isShares = false;
        buyOrSell = 'Buy';
        dollarsToShares = quantity;
    }

    if (type === 'Shares' && !isBuy) {
        let cost = price * amount;
        dollarAmount = cost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        dollarAmountInt = parseFloat(cost)
        estimatedType = 'Estimated Credit';
        isShares = true;
        buyOrSell = 'Sell';
    }

    if (type === 'Dollars' && !isBuy) {
        let quantity = amount / price;
        dollarAmount = quantity.toLocaleString('en-US', {
            maximumFractionDigits: 6
        });
        dollarAmountInt = parseFloat(quantity)
        estimatedType = 'Est.Quantity';
        isShares = false;
        buyOrSell = 'Sell';
        dollarsToShares = quantity;
    }

    if (siteColor === "green") {
        isGreen = true
    } else if (siteColor === "red") {
        isGreen = false
    }

    // This is for finding the # of shares owned in the current page's state
    let sharesOwned;
    for (let [key, value] of Object.entries(portfolio)) {
        // console.log(`${key}: ${value}`)
        if (value.symbol === `${ticker}`) {
            sharesOwned = value.num_shares
        }
    }

    const handleInputChange = (e) => {
        // console.log(type)
        if (e.target.value.length < 8) setAmount(e.target.value)
        if (!isBuy && type === "Shares") {
            if (e.target.value > sharesOwned) {
                setInputErrors({ error: "Not Enough shares" })
                // console.log("e", amount, sharesOwned)
            } else {
                setInputErrors("")
                // console.log("no e", amount, sharesOwned)
            }
        }
        if (isBuy && type === "Shares") {
            if (e.target.value * price > buyingPowerInt) {
                setInputErrors({ error: "Not Enough Funds" })
                // console.log("e", e.target.value * price, buyingPowerInt)
            } else {
                setInputErrors("")
                // console.log("no e", e.target.value * price, buyingPowerInt)
            }
        }
        if (!isBuy && type === "Dollars") {
            if (e.target.value / price > sharesOwned) {
                setInputErrors({ error: "Not Enough Shares" })
                // console.log("e", e.target.value / price, sharesOwned)
            } else {
                setInputErrors("")
                // console.log("no e", e.target.value / price, sharesOwned)
            }
        }
        if (isBuy && type === "Dollars") {
            if (e.target.value > buyingPowerInt) {
                setInputErrors({ error: "Not Enough Funds" })
                // console.log("e", e.target.value, buyingPowerInt)
            } else {
                setInputErrors("")
                // console.log("no e", e.target.value, buyingPowerInt)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputErrors) {

            let numberOfShares;
            if (isBuy && type === 'Shares') {
                numberOfShares = parseFloat(amount).toFixed(6);
            } else if (!isBuy && type === 'Shares') {
                numberOfShares = -Math.abs(amount).toFixed(6);
            } else if (isBuy && type === 'Dollars') {
                let quantity = amount / price;
                numberOfShares = parseFloat(quantity).toFixed(6);
            } else if (!isBuy && type === 'Dollars') {
                let quantity = amount / price;
                numberOfShares = -Math.abs(quantity).toFixed(6);
            }

            const transaction = {
                symbol: ticker,
                user_id: user_id,
                is_purchase: isBuy,
                num_shares: numberOfShares,
                transaction_price: parseFloat(price)
            };

            const portfolioTrans = {
                symbol: ticker,
                user_id: user_id,
                num_shares: parseFloat(numberOfShares),
                average_price: parseFloat(price)
            };

            const updateBuyPower = {
                buy_power: -(numberOfShares * parseFloat(price))
            }

            // console.log("WORKING BP OBJ", updateBuyPower)

            let createdTransaction = null;
            let createdPortfolioTransaction = null;
            // console.log('transaction', transaction)
            if (transaction.is_purchase) {
                createdTransaction = await dispatch(
                    transactionActions.createBuyTransaction(transaction)
                ).catch(async (res) => {
                    const data = await res.json();
                    // console.log(data)
                    if (data && data.errors) setErrors(data.errors);
                });

                const updatedUser = await dispatch(
                    sessionActions.thunkAddBuyPower(updateBuyPower, user_id)
                )

                // .catch(async (res) => {
                //     const data = await res.json();
                //     console.log("DDDDDDDDD", data)
                //     if (data && data.errors) setErrors(data.errors);
                // });

                for (let i = 0; i < Object.keys(portfolio).length; i++) {
                    // console.log('stock ticker', portfolio[i].symbol, i)
                    if (portfolio[i].symbol == ticker) {
                        createdPortfolioTransaction = await dispatch(
                            thunkUpdateStockInPortfolio(portfolioTrans)
                        )
                        break
                    }
                    if (i == Object.keys(portfolio).length - 1 && portfolio[i].symbol !== ticker) {
                        createdPortfolioTransaction = await dispatch(
                            thunkAddStockToPortfolio(portfolioTrans)
                        ).catch(async (res) => {
                            const data = await res.json();
                            // console.log("ADD STOCK", data)
                            if (data && data.errors) setErrors(data.errors);
                        });
                        break
                    }
                }
                if (Object.keys(portfolio).length == 0) {
                    createdPortfolioTransaction = await dispatch(
                        thunkAddStockToPortfolio(portfolioTrans)
                    ).catch(async (res) => {
                        const data = await res.json();
                        // console.log("ADD STOCK", data)
                        if (data && data.errors) setErrors(data.errors);
                    });
                }
            }

            if (!transaction.is_purchase) {

                createdTransaction = await dispatch(
                    transactionActions.createSellTransaction(transaction)
                ).catch(async (res) => {
                    const data = await res.json();
                    // console.log(data)
                    if (data && data.errors) setErrors(data.errors);
                });

                const updatedUser = await dispatch(
                    sessionActions.thunkAddBuyPower(updateBuyPower, user_id)
                )

                for (let i = 0; i < Object.keys(portfolio).length; i++) {
                    if (portfolio[i].num_shares + numberOfShares >= 0) {
                        if (portfolio[i].num_shares + numberOfShares === 0 && portfolio[i].symbol == ticker) {
                            setDeleted(true)
                            createdPortfolioTransaction = await dispatch(
                                thunkDeleteStockInPortfolio(portfolio[i].id)
                            ).catch(async (res) => {
                                const data = await res.json();
                                // console.log(data)
                                if (data && data.errors) setErrors(data.errors);
                            });
                            break
                        } else if (portfolio[i].symbol == ticker) {
                            createdPortfolioTransaction = await dispatch(
                                thunkUpdateStockInPortfolio(portfolioTrans)
                            ).catch(async (res) => {
                                const data = await res.json();
                                // console.log(data)
                                if (data && data.errors) setErrors(data.errors);
                            });
                        }
                    }

                }
            }

            // console.log("BREAKKKKKKK1")

            if (transaction.is_purchase || !transaction.is_purchase) {
                createdTransaction = 1
            }
            // console.log("CC", createdTransaction)
            if (createdTransaction) {
                // console.log(createdTransaction)
                await dispatch(transactionActions.getStockTransactionsByUserId(ticker))
                // setFinalPrice(price.toLocaleString("en-US", { style: "currency", currency: "USD" }))
                // console.log("BOOOOOOOOOO")
                setFinalCost(dollarAmount)
                setIsPlaced(true)
                setFinalAmount(amount.toLocaleString(undefined, { maximumFractionDigits: 2 }))
            }
        }
        // console.log("BREAKKKKKKK2")
    }

    if (!currentUserBuyPower) return null;

    return (
        <>
            {!isPlaced && (
                <div className="transaction-container">
                    <div className="top-container">
                        {isGreen && (
                            <div className="buy-sell-container">
                                <div className="transaction-type">
                                    <button className={`transaction-type-button-off ${isBuy ? "transaction-type-button-on" : ""}`} onClick={(e) => setisBuy(true)}>Buy {ticker}</button>
                                </div>
                                <div className="transaction-type">
                                    <button className={`transaction-type-button-off ${!isBuy ? "transaction-type-button-on" : ""}`} onClick={(e) => setisBuy(false)}>Sell {ticker}</button>
                                </div>
                            </div>
                        )}
                        {!isGreen && (
                            <div className="buy-sell-container">
                                <div className="transaction-type">
                                    <button className={`transaction-type-button-off-red ${isBuy ? "transaction-type-button-on-red" : ""}`} onClick={(e) => setisBuy(true)}>Buy {ticker}</button>
                                </div>
                                <div className="transaction-type">
                                    <button className={`transaction-type-button-off-red ${!isBuy ? "transaction-type-button-on-red" : ""}`} onClick={(e) => setisBuy(false)}>Sell {ticker}</button>
                                </div>
                            </div>
                        )}
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
                                        placeholder="$0.00"
                                        min="0"
                                        max="10000000"
                                        step=".01"
                                        required
                                        onChange={(e) => { handleInputChange(e) }}
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
                                        placeholder="0"
                                        min="0"
                                        max="10000000"
                                        step="any"
                                        required
                                        onChange={(e) => { handleInputChange(e) }}
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
                        {isGreen && (
                            <div className="transaction-place-order-container">
                                <div className='input-error-container'>
                                    <ul className="input-error">
                                        {Object.values(inputErrors).map((error, idx) =>
                                            <li key={idx}>
                                                <i class="fa-solid fa-circle-exclamation"></i>
                                                &nbsp;&nbsp;
                                                {error}
                                            </li>)}
                                    </ul>
                                </div>
                                {!inputErrors.value && (
                                    <div className='review-order-button-container-errors'>
                                        <button
                                            className="review-order-button"
                                            type="submit"
                                        >Review Order</button>
                                    </div>
                                )}
                                {inputErrors.value && (
                                    <div className='review-order-button-container'>
                                        <button
                                            className="review-order-button"
                                            type="submit"
                                        >Review Order</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isGreen && (
                            <div className="transaction-place-order-container">
                                <div className='input-error-container'>
                                    <ul className="input-error">
                                        {Object.values(inputErrors).map((error, idx) =>
                                            <li key={idx}>
                                                <i class="fa-solid fa-circle-exclamation"></i>
                                                &nbsp;&nbsp;
                                                {error}
                                            </li>)}
                                    </ul>
                                </div>
                                {!inputErrors.value && (
                                    <div className='review-order-button-container-errors'>
                                        <button
                                            className="review-order-button-red"
                                            type="submit"
                                        >Review Order</button>
                                    </div>
                                )}
                                {inputErrors.value && (
                                    <div className='review-order-button-container'>
                                        <button
                                            className="review-order-button-red"
                                            type="submit"
                                        >Review Order</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {isBuy && (
                            <div className="buying-power-container">
                                {currentUserBuyPower} buying power available
                            </div>
                        )}
                        {!isBuy && (
                            <div className="buying-power-container">
                                {sharesOwned} Shares Available
                            </div>
                        )}
                    </form>
                </div>
            )}
            {isPlaced && (
                <>
                    {isBuy && (
                        <div className="transaction-container">
                            <div className="top-container confirmation-top-container">
                                <div className="buy-sell-container">
                                    <div className="transaction-type">
                                        {`${ticker}`} Purchased!
                                    </div>
                                </div>
                            </div>
                            {type === "Shares" && (
                                <div className={"transaction-confirmation-container-dollars"}>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Amount Invested</div>
                                        <div className="market-order">{`${finalCost}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Shares Purchased</div>
                                        <div className="market-order">{`${finalAmount}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        Your order to buy {`${finalAmount} shares`} of {`${ticker}`} is complete.
                                    </div>
                                </div>
                            )}
                            {type === "Dollars" && (
                                <div className={"transaction-confirmation-container-dollars"}>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Amount Invested</div>
                                        <div className="market-order">{`$${finalAmount}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Shares Purchased</div>
                                        <div className="market-order">{`${finalCost}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        Your order to buy {`$${finalAmount} `} of {`${ticker}`} is complete.
                                    </div>
                                </div>
                            )}
                            {isGreen && (
                                <div className="transaction-place-order-container">
                                    <button
                                        className="review-order-button"
                                        type="submit"
                                        onClick={(e) => {
                                            setType("Shares")
                                            setAmount('')
                                            setIsPlaced(false)
                                        }}
                                    >Done</button>
                                </div>
                            )}
                            {!isGreen && (
                                <div className="transaction-place-order-container">
                                    <button
                                        className="review-order-button-red"
                                        type="submit"
                                        onClick={(e) => {
                                            setType("Shares")
                                            setAmount('')
                                            setIsPlaced(false)
                                        }}
                                    >Done</button>
                                </div>
                            )}

                        </div>
                    )}
                    {!isBuy && (
                        <div className="transaction-container">
                            <div className="top-container confirmation-top-container">
                                <div className="buy-sell-container">
                                    <div className="transaction-type">
                                        {`${ticker}`} Sold
                                    </div>
                                </div>
                            </div>
                            {type === "Shares" && (
                                <div className={"transaction-confirmation-container-dollars"}>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Shares Sold</div>
                                        <div className="market-order">{`${finalAmount}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Total Credit</div>
                                        <div className="market-order">{`${finalCost}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        Your order to sell {`${finalAmount} shares`} of {`${ticker}`} is complete.
                                    </div>
                                </div>
                            )}
                            {type === "Dollars" && (
                                <div className={"transaction-confirmation-container-dollars"}>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Shares Sold</div>
                                        <div className="market-order">{`${finalCost}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        <div className="order-type">Total Credit</div>
                                        <div className="market-order">{`$${finalAmount}`}</div>
                                    </div>
                                    <div className="transaction-order-type-container transaction-form-divs transaction-confirmation-divs">
                                        Your order to sell {`$${finalAmount}`} of {`${ticker}`} is complete.
                                    </div>
                                </div>
                            )}
                            {isGreen && (
                                <div className="transaction-place-order-container">
                                    <button
                                        className="review-order-button"
                                        type="submit"
                                        onClick={(e) => {
                                            setType("Shares")
                                            setAmount('')
                                            setIsPlaced(false)
                                        }}
                                    >Done</button>
                                </div>
                            )}
                            {!isGreen && (
                                <div className="transaction-place-order-container">
                                    <button
                                        className="review-order-button-red"
                                        type="submit"
                                        onClick={(e) => {
                                            setType("Shares")
                                            setAmount('')
                                            setIsPlaced(false)
                                        }}
                                    >Done</button>
                                </div>
                            )}

                        </div>
                    )}
                </>
            )
            }
        </>
    );
};

export default TransactionForm;
