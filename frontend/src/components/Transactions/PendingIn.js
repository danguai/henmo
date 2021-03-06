import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UserName from '../Users/UserName';

import { UserIcon } from '../UserIcons/UserIcons';
import { readAllTransactions } from '../../store/transaction';

import './PendingAll.css';

export const Incoming = ({ trans, i }) => {
    return (
        <div className='transactions__list__container' key={i}>
            <Link
                className='each__transaction'
                to={`/pending/${trans.id}`}>
                <div className='icon__with__message'>
                    <div className='avatar__box__transactions'>
                        <UserIcon size={40} givenUser={trans.payer} />
                    </div>
                    <div>
                        <div className='you__sent'>
                            From
                            <div className='receiver__name'>
                                <UserName user={trans.payer} />
                            </div>
                        </div>
                        <div className='message__preview'>
                            {trans.message}
                        </div>
                    </div>
                </div>
                <div className='number__of__chickens__green'>
                    <div className='chickens__label'>
                        CHICKENS
                    </div>
                    <div className='chickens__number'>
                        {trans.amount}
                    </div>
                </div>
            </Link>
        </div>
    )
};

const PendingIn = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const transactions = useSelector(state => state.transaction);

    const pendingList = [];

    Object.values(transactions).forEach(transaction => {
        if (transaction?.receiver_id === sessionUser.id && transaction?.paid === false) {
            pendingList.push(transaction);
        }
    });


    if (pendingList.length > 0) {
        pendingList.sort((a, b) => b.created_at - a.created_at);
    }

    useEffect(() => {
        dispatch(readAllTransactions());
    }, [dispatch]);

    if (!transactions) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>INCOMING</div>
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
            {pendingList.length > 0 ?
                <div className='transactions__list__container'>
                    {pendingList.map((trans, i) =>
                        <Incoming trans={trans} i={i} />
                    )}

                </div> :
                <div className='no__transactions'>
                    You have NO incoming transaction.
                </div>
            }
        </div>
    );
}

export default PendingIn;
