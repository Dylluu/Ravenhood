import React from 'react';
import { useState } from 'react';

function CashCard() {
    return (
        <div className="cashcard-wrapper">
            <div className="introducing-new-card-wrapper">
                <div className='introducing-new-card-wrapper-left'>
                    <div className="introducing-new-card-title">
                        <p>
                            Introducing the new Robinhood Cash Card
                        </p>
                    </div>
                    <div className="introducing-new-card-detail">
                        <p>
                            The debit card with weekly rewards that help you build investing habits. Offered by Robinhood Money, LLC.
                        </p>
                    </div>
                    <div className="introducing-new-card-disclosure">
                        <span>
                            View disclosures
                        </span>
                    </div>
                    <div className="introducing-new-card-button">
                        <button>Join waitlist</button>
                    </div>
                </div>
                <div className='introducing-new-card-wrapper-right'>
                    <div className="introducing-new-card-logo"></div>
                </div>
            </div>
            <div className='cash-card-detail-wrapper'>
                <div className='cash-card-detail-left'>
                    <div className="cash-card-detail-logo"></div>
                </div>
                <div className='cash-card-detail-wrapper-right'>
                    <div className='cash-card-detail-1'>
                        <div className='cash-card-detail-1-left'>
                            <div className="cash-card-detail-1-logo"></div>
                        </div>
                        <div className='cash-card-detail-1-right'>
                            <div className='cash-card-detail-1-right-title'>
                                <p>
                                    Earn rewards as you spend and round up
                                </p>
                            </div>
                            <div className='cash-card-detail-1-right-body'>
                                <p>
                                    Spend, round up, invest your change, and earn a 25% bonus each week.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='cash-card-detail-2'>
                        <div className='cash-card-detail-2-left'>
                            <div className="cash-card-detail-2-logo"></div>
                        </div>
                        <div className='cash-card-detail-2-right'>
                            <div className='cash-card-detail-2-right-title'>
                                <p>
                                    Invest a part of every paycheck
                                </p>
                            </div>
                            <div className='cash-card-detail-2-right-body'>
                                <p>
                                    Automatically invest a percent or dollar amount of every paycheck. Plus, get paid up to 2 days early.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='cash-card-detail-3'>
                        <div className='cash-card-detail-3-left'>
                            <div className="cash-card-detail-3-logo"></div>
                        </div>
                        <div className='cash-card-detail-3-right'>
                            <div className='cash-card-detail-3-right-title'>
                                <p>
                                    No hidden fees
                                </p>
                            </div>
                            <div className='cash-card-detail-3-right-body'>
                                <p>
                                    No monthly fees, in-network ATM fees, overdraft fees, or account minimums.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='cash-card-detail-4'>
                        <div className='cash-card-detail-4-left'>
                            <div className="cash-card-detail-4-logo"></div>
                        </div>
                        <div className='cash-card-detail-4-right'>
                            <div className='cash-card-detail-4-right-title'>
                                <p>
                                    Coming soon: cash back when you spend
                                </p>
                            </div>
                            <div className='cash-card-detail-4-right-body'>
                                <p>
                                    Save money at your favorite everyday brands, no activation required.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CashCard;
