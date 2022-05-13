import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


import { createOutgoing } from '../../store/outgoing';
// import { NavLink } from 'react-router-dom';

import './OnePayment.css';

const OnePaymentNew = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session?.user);

    const [receiverId, setReceiverId] = useState('');
    const [payFunds, setPayFunds] = useState('');
    const [message, setMessage] = useState('');

    const [receiver, setReceiver] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPayment = {
            payer_id: sessionUser.id,
            receiver_id: receiverId,
            pay_funds: payFunds,
            message,
            paid: false
        };

        console.log('NEW PAYMENT: ', newPayment);

        const createdPayment = await dispatch(createOutgoing(newPayment));
        console.log('CREATED PAYMENT: ', createdPayment);
        history.push(`/pending/${createdPayment.id}`);
    };

    const addMessage = e => setMessage(e.target.value);
    const addFunds = e => setPayFunds(e.target.value);
    const addReceiver = e => setReceiverId(e.target.value);


    return (
        <div className='transactions__container'>
            <Link to='/'
                className='back__btn'
            >
                BACK
            </Link>
            <div className='approved__payment__container' >
                <form onSubmit={handleSubmit}>
                    <div className='forms__inputs__format'>
                        <label className='forms__label'>RECEIVER</label>
                        <input
                            className='forms__input'
                            name='receiver'
                            type='number'
                            value={receiverId}
                            onChange={addReceiver}
                        />
                        {/* <input
                            className='forms__input'
                            name='receiver'
                            type='text'
                            value={receiverId}
                            onChange={addReceiver}
                        /> */}
                    </div>
                    <div className='forms__inputs__format'>
                        <label className='forms__label'>MESSAGE</label>
                        <input
                            className='forms__input'
                            name='message'
                            type='text'
                            value={message}
                            onChange={addMessage}
                        />
                    </div>
                    <div className='forms__inputs__format' >
                        <label className='forms__label'>AMOUNT</label>
                        <input
                            className='forms__input'
                            name='amount'
                            type='number'
                            value={payFunds}
                            onChange={addFunds}
                        />
                    </div>
                    <div className="result">
                        {/* Above checkbox is {paid ? "true" : "false"}. */}
                    </div>
                    <div>
                        <button className='red__button__basic login__btn__size send__btn__margin__bottom' type='submit'>
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
};

export default OnePaymentNew;
