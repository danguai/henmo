import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { createOutgoing, readAllOutgoings } from '../../store/outgoing';

import './OnePayment.css';

const OnePaymentNew = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const [users, setUsers] = useState([]);

    const [payFunds, setPayFunds] = useState('');
    const [message, setMessage] = useState('');

    const [receiver, setReceiver] = useState('');

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    let receiver_user = users.find(user => user.email === receiver.toLowerCase());

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPayment = {
            payer_id: sessionUser.id,
            receiver_id: receiver_user.id,
            pay_funds: payFunds,
            message,
            paid: false
        };

        const createdPayment = await dispatch(createOutgoing(newPayment));
        history.push(`/pending/${createdPayment.id}`);
    };

    const addMessage = e => setMessage(e.target.value);
    const addFunds = e => setPayFunds(e.target.value);

    const addReceiverByEmail = e => setReceiver(e.target.value);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

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
                        <label className='forms__label'>EMAIL</label>
                        <input
                            className='forms__input'
                            name='receiver_name'
                            type='text'
                            value={receiver}
                            onChange={addReceiverByEmail}
                        />
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
