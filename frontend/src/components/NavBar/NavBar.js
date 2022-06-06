import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserIcon } from '../UserIcons/UserIcons';
import LogoutButton from '../auth/LogoutButton';

import { avatars } from '../../context/Avatar';

import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session?.user);

  const transactions = useSelector(state => state.transaction);

  const allApproved = [];
  const userApproved = [];
  const outgoingTrans = [];
  const incomingTrans = [];

  Object.values(transactions).forEach(transaction => {
    if (transaction?.paid === true) {
      allApproved.push(transaction);
    }

    if (transaction?.payer_id === sessionUser.id && transaction?.paid === true) {
      userApproved.push(transaction);
    }

    if (transaction?.payer_id === sessionUser.id && transaction?.paid === false) {
      outgoingTrans.push(transaction);
    }
  });

  const avatarPNGs = Object.values(avatars)
    .map(avatar => avatar.imageUrl);

  const randomAvatar = avatarPNGs[Math.floor(Math.random() * avatarPNGs.length)];

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
        <li>
          {sessionUser.funds}
          <Link to='/add-funds' style={{ textDecoration: 'none' }}>
            <button className='red__button__v2 funds__btn__size' type='submit'>
              <div>
                ADD FUNDS
              </div>
            </button>
          </Link>
        </li>
        <li className='pending__transactions'>
          <div className='pending__label'>
            ALL TRANSACTIONS
          </div>
          <div className='line__division__all__tran' />
          <Link className='transaction__link' to='/all-approved'>
            {`ALL APPROVED (${allApproved.length})`}
          </Link>
        </li>
        <li className='pending__transactions'>
          <div className='pending__label'>
            MY TRANSACTIONS
          </div>
          <div className='line__division__approved' />
          <Link className='transaction__link' to='/approved'>
            {`APPROVED (${userApproved.length})`}
          </Link>
        </li>
        <li className='pending__transactions'>
          <div className='pending__label__red'>
            PENDING
          </div>
          <div className='line__division__pending' />
          <Link className='transaction__link__red' to='/pending'>
            {`OUTGOING (${outgoingTrans.length})`}
          </Link>
          <Link className='transaction__link__red' to='/pending'>
            {`INCOMING (${outgoingTrans.length})`}
          </Link>
        </li>
        <div className='chicken__img__container'>
          <img
            id='big__chicken__navbar'
            src={randomAvatar}
            alt='chicken__1__white' />
        </div>
        <li className='logout__button__placement'>
          <LogoutButton />
        </li>
      </ul>
    </nav >
  );
}

export default NavBar;
