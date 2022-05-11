
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav id='nav__bar' >
      <div>
        <LogoutButton />
      </div>
    </nav >
  );
}

export default NavBar;
