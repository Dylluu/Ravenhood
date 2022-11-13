import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Splash.css';
import repoImage from '../../assets/repo.png';
import linkedInLogo from '../../assets/linkedinLogo.png';
import gitHubLogo from '../../assets/gitLogo.png';
import stockBlocks from '../../assets/stockBlocks.png';

function Splash() {
    const [scrollNum, setScrollNum] = useState(1);
    const [menuOpen, setMenuOpen] = useState(true);
    const [locked, setLocked] = useState(false);
    const history = useHistory();
    function unlock() {
        setLocked(false)
    }
    const handleScrollForwardClick = () => {
        const splashFirst = document.getElementsByClassName('splash-first');
        window.scroll({ top: (splashFirst[0].offsetHeight + 60), behavior: 'smooth' })
        if (!locked) {
            setLocked(true);
            setTimeout(unlock, 500);
            if (scrollNum < 4) {
                const scrollDiv = document.getElementsByClassName('team-scroll');
                const backButton = document.getElementById('scroll-back');
                backButton.style.backgroundColor = 'black';
                backButton.style.color = 'white';
                scrollDiv[0].scrollLeft += 400;
                setScrollNum(scrollNum + 1);
                if (scrollNum === 3) {
                    const nextButton = document.getElementById('scroll-forward');
                    nextButton.style.backgroundColor = 'transparent';
                    nextButton.style.color = 'black';
                }
            }
        }
    }

    const handleScrollBackClick = () => {
        const splashFirst = document.getElementsByClassName('splash-first');
        window.scroll({ top: (splashFirst[0].offsetHeight + 60), behavior: 'smooth' })
        if (!locked) {
            setLocked(true);
            setTimeout(unlock, 500);
            if (scrollNum > 1) {
                const scrollDiv = document.getElementsByClassName('team-scroll');
                const nextButton = document.getElementById('scroll-forward');
                nextButton.style.color = 'white';
                nextButton.style.backgroundColor = 'black';
                scrollDiv[0].scrollLeft -= 400;
                setScrollNum(scrollNum - 1);
            }
            if (scrollNum === 2) {
                const backButton = document.getElementById('scroll-back');
                backButton.style.color = 'black';
                backButton.style.backgroundColor = 'transparent';
            }
        }
    }

    return (
        <div className='splash-wrapper'>
            <div className='slime-green'></div>
            <div className='splash-first'>
                <div className='vertical-slime-green'></div>
                <div className='splash-left'>
                    <img id='splash-img' alt='phone-splash' src='https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png' />
                    <video src='https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4'
                        autoPlay
                        muted
                        loop
                        preload='auto'
                        id='inside-vid'
                    ></video>
                </div>
                <div className='splash-right'>
                    <div className='first-right-mid'>
                        <span>Run your money</span>
                    </div>
                    <div className='first-right-middle-bottom'>
                        <p>Invest with stocks, crypto, and cash</p>
                    </div>
                    <p
                        id='on-your-terms'
                    >on your terms.</p>
                    <div className='get-started'>Get Started</div>
                    {/* <div className='splash-popout'>
                        <span className='popout-nav'>Invest</span>
                        <span className='popout-nav'>Crypto</span>
                        <span className='popout-nav'
                        onClick={() => history.push('/cash')}
                        >Cash Card</span>
                        <span className='popout-nav'>Learn</span>
                        <span className='popout-nav'>Snacks</span>
                        <span className='popout-nav'>Support</span>
                    </div> */}
                </div>
            </div>
            <div className='slime-green'></div>
            <div className='meet-the-team-wrapper'>
                <div className='meet-team-inner'>
                    <div className='meet-team-text'>
                        <span id='meet-team'>About</span>
                        <div className='scroll-fraction-and-buttons'>
                            <span id='scroll-fraction'>{scrollNum}/4</span>
                            <div id='scroll-back'
                                onClick={() => handleScrollBackClick()}
                            >
                                <i className="fa-solid fa-arrow-left" />
                            </div>
                            <div id='scroll-forward'
                                onClick={() => handleScrollForwardClick()}
                            >
                                <i className="fa-solid fa-arrow-right" />
                            </div>
                        </div>
                    </div>
                    <div className='team-scroll'>
                        <div className='team-card' id='team-card1'>
                            <div className='card1-inner'>
                                <div id='project-repository'>
                                    <i id='gitLogo' className='fa-brands fa-github' />
                                    <span>Project Repository</span>
                                </div>
                                <a href='https://github.com/Dylluu/teamDobby' target='_blank'>
                                    <img id='repo-button' src={repoImage} alt='repo' />
                                </a>
                            </div>
                        </div>
                        <div className='team-card' id='team-card2'>
                            <div className='team-card2-inner'>
                                <img
                                style={{width: '100%', objectFit: 'cover', borderTopRightRadius: '25px', borderTopLeftRadius: '25px'}}
                                alt='stockBlocks' src={stockBlocks}/>
                            </div>
                            <div className='team-card2-inner-bottom'>
                                <div className='api-card-title'>Yahoo Finance API</div>
                                <div className='api-card-title2'>
                                    <p>This application utilizes stock data from the Yahoo Finance API, a RESTFUL API platform that makes financial data easily accessible to everyone.</p>
                                    <a target='_blank' href='https://yahoo-finance-api.vercel.app/'>
                                        <div className='api-button'>Link to API</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='team-card'>
                            Tech Stack
                        </div>
                        <div className='team-card'>
                            Features List
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom-nav'>
                <div className='bottom-nav-inner'>
                    <div className='bottom-inner-links'>
                        <div className='bottom-text-box'>
                            <div>
                                <span className='bottom-link-titles'>Company</span>
                                <div className='bottom-link-list'>
                                    <a target='_blank' href='https://www.appacademy.io/'><span className='hover-underline'>App Academy</span></a>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-text-box'>
                            <div>
                                <span className='bottom-link-titles'>Developers</span>
                                <div className='bottom-link-list'>
                                    <span>
                                        <a target='_blank' href='https://www.linkedin.com/in/chungcurtis/'>
                                            <img
                                            className='linked'
                                            src={linkedInLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        <a target='_blank' href='https://github.com/curtis-chung'>
                                            <img
                                            className='git'
                                            src={gitHubLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        Curtis Chung</span>
                                    <span>
                                    <a target='_blank' href='https://www.linkedin.com/in/dylan-luu-0a869b1b8/'>
                                            <img
                                            className='linked'
                                            src={linkedInLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        <a target='_blank' href='https://github.com/Dylluu'>
                                            <img
                                            className='git'
                                            src={gitHubLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        Dylan Luu</span>
                                    <span>
                                    <a target='_blank' href='https://www.linkedin.com/in/jarrod-mishima-50abb0172/'>
                                            <img
                                            className='linked'
                                            src={linkedInLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        <a target='_blank' href='https://github.com/MishTails'>
                                            <img
                                            className='git'
                                            src={gitHubLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        Jarrod Mishima</span>
                                    <span>
                                    <a target='_blank' href='https://www.linkedin.com/in/nhut-linh-ngo/'>
                                            <img
                                            className='linked'
                                            src={linkedInLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        <a target='_blank' href='https://github.com/NhutLinh-Ngo'>
                                            <img
                                            className='git'
                                            src={gitHubLogo}
                                            alt='linkedInLogo'
                                            />
                                        </a>
                                        Nhut-Linh Ngo</span>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-text-box'>
                            <div>
                                <span className='bottom-link-titles'>Features</span>
                                <div className='bottom-link-list'>
                                    <span>Dashboard</span>
                                    <span>Stock Details</span>
                                    <span>Watchlist</span>
                                    <span>Stock Search</span>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-text-box'>
                            <div>
                                <span className='bottom-link-titles'>Language</span>
                                <div className='bottom-link-list'>
                                    <span
                                        style={{ marginBottom: '15px' }}
                                    >English</span>
                                    <span className='bottom-link-titles'
                                        style={{ color: 'black', marginBottom: '6px' }}
                                    >Country</span>
                                    <span>United States</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-copyright'>
                        <span className='bottom-link-list'
                            style={{ flexDirection: 'row', alignSelf: 'flex-end' }}
                        >© 2022 Robinhood. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash;
