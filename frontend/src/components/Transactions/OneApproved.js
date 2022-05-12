import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import User from '../Users/User';

import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

// import { NavLink } from 'react-router-dom';


import './OneApproved.css';

const OneApproved = ({ closeModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { approved_id } = useParams();

    const sessionUser = useSelector(state => state.session?.user);
    const approvedTran = useSelector(state => state.outgoing[approved_id]);

    console.log(approvedTran);
    useEffect(() => {
        dispatch(readOneOutgoing(approved_id));
    }, [dispatch]);

    if (!approvedTran) return null;

    return (
        <div
            className='transactions__container' >
            <div className='pending__tran__container' >
                <div className='pending__tran__text'>
                    Transaction #
                    <span className='pending__tran__number'>
                        {approvedTran.id}
                    </span>
                </div>
                <div>
                    <span>
                        From
                    </span>
                    {sessionUser.last_name}, {sessionUser.first_name}
                </div>
                <div className='to__user'>
                    <span>
                        To
                    </span>
                    <User id={approvedTran?.receiver_id} />
                </div>
                <div>
                    <span>
                        Chickens
                    </span>
                    {approvedTran.pay_funds}
                </div>
                <div>
                    <span>
                        Message
                    </span>
                    {approvedTran.message}
                </div>
            </div>
        </div >
    )
};

export default OneApproved;
