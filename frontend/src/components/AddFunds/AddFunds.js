import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { validateEmailReceiver, validateMessage, validateAmount } from '../../utils/validation';

import { createTransaction, readAllTransactions } from '../../store/transaction';

import './AddFunds.css';

const AddFunds = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [users, setUsers] = useState([]);
    const [payFunds, setPayFunds] = useState('');
    const [message, setMessage] = useState('');
    const [receiver, setReceiver] = useState('');

    const sessionUser = useSelector(state => state.session?.user);

    const [amountError, setAmountError] = useState('');
    const [emptyFormError, setEmptyFormError] = useState('');

    const checkingErrors = (amountError);

    const addFunds = e => setPayFunds(e.target.value);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let receiverUser = users.find(user => user.email === receiver.toLowerCase());

        if (receiverUser?.id === sessionUser.id) {
            setEmailError("You can't send chickens to yourself.");
        } else if (receiverUser) {
            const newPayment = {
                payer_id: sessionUser.id,
                receiver_id: receiverUser.id,
                amount: payFunds,
                message,
                paid: false
            };

            const createdPayment = await dispatch(createTransaction(newPayment));
            if (!createdPayment) {
                setEmptyFormError('You must complete the form');
            } else {
                history.push(`/pending/${createdPayment.id}`);
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
                    <div>
                        <button
                            className={checkingErrors ?
                                'red__button__disabled login__btn__size send__btn__margin__bottom' :
                                'red__button__basic login__btn__size send__btn__margin__bottom'}
                            disabled={checkingErrors}
                            type='submit'>
                            ADD
                        </button>
                    </div>
                    <div className='required'>* REQUIRED</div>
                </form>
            </div>

        </div>
    )
};

export default AddFunds;
