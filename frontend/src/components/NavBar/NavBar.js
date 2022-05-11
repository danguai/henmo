
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UserIcon from '../UserIcons/UserIcons';
import LogoutButton from '../auth/LogoutButton';

import './NavBar.css';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session?.user);

  console.log('SESSION USER:', sessionUser);
  return (
    <nav id='nav__bar' >
      <ul className='navbar__elements'>
        <li className='henmo__logo__navbar'>
          <img src='/static/henmo-logo.png' alt='henmo-logo' />
        </li>
        <li className='avatar__and__name'>
          <div className='temp__box__user'>
            {/* <UserIcon /> */}
          </div>
          <div className='user__name__display'>
            Hi, {sessionUser.first_name}
          </div>
        </li>
        <li>
          <button className='red__button__v2 pay__btn__size' type='submit'>
            <div className='h__in__button'>
              <img src='/static/h.png' alt='h' />
            </div>
            <div>
              SEND PAYMENT
            </div>
          </button>
        </li>
        <li>
          <div></div>
        </li>
        <li className='logout__button__placement'>
          <LogoutButton />
        </li>
      </ul>
    </nav >
  );
}

export default NavBar;
