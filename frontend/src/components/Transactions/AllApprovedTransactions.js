import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { readAllOutgoings } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

import UserName from '../Users/UserName';

import './AllApprovedTransactions.css';

const AllApprovedTransactions = () => {
    const dispatch = useDispatch();

    const outgoings = useSelector(state => state.outgoing);

    const allApproved = [];

    Object.values(outgoings).forEach(outgoing => {
        if (outgoing?.paid === true) {
            allApproved.push(outgoing);
        }
    });

    allApproved.sort((a, b) => b.updated_at.split(' ')[4] - a.updated_at.split(' ')[4]);

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;
    if (!UserName) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>ALL TRANSACTIONS</div>
            <div className='transactions__list__container'>
                {allApproved.map((paid, i) =>
                    <div className='transactions__list__container' key={i}>
                        <Link
                            className='each__transaction'
                            to={`/approved/${paid.id}`}
                        >
                            <div className='icon__with__message'>
                                <div className='avatar__box__transactions'>
                                    <UserIcon size={40} />
                                </div>
                                <div>
                                    <div className='you__paid'>
                                        <span className='receiver__name'>
                                            <UserName id={paid.payer_id} />
                                        </span>
                                        sent
                                        <span className='receiver__name'>
                                            <UserName id={paid.receiver_id} />
                                        </span>
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

export default AllApprovedTransactions;