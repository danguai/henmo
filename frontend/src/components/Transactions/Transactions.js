import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
// import { NavLink } from 'react-router-dom';


import './Transactions.css';

const Transactions = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>APPROVED</div>
            <div>
                {approved.map((paid, i) =>
                    <div key={i}>
                        <Link to={`/transactions/${paid.id}`}>
                            <div>{paid.message}</div>
                            <div>{paid.pay_funds}</div>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Transactions;
