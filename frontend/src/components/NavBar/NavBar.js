
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { UserIcon } from '../UserIcons/UserIcons';
import LogoutButton from '../auth/LogoutButton';

import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  const sessionUser = useSelector(state => state.session?.user);

  const outgoings = useSelector(state => state.outgoing);

  const approved = [];
  const pendingList = [];

  Object.values(outgoings).forEach(outgoing => {
    if (outgoing.paid === true) {
      approved.push(outgoing);
    } else {
      pendingList.push(outgoing);
    }
  });

  const path = location.pathname;




  return (
    <nav id='nav__bar' >
      <ul className='navbar__elements'>
        <li className='henmo__logo__navbar'>
          <img src='/static/henmo-logo.png' alt='henmo-logo' />
        </li>
        <li className='avatar__and__name'>
          <div className='avatar__box__user'>
            <UserIcon size={100} />
          </div>
          <div className='user__name__display'>
            Hi, {sessionUser.first_name}
          </div>
        </li>
        <li>
          <Link to='/new-payment' style={{ textDecoration: 'none' }}>
            <button className='red__button__v2 pay__btn__size' type='submit'>
              <div className='h__in__button'>
                <img src='/static/h.png' alt='h' />
              </div>
              <div>
                SEND PAYMENT
              </div>
            </button>
          </Link>
        </li>
        <li className='pending__transactions'>
          <div className='pending__label'>
            APPROVED
          </div>
          <div className='line__division' />
          <Link className='outgoing__link' to='/'>
            {`APPROVED (${approved.length})`}
          </Link>
        </li>
        <li className='pending__transactions'>
          <div className='pending__label'>
            PENDING
          </div>
          <div className='line__division' />
          <Link className='outgoing__link' to='/pending'>
            {`OUTGOING (${pendingList.length})`}
          </Link>
        </li>
        <li className='logout__button__placement'>
          <LogoutButton />
        </li>
      </ul>
    </nav >
  );
}

export default NavBar;
