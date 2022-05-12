import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
// import { NavLink } from 'react-router-dom';


import './Pending.css';

const Pending = () => {
    const dispatch = useDispatch();
    // const history = useHistory();

    // const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const approved = [];
    const pendingList = [];

    Object.values(outgoings).forEach(outgoing => {
        if (outgoing.paid === true) {
            approved.push(outgoing);
        } else {
            pendingList.push(outgoing);
        }
    });

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    return (
        <div className='pending__container' >
            <div className='pending__title'>PENDING</div>
            <div>
                {pendingList.map((pending, i) =>
                    <div key={i}>
                        <Link to={`/pending/${pending.id}`}>
                            <div>{pending.message}</div>
                            <div>{pending.pay_funds}</div>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Pending;
