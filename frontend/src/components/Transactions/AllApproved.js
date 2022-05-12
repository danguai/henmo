import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
import { readAllOutgoings, readOneOutgoing } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

// import { NavLink } from 'react-router-dom';


import './AllApproved.css';
import OneApproved from './OneApproved';

const AllApproved = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const [modal, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const showModal = () => setModal(true);

    const approved = [];
    const pending = [];

    Object.values(outgoings).forEach(outgoing => {
        if (outgoing.paid === true) {
            approved.push(outgoing);
        } else {
            pending.push(outgoing);
        }
    });

    approved.sort((a, b) => b.id - a.id);

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>APPROVED</div>
            <div className='transactions__list__container'>
                {approved.map((paid, i) =>
                    <div className='transactions__list__container' key={i}>
                        <Link
                            className='each__transaction'
                            to={`/transactions/${paid.id}`}

                        >
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
            {/* {modal && (
                <Modal closeModal={closeModal}>
                    <OneApproved closeModal={closeModal} />
                </Modal>
            )} */}
        </div >
    );
}

export default AllApproved;
