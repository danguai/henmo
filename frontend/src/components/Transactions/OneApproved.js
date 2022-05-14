import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import User_Name_Email from '../Users/User_Name_and_Email';

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
            <div className='approved__tran__container'>
                <div className='approved__tran__text__and__number'>
                    <div className='approved__tran__text'>
                        Transaction
                    </div>
                    <div className='approved__tran__number'>
                        {`#${approvedTran.id}`}
                    </div>
                </div>
                <div className='approved__tran__from__and__name'>
                    <div className='approved__tran__from'>
                        From
                    </div>
                    <div className='approved__tran__name'>
                        {`${sessionUser.last_name}, ${sessionUser.first_name}`}
                    </div>
                </div>
                <div className='approved__tran__to__and__user'>
                    <div className='approved__tran__to'>
                        To
                    </div>
                    <User_Name_Email id={approvedTran?.receiver_id} />
                </div>
                <div className='approved__tran__chickens__and__amount'>
                    <div className='approved__tran__chickens'>
                        Chickens
                    </div>
                    <div className='approved__tran__amount'>
                        {approvedTran?.pay_funds}
                    </div>
                </div>
                <div className='approved__tran__message__and__message'>
                    <div className='approved__tran__message__title'>
                        Message
                    </div>
                    <div className='approved__tran__message__content'>
                        {approvedTran?.message}
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
