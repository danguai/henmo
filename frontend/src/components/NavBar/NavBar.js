import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { UserIcon } from '../UserIcons/UserIcons';
import LogoutButton from '../auth/LogoutButton';
import { readFunds } from '../../store/funds';

import { avatars } from '../../context/Avatar';

import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session?.user);

  const allTransactions = useSelector(state => state.transaction);

  const funds = useSelector(state => state.funds);

  const userFunds = Object.values(funds)[0];

  // console.log('USER', sessionUser);
  // console.log('TRANS', allTransactions);
  // console.log('FUNDS', funds);

  // const location = useLocation();

  // if (location.pathname === '/404') return null;

  const allApproved = [];
  const userApproved = [];
  const outgoingTrans = [];
  const incomingTrans = [];

  Object.values(allTransactions).forEach(transaction => {
    if (transaction?.paid === true) {
      allApproved.push(transaction);
    }

    if (transaction?.payer_id === sessionUser.id && transaction?.paid === true) {
      userApproved.push(transaction);
    }

    if (transaction?.payer_id === sessionUser.id && transaction?.paid === false) {
      outgoingTrans.push(transaction);
    }

    if (transaction?.receiver_id === sessionUser.id && transaction?.paid === false) {
      incomingTrans.push(transaction);
    }
  });

  useEffect(() => {
    dispatch(readFunds(sessionUser.id));
  }, [dispatch]);

  const avatarPNGs = Object.values(avatars).map(avatar => avatar.imageUrl);

  let randomAvatar = avatarPNGs[Math.floor(Math.random() * avatarPNGs.length)];

  return (
    <nav id='nav__bar' >
      <ul className='navbar__elements'>
        <li className='henmo__logo__navbar'>
          <img src='/static/henmo-logo.png' alt='henmo-logo' />
        </li>
        <li>
          <Link to='/profile' className='avatar__and__name'>
            <div className='avatar__box__user'>
              <UserIcon size={100} />
            </div>
            <div>
              <div className='user__name__display'>
                Hi, {sessionUser.first_name}
              </div>
              <div>
                CHICKENS
                {funds?.amount}
              </div>
            </div>
          </Link>
        </li>
        <li>
          <Link to='/send-payment' style={{ textDecoration: 'none' }}>
            <button className='red__button__v2 pay__btn__size' type='submit'>
              <div className='h__in__button'>
                <img src='/static/h.png' alt='h' />
              </div>
              <div>
                SEND<span className='or__class'> OR </span>REQUEST
              </div>
            </button>
          </Link>
        </li>
        <li>
          <div>
            AVAILABLE CHICKENS
            <span>{userFunds?.amount}</span>
          </div>
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
          <Link className='pending_all__link__red pending__label__red' to='/pending'>
            PENDING
          </Link>
          <div className='line__division__pending' />
          <Link className='transaction__link__red' to='/pending-out'>
            {`OUTGOING (${outgoingTrans.length})`}
          </Link>
          <Link className='transaction__link__red' to='/pending-in'>
            {`INCOMING (${incomingTrans.length})`}
          </Link>
        </li>
        <div className='chicken__img__container'>
          <img
            id='big__chicken__navbar'
            src={randomAvatar}
            alt='chicken' />
        </div>
        <li className='logout__button__placement'>
          <LogoutButton />
        </li>
      </ul>
    </nav >
  );
}

export default NavBar;
