import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserIcon } from '../UserIcons/UserIcons';
import LogoutButton from '../auth/LogoutButton';
import LottieChickens from '../AnimatedChickens/LottieChickens';
import { avatars } from '../../context/Avatar';

import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session?.user);

  const outgoings = useSelector(state => state.outgoing);

  const allApproved = [];
  const userApproved = [];
  const pendingList = [];

  Object.values(outgoings).forEach(outgoing => {
    if (outgoing?.paid === true) {
      allApproved.push(outgoing);
    }

    if (outgoing?.payer_id === sessionUser.id && outgoing?.paid === true) {
      userApproved.push(outgoing);
    }

    if (outgoing?.payer_id === sessionUser.id && outgoing?.paid === false) {
      pendingList.push(outgoing);
    }
  });

  const avatarPNGs = Object.values(avatars)
    .map(avatar => avatar.imageUrl);

  const randomAvatar = avatarPNGs[Math.floor(Math.random() * avatarPNGs.length)];

  console.log('AVATARPNG', randomAvatar);

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
            ALL TRANSACTIONS
          </div>
          <div className='line__division__all__tran' />
          <Link className='outgoing__link' to='/'>
            {`ALL APPROVED (${allApproved.length})`}
          </Link>
        </li>
        <li className='pending__transactions'>
          <div className='pending__label'>
            MY TRANSACTIONS
          </div>
          <div className='line__division__approved' />
          <Link className='outgoing__link' to='/approved'>
            {`APPROVED (${userApproved.length})`}
          </Link>
        </li>
        <li className='pending__transactions'>
          <div className='pending__label__red'>
            PENDING
          </div>
          <div className='line__division__pending' />
          <Link className='outgoing__link__red' to='/pending'>
            {`OUTGOING (${pendingList.length})`}
          </Link>
        </li>
        <div className='chicken__img__container__lottie__navbar'>
          <div className='LottieChicken__container__navbar'>
            <LottieChickens size={800} rotate={-10} />
          </div>
          {/* <img
            id='big__chicken__navbar'
            src={randomAvatar}
            alt='chicken__1__white' /> */}
        </div>
        <li className='logout__button__placement'>
          <LogoutButton />
        </li>
      </ul>
    </nav >
  );
}

export default NavBar;
