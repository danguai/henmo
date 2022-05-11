import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import { Icons } from '../UserIcons/Icons';

import './SignUp.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarId, setAvatarId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, avatarId, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateFirstName = (e) => setFirstName(e.target.value);

  const updateLastName = (e) => setLastName(e.target.value);

  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);


  if (user) {
    return <Redirect to='/' />;
  }

  // const stopTheProp = e => e.stopPropagation();

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
              value={firstName}
            ></input>
          </div>
          <div className='forms__inputs__format last__name'>
            <label className='forms__label'>LAST NAME</label>
            <input
              className='forms__input'
              type='text'
              name='lastname'
              onChange={updateLastName}
              value={lastName}
            ></input>
          </div>

          <Icons avatarId={avatarId} setAvatarId={setAvatarId}
          // avatarError={avatarError} setAvatarError={setAvatarError}
          />

          <div className='forms__inputs__format'>
            <label className='forms__label' >EMAIL</label>
            <input
              className='forms__input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='forms__inputs__format'>
            <label className='forms__label' >PASSWORD</label>
            <input
              className='forms__input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='forms__inputs__format'>
            <label className='forms__label' >CONFIRM PASSWORD</label>
            <input
              className='forms__input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='errors__signup'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login__or__signup'>
            <button className='red__button__basic login__btn__size' type='submit'>SIGN UP</button>
            <div className='or__signup'>
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
