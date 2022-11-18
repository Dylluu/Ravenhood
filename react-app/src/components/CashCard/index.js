import React from 'react';
import { useState } from 'react';
import "./cashcard.css"
import robinhoodCashCardLogo2 from "../../assets/robinhood-cash-card-logo-2.JPG"
import robinhoodCashCardLogo3 from "../../assets/cash-card-logo-3.JPG"
import robinhoodCashCardLogo4 from "../../assets/cash-card-logo-4.JPG"
import robinhoodCashCardLogo5 from "../../assets/cash-card-logo-5.JPG"
import robinhoodCashCardLogo6 from "../../assets/cash-card-logo-6.JPG"

function CashCard() {
    return (
        <div className="cashcard-wrapper">
            <div className="introducing-new-card-wrapper">
                <div className='introducing-new-card-wrapper-left'>
                    <div className="introducing-new-card-title">
                        Introducing the new Ravenhood Cash Card
                    </div>
                    <div className="introducing-new-card-detail">

                        The debit card with weekly rewards that help you build investing habits. Offered by Ravenhood Money, LLC.

                    </div>
                    <div className="introducing-new-card-disclosure">
                        <span>
                            View disclosures
                        </span>
                    </div>
                    <div className="introducing-new-card-button">
                        <button className='join-waitlist-button'>Join waitlist</button>
                    </div>
                </div>
                <div className='introducing-new-card-wrapper-right'>
                    <div className="introducing-new-card-logo">
                        <img src="https://media.giphy.com/media/pzgCEsq8mYtKKI7aLj/giphy.gif"></img>
                    </div>
                </div>
            </div>
            <div className='cash-card-detail-wrapper'>
                <div className='cash-card-detail-left'>
                    <div className="cash-card-detail-logo">
                        <img src={robinhoodCashCardLogo2} />
                    </div>
                </div>
                <div className='cash-card-detail-wrapper-right'>
                    <div className='cash-card-detail-1 cash-card-detail-card'>
                        <div className='cash-card-detail-1-left'>
                            <div className="cash-card-detail-1-logo">
                                <img src={robinhoodCashCardLogo3} />
                            </div>
                        </div>
                        <div className='cash-card-detail-1-right'>
                            <div className='cash-card-detail-1-right-title cash-card-detail-title'>
                                Earn rewards as you spend and round up
                            </div>
                            <div className='cash-card-detail-1-right-body cash-card-detail-body'>
                                Spend, round up, invest your change, and earn a 25% bonus each week.
                            </div>
                        </div>
                    </div>
                    <div className='cash-card-detail-2 cash-card-detail-card'>
                        <div className='cash-card-detail-2-left'>
                            <div className="cash-card-detail-2-logo">
                                <img src={robinhoodCashCardLogo4} />
                            </div>
                        </div>
                        <div className='cash-card-detail-2-right'>
                            <div className='cash-card-detail-2-right-title cash-card-detail-title'>
                                Invest a part of every paycheck
                            </div>
                            <div className='cash-card-detail-2-right-body cash-card-detail-body'>
                                Automatically invest a percent or dollar amount of every paycheck. Plus, get paid up to 2 days early.
                            </div>
                        </div>
                    </div>
                    <div className='cash-card-detail-3 cash-card-detail-card'>
                        <div className='cash-card-detail-3-left'>
                            <div className="cash-card-detail-3-logo">
                                <img src={robinhoodCashCardLogo5} />
                            </div>
                        </div>
                        <div className='cash-card-detail-3-right'>
                            <div className='cash-card-detail-3-right-title cash-card-detail-title'>
                                No hidden fees
                            </div>
                            <div className='cash-card-detail-3-right-body cash-card-detail-body'>
                                No monthly fees, in-network ATM fees, overdraft fees, or account minimums.
                            </div>
                        </div>
                    </div>
                    <div className='cash-card-detail-4 cash-card-detail-card'>
                        <div className='cash-card-detail-4-left'>
                            <div className="cash-card-detail-4-logo">
                                <img src={robinhoodCashCardLogo6} />
                            </div>
                        </div>
                        <div className='cash-card-detail-4-right'>
                            <div className='cash-card-detail-4-right-title cash-card-detail-title'>
                                Coming soon: cash back when you spend
                            </div>
                            <div className='cash-card-detail-4-right-body cash-card-detail-body'>
                                Save money at your favorite everyday brands, no activation required.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CashCard;
