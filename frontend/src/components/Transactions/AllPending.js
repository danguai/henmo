import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserIcon } from '../UserIcons/UserIcons';
import { readAllOutgoings } from '../../store/outgoing';

import './AllPending.css';

const AllPending = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const approved = [];
    const pending = [];

    Object.values(outgoings).forEach(outgoing => {
        if (outgoing.paid === true) {
            approved.push(outgoing);
        } else {
            pending.push(outgoing);
        }
    });

    // need to chang this to sort them by create_at
    pending.sort((a, b) => b.id - a.id);

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>PENDING</div>
            <div className='transactions__list__container'>
                {pending.map((paid, i) =>
                    <div className='transactions__list__container' key={i}>
                        <Link
                            className='each__transaction'
                            to={`/pending/${paid.id}`}>
                            <div className='icon__with__message'>
                                <div className='avatar__box__transactions'>
                                    <UserIcon size={40} />
                                </div>
                                <div>
                                    <div className='you__paid'>
                                        You paid
                                        <span className='receiver__name'>
                                            RECEIVER: {paid.receiver_id}
                                        </span>
                                    </div>
                                    <div>
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
