import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

// import { NavLink } from 'react-router-dom';


import './Transactions.css';

const ApprovedTran = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { approved_id } = useParams();

    const sessionUser = useSelector(state => state.session?.user);
    // const approvedTran = useSelector(state => state.outgoing);
    console.log(approved_id);
    useEffect(() => {
        dispatch(readOneOutgoing(approved_id));
    }, [dispatch]);

    return (
        <div className='transactions__container' >
            Appoved Transaction Page
        </div>
    )
};

export default ApprovedTran;
