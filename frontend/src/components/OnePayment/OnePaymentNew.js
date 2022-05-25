import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { validateEmailReceiver, validateMessage, validateAmount } from '../../utils/validation';
import { createOutgoing, readAllOutgoings } from '../../store/outgoing';

import SendPayment from './SendPayment';
import RequestPayment from './RequestPayment';

import './OnePayment.css';

const OnePaymentNew = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [users, setUsers] = useState([]);
    const [payFunds, setPayFunds] = useState('');
    const [message, setMessage] = useState('');
    const [receiver, setReceiver] = useState('');

    const sessionUser = useSelector(state => state.session?.user);

    const [emailError, setEmailError] = useState('');
    const [userNotFoundError, setUserNotFoundError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [emptyFormError, setEmptyFormError] = useState('');


    const checkingErrors = (emailError || messageError || amountError);

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

    useEffect(() => {
        dispatch(readAllOutgoings());
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
                pay_funds: payFunds,
                message,
                paid: false
            };

            const createdPayment = await dispatch(createOutgoing(newPayment));
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
            <div className='send__or__request'>
                <div className='approved__payment__container' >
                    <SendPayment />
                </div>
                <div className='approved__payment__container' >
                    <RequestPayment />
                </div>

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

export default OnePaymentNew;
