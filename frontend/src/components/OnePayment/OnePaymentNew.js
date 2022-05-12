import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

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
    // const [paid, setPaid] = useState(false);

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
        console.log(createdPayment);
        // history.push(`/pending/${createdPayment.id}`);
    };

    const addMessage = e => setMessage(e.target.value);
    const addFunds = e => setPayFunds(e.target.value);
    const addReceiver = e => setReceiverId(e.target.value);

    // const switchPaid = e => setPaid(!paid);

    const stopTheProp = e => e.stopPropagation();

    return (
        <div
            className='transactions__container'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}>
            <form onSubmit={handleSubmit}>
                <div>WHO
                    <input
                        className=''
                        name='receiver'
                        type='number'
                        value={receiverId}
                        onChange={addReceiver}
                    />
                </div>
                <div>MESSAGE
                    <input
                        className=''
                        name='message'
                        type='text'
                        value={message}
                        onChange={addMessage}
                    />
                </div>
                <div>AMOUNT
                    <input
                        className=''
                        name='amount'
                        type='number'
                        value={payFunds}
                        onChange={addFunds}
                    />
                </div>
                {/* <div>PAID?
                    <input
                        className=''
                        name='paid'
                        type='checkbox'
                        // value={paid}
                        checked={paid}
                        onChange={switchPaid}
                    />
                </div>
                <div className="result">
                    Above checkbox is {paid ? "true" : "false"}.
                </div> */}
                <div>
                    <button type='submit'>
                        SEND
                    </button>
                </div>
            </form>
        </div>
    )
};

export default OnePaymentNew;
