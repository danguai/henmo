import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import User from '../Users/User';

import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
import Comments from '../Comments/Comments';

import './OneApproved.css';

const OneApproved = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { approved_id } = useParams();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const approvedTran = outgoings[approved_id];


    console.log(approvedTran);
    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);


    if (!approvedTran) return null;

    return (
        <div className='transactions__container' >
            <Link to='/'
                className='back__btn'
            >
                BACK
            </Link>
            <div className='approved__tran__container' >
                <div className='approved__tran__text'>
                    Transaction #
                    <span className='approved__tran__number'>
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
                <div className='approved__amount'>
                    <div>
                        Chickens
                    </div>
                    <div>
                        {approvedTran.pay_funds}
                    </div>
                </div>
                <div className='approved__message'>
                    <div>
                        Message
                    </div>
                    <div>
                        {approvedTran.message}
                    </div>
                </div>
            </div>
            <div className='comments__container' >
                <Comments approvedTran={approvedTran} />
            </div>
        </div >
    )
};

export default OneApproved;
