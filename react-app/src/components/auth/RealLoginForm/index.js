import React, { useState } from "react";
import './RealLoginForm.css';
import loginFormImage from '../../../assets/loginFormImage.jpeg';

function RealLoginForm() {
    const [pwVisible, setPwVisible] = useState(false);
    const handlePasswordBorder = () => {
        const passwordDiv = document.getElementsByClassName('password-div');
        passwordDiv[0].classList.add('password-div-focus');
        passwordDiv[0].removeAttribute('id')
        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('focusout', removePasswordBorder)
    }
    function removePasswordBorder() {
        const passwordDiv = document.getElementsByClassName('password-div');
        passwordDiv[0].classList.remove('password-div-focus');
        passwordDiv[0].setAttribute('id', 'password-hover')
        console.log('in remove')
    }
    function handlePasswordIcon() {
        if(!pwVisible){
            const openEye = document.getElementById('open-eye');
            openEye.style.display = 'none'
            openEye.style.zIndex = '-1'
            const closedEye = document.getElementById('closed-eye');
            closedEye.style.display = 'flex'
            closedEye.style.zIndex = '1'
            const pwInput = document.getElementById('password');
            pwInput.setAttribute('type', '')
            setPwVisible(true)
        }
        if(pwVisible){
            const openEye = document.getElementById('open-eye');
            openEye.style.display = 'flex'
            openEye.style.zIndex = '1'
            const closedEye = document.getElementById('closed-eye');
            closedEye.style.display = 'none'
            closedEye.style.zIndex = '-1'
            const pwInput = document.getElementById('password');
            pwInput.setAttribute('type', 'password')
            setPwVisible(false)
        }
    }

    return (
        <div className="login-form-wrapper">
            <img alt="loginFormImage" src={loginFormImage} className='login-form-image'/>
            <form className="login-form-right">
                <div className="login-form-right-inner">
                    <span id="log-in-to-robinhood">Log in to Robinhood</span>
                    <span className="login-form-labels">Email</span>
                    <input
                    autoFocus
                    style={{height: '38px'}}
                    className='login-form-inputs'></input>
                    <span className="login-form-labels">Password</span>
                    <div className="password-div"
                    id="password-hover"
                    >
                    <input type='password' className='login-form-inputs' id="password"
                    onClick={() => handlePasswordBorder()}
                    ></input>
                    <div className="password-visibility"
                    onClick={() => handlePasswordIcon()}
                    >
                    <i className="fa-solid fa-eye"
                    id="open-eye"
                    />
                    <i className="fa-solid fa-eye-slash"
                    id="closed-eye"
                    />
                    </div>
                    </div>
                    <span className='demo-user-login'>Demo user login</span>
                    <div id="log-in-form-button">Log in</div>
                    <span id='not-on-robinhood' className="login-form-labels">Not on Robinhood? <span className="demo-user-login">Create an account</span></span>
                </div>
            </form>
        </div>
    )
}

export default RealLoginForm;
