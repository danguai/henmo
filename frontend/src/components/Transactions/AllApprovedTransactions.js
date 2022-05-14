import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

import User_Name from '../Users/User_Name'


// import { NavLink } from 'react-router-dom';
import './AllApprovedTransactions.css';

const AllApprovedTransactions = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const allApproved = [];
    const userApproved = [];
    const pendingList = [];

    Object.values(outgoings).forEach(outgoing => {
        if (outgoing?.paid === true) {
            allApproved.push(outgoing);
        } else if (outgoing?.payer_id === sessionUser.id) {
            userApproved.push(outgoing);
        } else if (outgoing?.paid === false) {
            pendingList.push(outgoing);
        }
    });
    console.log(outgoings);
    // need to chang this to sort them by update_at
    allApproved.sort((a, b) => b.updated_at.split(' ')[4] - a.updated_at.split(' ')[4]);

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

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
                                        You paid
                                        <span className='receiver__name'>
                                            <User_Name id={paid.receiver_id} />
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
