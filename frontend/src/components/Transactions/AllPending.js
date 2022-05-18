import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UserName from '../Users/UserName';

import { UserIcon } from '../UserIcons/UserIcons';
import { readAllOutgoings } from '../../store/outgoing';

import './AllPending.css';

const AllPending = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const pendingList = [];

    Object.values(outgoings).forEach(outgoing => {
        if (outgoing?.payer_id === sessionUser.id && outgoing?.paid === false) {
            pendingList.push(outgoing);
        }
    });


    if (pendingList.length > 0) {
        pendingList.sort((a, b) => b.created_at - a.created_at);
    }

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>PENDING</div>
            <div>
                <img
                    id='chicken__1__white__pending'
                    src='static/chicken-1-white.png'
                    alt='chicken__1__white__pending' />
            </div>
            <div>
                <img
                    id='chicken__7__orange__pending'
                    src='static/chicken-7-orange.png'
                    alt='chicken__7__orange__pending' />
            </div>
            <div>
                <img
                    id='chicken__3__brown__pending'
                    src='static/chicken-3-brown.png'
                    alt='chicken__3__brown__pending' />
            </div>
            <div>
                <img
                    id='chicken__8__gray__pending'
                    src='static/chicken-8-dark-gray.png'
                    alt='chicken__8__gray__pending' />
            </div>
            <div className='transactions__list__container'>
                {pendingList.map((paid, i) =>
                    <div className='transactions__list__container' key={i}>
                        <Link
                            className='each__transaction'
                            to={`/pending/${paid.id}`}>
                            <div className='icon__with__message'>
                                <div className='avatar__box__transactions'>
                                    <UserIcon size={40} givenUser={paid.payer} />
                                </div>
                                <div>
                                    <div className='you__sent'>
                                        You'll send
                                        <div className='receiver__name'>
                                            <UserName user={paid.receiver} />
                                        </div>
                                        <div className='receiver__user'>
                                            <UserIcon size={20} givenUser={paid.receiver} />
                                        </div>
                                    </div>
                                    <div className='message__preview'>
                                        {paid.message}
                                    </div>
                                </div>
                            </div>
                            <div className='number__of__chickens'>
                                <div className='chickens__label'>
                                    CHICKENS
                                </div>
                                <div className='chickens__number'>
                                    {paid.pay_funds}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default AllPending;
