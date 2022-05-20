import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import UserName from '../Users/UserName';
import UserNameEmail from '../Users/UserNameEmail';

import { readAllOutgoings } from '../../store/outgoing';
import Comments from '../Comments/Comments';

import './OneApproved.css';

const OneApproved = () => {
    const dispatch = useDispatch();
    const { approved_id } = useParams();

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
                        <UserName user={approvedTran.payer} />
                    </div>
                </div>
                <div className='approved__tran__to__and__user'>
                    <div className='approved__tran__to'>
                        To
                    </div>
                    <UserNameEmail user={approvedTran.receiver} />
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
            <div >
                <img
                    id='chicken__7__orange__one__approved'
                    src='/static/chicken-7-orange.png'
                    alt='chicken__7__orange__one__approved' />
            </div>
            <div>
                <img
                    id='chicken__2__black__one__approved'
                    src='/static/chicken-2-black.png'
                    alt='chicken__2__black__one__approved' />
            </div>
        </div >
    )
};

export default OneApproved;
