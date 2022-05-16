import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import { Icons } from '../UserIcons/Icons';

import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateRepeatPassword
} from '../../utils/validation';

import './SignUp.css';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarId, setAvatarId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const [customError, setCustomError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [avatarError, setAvatarError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const checkingErrors =
    (firstNameError ||
      lastNameError ||
      avatarError ||
      emailError ||
      passwordError ||
      repeatPasswordError);

  const user = useSelector(state => state.session?.user);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, avatarId, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      setCustomError('You must complete the form');
    }
  }, [errors.length]);

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='signup__page'>
      <div className='henmo__logo__signup'>
        <img src='/static/henmo-logo.png' alt='henmo-logo' />
      </div>
      <div className='signup__form__container'>
        <div className='forms__name'>
          SIGN UP
        </div>
        <form onSubmit={onSignUp}>
          <div className='forms__inputs__format'>
            <label className='forms__label'>FIRST NAME</label>
            <input
              className='forms__input'
              type='text'
              name='firstname'
              onChange={updateFirstName}
              onBlur={() => {
                const error = validateFirstName(firstName)
                if (error) setFirstNameError(error)
              }}
              onFocus={() => { setFirstNameError('') }}
              value={firstName}
            ></input>
          </div>
          {firstNameError && <div className='error_style first__name__error'>{firstNameError}</div>}
          <div className='forms__inputs__format last__name'>
            <label className='forms__label'>LAST NAME</label>
            <input
              className='forms__input'
              type='text'
              name='lastname'
              onChange={updateLastName}
              onBlur={() => {
                const error = validateLastName(lastName)
                if (error) setLastNameError(error)
              }}
              onFocus={() => { setLastNameError('') }}
              value={lastName}
            ></input>
          </div>
          {lastNameError && <div className='error_style last__name__error'>{lastNameError}</div>}
          <Icons avatarId={avatarId} setAvatarId={setAvatarId}
            avatarError={avatarError} setAvatarError={setAvatarError}
          />
          <div>
            <div className='forms__inputs__format'>
              <label className='forms__label' >EMAIL</label>
              <input
                className='forms__input'
                type='text'
                name='email'
                onChange={updateEmail}
                onBlur={() => {
                  const error = validateEmail(email)
                  if (error) setEmailError(error)
                }}
                onFocus={() => { setEmailError('') }}
                value={email}
              ></input>
            </div>
            {emailError && <div className='error_style email__error'>{emailError}</div>}
          </div>
          <div className='forms__inputs__format'>
            <label className='forms__label' >PASSWORD</label>
            <input
              className='forms__input'
              type='password'
              name='password'
              onChange={updatePassword}
              onBlur={() => {
                const error = validatePassword(password)
                if (error) setPasswordError(error)
              }}
              onFocus={() => { setPasswordError('') }}
              value={password}
            ></input>
          </div>
          {passwordError && <div className='error_style password__error'>{passwordError}</div>}
          <div className='forms__inputs__format'>
            <label className='forms__label' >REPEAT PASSWORD</label>
            <input
              className='forms__input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              onBlur={() => {
                const error = validateRepeatPassword(password, repeatPassword)
                if (error) setRepeatPasswordError(error)
              }}
              onFocus={() => { setRepeatPasswordError('') }}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          {repeatPasswordError && <div className='error_style repeat__password__error'>{repeatPasswordError}</div>}
          <div className='errors__signup'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='errors__login'>
            <span>{customError}</span>
          </div>
          <div className='login__or__signup'>
            <button
              className={checkingErrors ? 'red__button__disabled login__btn__size' : 'red__button__basic login__btn__size'}
              disabled={checkingErrors}
              type='submit'
            >
              SIGN UP
            </button>
            <div className='or__signup'>
              <div>
                <Link className='link__to__other__auth' to='/home'>BACK</Link>
              </div>
              <div className='or'>
                OR
              </div>
              <div>
                <Link className='link__to__other__auth' to='/login'>LOG IN</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
