import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

// import { NavLink } from 'react-router-dom';


import './OneApproved.css';

const OneApproved = () => {
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
        <div className='transactions__container' >
            <div className='approved__tran__container' >
                <div>
                    Transaction Number {approvedTran.id}
                </div>
                <div>
                    From {sessionUser.last_name}, {sessionUser.first_name}
                </div>
                <div>
                    To
                    <span>
                        (Need to Add Logic)
                    </span>
                    {approvedTran.receiver_id}
                </div>
                <div>
                    Chickens {approvedTran.pay_funds}
                </div>
                <div>
                    Message {approvedTran.message}
                </div>
                <div>
                    (TEMP) APPROVED
                </div>
            </div>
        </div>
    )
};

export default OneApproved;
