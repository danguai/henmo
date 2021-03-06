import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { validateEmailReceiver, validateMessage, validateAmount } from '../../utils/validation';

import { createTransaction, readAllTransactions } from '../../store/transaction';

import './Payment.css';

const RequestPayment = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [users, setUsers] = useState([]);
    const [payFunds, setPayFunds] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const [click, setClick] = useState(false);

    const sessionUser = useSelector(state => state.session?.user);

    const [emailError, setEmailError] = useState('');
    const [userNotFoundError, setUserNotFoundError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [emptyFormError, setEmptyFormError] = useState('');

    const checkingErrors = (emailError || messageError || amountError);

    const addMessage = e => setMessage(e.target.value);
    const addFunds = e => setPayFunds(e.target.value);
    const addReceiverByEmail = e => setEmail(e.target.value);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(readAllTransactions());
    }, [dispatch]);

    const checkbox = () => {
        setClick(!click);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let receiverUser = users.find(user => user.email === email.toLowerCase());

        if (receiverUser?.id === sessionUser.id) {
            setEmailError("You can't send chickens to yourself.");
        } else if (receiverUser) {
            if (click === false) {
                const sendPayment = {
                    payer_id: sessionUser.id,
                    receiver_id: receiverUser.id,
                    amount: payFunds,
                    message,
                    paid: false
                };

                const createdPayment = await dispatch(createTransaction(sendPayment));
                if (!createdPayment) {
                    setEmptyFormError('You must complete the form');
                } else {
                    history.push(`/pending/${createdPayment.id}`);
                }
            } else {
                const requestPayment = {
                    payer_id: receiverUser.id,
                    receiver_id: sessionUser.id,
                    amount: payFunds,
                    message,
                    paid: false
                };

                const createdPayment = await dispatch(createTransaction(requestPayment));
                if (!createdPayment) {
                    setEmptyFormError('You must complete the form');
                } else {
                    history.push(`/pending/${createdPayment.id}`);
                }
            }
        } else {
            setUserNotFoundError('User not found');
        }
    };

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
                        <label className='forms__label'>
                            EMAIL
                            <span> *</span>
                        </label>
                        <input
                            className='forms__input'
                            name='receiver_name'
                            type='email'
                            onChange={addReceiverByEmail}
                            onBlur={() => {
                                const error = validateEmailReceiver(email)
                                if (error) setEmailError(error)
                            }}
                            onFocus={() => { setEmailError(''); setUserNotFoundError('') }}
                            value={email}
                        />
                    </div>
                    {emailError && <div className='error_style email__receiver__error'>{emailError}</div>}
                    {userNotFoundError && <div className='error_style email__receiver__error'>{userNotFoundError}</div>}
                    <div className='forms__inputs__format'>
                        <label className='forms__label'>
                            MESSAGE
                            <span> *</span>
                        </label>
                        <input
                            className='forms__input'
                            name='message'
                            type='text'
                            onChange={addMessage}
                            onBlur={() => {
                                const error = validateMessage(message)
                                if (error) setMessageError(error)
                            }}
                            onFocus={() => { setMessageError(''); setUserNotFoundError('') }}
                            value={message}
                        />
                    </div>
                    {messageError && <div className='error_style message__error'>{messageError}</div>}
                    <div className='forms__inputs__format' >
                        <label className='forms__label'>
                            AMOUNT
                            <span> *</span>
                        </label>
                        <input
                            className='forms__input'
                            name='amount'
                            type='number'
                            onChange={addFunds}
                            onBlur={() => {
                                const error = validateAmount(payFunds)
                                if (error) setAmountError(error)
                            }}
                            onFocus={() => { setAmountError('') }}
                            value={payFunds}
                        />
                    </div>
                    {amountError && <div className='error_style amount__error'>{amountError}</div>}
                    <div className="result">
                    </div>
                    {emptyFormError && <div className='error_style amount__error'>{emptyFormError}</div>}
                    <div className='forms__inputs__format' >
                        <label className='forms__label'>
                            SEND OR REQUEST
                            <span> *</span>
                        </label>
                        <div className='send__or__req__check'>
                            <input
                                type='checkbox'
                                onChange={checkbox}
                            >
                            </input>
                        </div>
                    </div>
                    <div>
                        <button
                            className={checkingErrors ?
                                'red__button__disabled login__btn__size send__btn__margin__bottom' :
                                'red__button__basic login__btn__size send__btn__margin__bottom'}
                            disabled={checkingErrors}
                            type='submit'>
                            {click ? 'REQUEST' : 'SEND'}
                        </button>
                    </div>
                    <div className='required'>* REQUIRED</div>
                </form>
            </div>
            <div className='foot__note'>
                <div>
                    **
                </div>
                Transactions will be in
                <span>
                    PENDING
                </span>
                waiting for
                <span>
                    APPROVAL
                </span>
            </div>
        </div>
    )
};

export default RequestPayment;
