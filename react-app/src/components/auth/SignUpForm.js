import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';
import robinHoodLogo from '../../assets/Robinhood-logo.png';
import stockBlocks from '../../assets/stockBlocksGreen.png';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pwVisible, setPwVisible] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  function handlePasswordIcon() {
    if(!pwVisible){
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
    if(pwVisible){
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
        <NavLink to='/'><img alt='robinHoodLogo' src={robinHoodLogo} id='robinHoodLogo'/></NavLink>
        <p className='signup-form-left-text'>Get started with free stock on us</p>
        <img id='signup-form-stockblocks' alt='stockBlocks' src={stockBlocks}/>
      </div>
      <div className='signup-form-right'>
        <div className='signup-form-right-inner'>
    <form onSubmit={onSignUp}>
      <div className='signup-form-right-header'>Enter your first and last name as they appear on your government ID.</div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id='signup-first-and-last'>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          className='first-and-last-input'
          placeholder='First name'
        ></input>
        <input
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
          className='first-and-last-input'
          placeholder='Last name'
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email address'
          className='signup-form-inputs'
        ></input>
      </div>
      <div className='signup-form-password-input'
      id='signup-form-password-input'
      >
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Password (min. 10 characters)'
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
      {/* <button type='submit'>Sign Up</button> */}
    </form>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;
