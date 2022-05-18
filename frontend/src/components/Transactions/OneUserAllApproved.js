import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UserName from '../Users/UserName';

import { UserIcon } from '../UserIcons/UserIcons';
import { readAllOutgoings } from '../../store/outgoing';

import './OneUserAllApproved.css';

const OneUserAllApproved = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const userApproved = [];

    console.log('MY TRANSACTIONS: ', userApproved);

    Object.values(outgoings).forEach(outgoing => {
        if (outgoing?.payer_id === sessionUser.id && outgoing?.paid === true) {
            userApproved.push(outgoing);
        }
    });

    userApproved.sort((a, b) => b.created_at - a.created_at);

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>MY TRANSACTION</div>
            <div>
                <img
                    id='chicken__4__gray__one__approved'
                    src='static/chicken-4-light-gray.png'
                    alt='chicken__4__gray__one__approved' />
            </div>
            <div>
                <img
                    id='chicken__6__yellow__one__approved'
                    src='static/chicken-6-yellow.png'
                    alt='chicken__6__yellow__one__approved' />
            </div>
            <div className='transactions__list__container'>
                {userApproved.map((paid, i) =>
                    <div className='transactions__list__container' key={i}>
                        <Link
                            className='each__transaction'
                            to={`/approved/${paid.id}`}
                        >
                            <div className='icon__with__message'>
                                <div className='avatar__box__transactions'>
                                    <UserIcon size={40} givenUser={paid.payer} />
                                </div>
                                <div>
                                    <div className='you__sent'>
                                        You sent
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
        </div >
    );
}

export default OneUserAllApproved;
