import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';
import robinHoodLogo from '../../assets/Robinhood-logo.png';
import stockBlocks from '../../assets/stockBlocksGreen.png';
import RavenhoodLogo from '../../assets/ravenhood-greenbackground.png'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buy_power, setBuyPower] = useState(100000);
  const [pwVisible, setPwVisible] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // console.log(first_name, last_name)
    const data = await dispatch(signUp(first_name, last_name, email, password, buy_power));
    // console.log(data, '---------------------')
    if (data) {
      setErrors(data)
      // console.log(errors, '--------')
    }
  };

  useEffect(() => {
    if (errors.first_name) {
      const firstName = document.getElementById('firstName')
      firstName.classList.add('red-border')
    }
    if (!errors.first_name) {
      const firstName = document.getElementById('firstName')
      firstName.classList.remove('red-border')
    }
  }, [errors.first_name])

  useEffect(() => {
    if (errors.last_name) {
      const lastName = document.getElementById('lastName')
      lastName.classList.add('red-border')
    }
    if (!errors.last_name) {
      const lastName = document.getElementById('lastName')
      lastName.classList.remove('red-border')
    }
  }, [errors.last_name])

  useEffect(() => {
    if (errors.email) {
      const emailInput = document.getElementById('email')
      emailInput.classList.add('red-border')
    }
    if (!errors.email) {
      const emailInput = document.getElementById('email')
      emailInput.classList.remove('red-border')
    }
  }, [errors.email])

  useEffect(() => {
    if (errors.password) {
      const passwordDiv = document.getElementsByClassName('signup-form-password-input')
      passwordDiv[0].classList.add('red-border')
      passwordDiv[0].removeAttribute('id')
    }
    if (!errors.password) {
      const passwordDiv = document.getElementsByClassName('signup-form-password-input')
      passwordDiv[0].classList.remove('red-border')
    }
  }, [errors.password])

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
    errors.first_name = null;
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
    errors.last_name = null;
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    errors.email = null;
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    errors.password = null;
  };

  if (user) {
    return <Redirect to='/' />;
  }

  function handlePasswordIcon() {
    if (!pwVisible) {
      const openEye = document.getElementById('signup-open-eye');
      openEye.style.display = 'none'
      openEye.style.zIndex = '-1'
      const closedEye = document.getElementById('signup-closed-eye');
      closedEye.style.display = 'flex'
      closedEye.style.zIndex = '1'
      const pwInput = document.getElementById('signup-form-password');
      pwInput.setAttribute('type', '')
      setPwVisible(true)
    }
    if (pwVisible) {
      const openEye = document.getElementById('signup-open-eye');
      openEye.style.display = 'flex'
      openEye.style.zIndex = '1'
      const closedEye = document.getElementById('signup-closed-eye');
      closedEye.style.display = 'none'
      closedEye.style.zIndex = '-1'
      const pwInput = document.getElementById('signup-form-password');
      pwInput.setAttribute('type', 'password')
      setPwVisible(false)
    }
  }

  const handlePasswordBorder = () => {
    const passwordDiv = document.getElementsByClassName('signup-form-password-input');
    passwordDiv[0].classList.add('signup-form-password-input-focus');
    passwordDiv[0].removeAttribute('id')
    const passwordInput = document.getElementById('signup-form-password');
    passwordInput.addEventListener('focusout', removePasswordBorder)
  }
  function removePasswordBorder() {
    const passwordDiv = document.getElementsByClassName('signup-form-password-input');
    passwordDiv[0].classList.remove('signup-form-password-input-focus');
    passwordDiv[0].setAttribute('id', 'signup-form-password-input')
    // console.log('in remove')
  }

  return (
    <div className='signup-form-wrapper'>
      <div className='signup-form-left'>
        <div className='signup-logo-container'>
          <div className='signup-logo-text'>Ravenhood</div>
          <NavLink to='/'><img alt='robinHoodLogo' src={RavenhoodLogo} id='robinHoodLogo' /></NavLink>
        </div>

        <p className='signup-form-left-text'>Get started with free stock on us</p>
        <span className='starting-buying-power'>New users will start with a buying power of $100,000 on signup. *</span>
        <img id='signup-form-stockblocks' alt='stockBlocks' src={stockBlocks} />
      </div>
      <div className='signup-form-right'>
        <div className='signup-form-right-inner'>
          <form onSubmit={onSignUp}>
            <div className='signup-form-right-header'>Enter your first and last name as they appear on your government ID.</div>
            {/* <div>
        {Object.values(errors)}
      </div> */}
            <div id='signup-first-and-last'>
              <input
                type='text'
                name='first_name'
                onChange={updateFirstName}
                value={first_name}
                className='first-and-last-input'
                placeholder='First name'
                id='firstName'
              ></input>
              <input
                type='text'
                name='last_name'
                onChange={updateLastName}
                value={last_name}
                className='first-and-last-input'
                placeholder='Last name'
                id='lastName'
              ></input>
            </div>
            {errors.first_name && errors.last_name && (
              <div className='signup-error-message-first-and-last'>
                <span id='please-enter-first-name'>{errors.first_name}</span>
                <span id='please-enter-last-name'>{errors.last_name}</span>
              </div>
            )}
            {errors.first_name && !errors.last_name && (
              <div className='signup-error-message'>{errors.first_name}</div>
            )}
            {!errors.first_name && errors.last_name && (
              <div className='signup-error-message-first-and-last'>
                <span id='please-enter-first-name'></span>
                <span id='please-enter-last-name'>{errors.last_name}</span>
              </div>
            )}
            <div>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder='Email address'
                className='signup-form-inputs'
                id='email'
              ></input>
            </div>
            {errors.email && (
              <div className='signup-error-message'>{errors.email}</div>
            )}
            <div className='signup-form-password-input'
              id='signup-form-password-input'
            >
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder='Password (min. 8 characters)'
                id='signup-form-password'
                onClick={() => handlePasswordBorder()}
              ></input>
              <div className='password-visibility'
                onClick={() => handlePasswordIcon()}
              >
                <i className="fa-solid fa-eye"
                  id="signup-open-eye"
                />
                <i className="fa-solid fa-eye-slash"
                  id="signup-closed-eye"
                />
              </div>
            </div>
            {errors.password && (
              <div className='signup-error-message'>{errors.password}</div>
            )}
            {/* <button type='submit' className='signup-form-submit'>Sign Up</button> */}
          </form>
        </div>
        <div className='signup-form-right-bottom'>
          <div className='signup-form-button-wrapper'>
            <button className='signup-form-submit'>Confirm</button>
            <div className='signup-form-submit-hover'
              onClick={onSignUp}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
