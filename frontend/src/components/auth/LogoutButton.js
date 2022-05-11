import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/home');
  };

  return <button className='white__button__basic pay__btn__size' onClick={onLogout}>LOGOUT</button>;
};

export default LogoutButton;
