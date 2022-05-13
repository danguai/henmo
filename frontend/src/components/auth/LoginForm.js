import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [customError, setCustomError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      setCustomError('Email or password is incorrect')
    }
  }, [errors.length])

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // const demoLogin = async () => {
  //   await dispatch(login('demoone@aa.io', 'password'));
  //   // history.push('/');
  // };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='login__page'>
      <div className='login__form__container'>
        <div className='henmo__logo__login'>
          <img src='/static/henmo-logo.png' alt='henmo-logo' />
        </div>
        <div className='forms__name'>
          LOGIN
        </div>
        <form onSubmit={onLogin}>
          <div className='forms__inputs__format'>
            <label className='forms__label' htmlFor='email'>EMAIL</label>
            <input
              className='forms__input'
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='forms__inputs__format'>
            <label className='forms__label' htmlFor='password'>PASSWORD</label>
            <input
              className='forms__input'
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          {/* <div className='errors__login'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> */}
          <div className='errors__login'>
            <span>{customError}</span>
          </div>
          <div className='login__or__signup'>
            <button className='red__button__basic login__btn__size' type='submit'>LOG IN</button>
            <div className='or__signup'>
              <div>
                <Link className='link__to__other__auth' to='/home'>BACK</Link>
              </div>
              <div className='or'>
                OR
              </div>
              <div>
                <Link className='link__to__other__auth' to='/signup'>SIGN UP</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
