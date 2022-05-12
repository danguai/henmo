import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

// import { NavLink } from 'react-router-dom';


import './Pending.css';

const PendingTran = () => {
    return (
        <div className='pending__container' >
            Pending Transaction Page
        </div>
    )
};

export default PendingTran;
