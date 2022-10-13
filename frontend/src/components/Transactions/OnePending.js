import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { validateAmount, validateMessage } from '../../utils/validation';

import UserNameEmail from '../Users/UserNameEmail';

import { readAllTransactions, readOneTransaction, updateTransaction, deleteTransaction } from '../../store/transaction';

import './OnePending.css';

const OnePending = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { pending_id } = useParams();

    const sessionUser = useSelector(state => state.session?.user);
    const transactions = useSelector(state => state.transaction);

    const pendingTran = transactions[pending_id];

    const [newPayFunds, setNewPayFunds] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [isPaid, setIsPaid] = useState(false);

    const [amountError, setAmountError] = useState('');
    const [messageError, setMessageError] = useState('');

    const [editFundsEnable, setEditFundsEnable] = useState(false);
    const [editMessageEnable, setEditMessageEnable] = useState(false);

    useEffect(async () => {
        const transact = await dispatch(readOneTransaction(pending_id));
        setNewPayFunds(transact.amount);
        setNewMessage(transact.message);
    }, [dispatch]);

    const updatePending = async () => {
        let oneTran = {
            id: pendingTran.id,
            message: newMessage,
            paid: isPaid,
            amount: newPayFunds,
            payer_id: pendingTran.payer_id,
            receiver_id: pendingTran.receiver_id
        };

        await dispatch(updateTransaction(oneTran, pending_id));
        setEditFundsEnable(false);
        setEditMessageEnable(false);
        if (isPaid) history.push('/');
    };

    const deletePending = async () => {
        await dispatch(deleteTransaction(pendingTran));
        history.push('/');
    };

    const payFundsOrFormDisplay = () => {
        setEditFundsEnable(!editFundsEnable);
        setNewPayFunds(pendingTran.amount);
    };

    const messageOrFormDisplay = () => {
        setEditMessageEnable(!editMessageEnable);
        setNewMessage(pendingTran.message);
    };

    const approvePayment = () => setIsPaid(!isPaid);

    if (!pendingTran) return null;

    const paymentSender = pendingTran.payer_id === sessionUser.id;
    const paymentReceiver = pendingTran.receiver_id === sessionUser.id;

    const backAndAll = () => {
        return (
            <div className='back__all'>
                <Link to='/pending-out'
                    className='back__all__btn'
                >
                    BACK
                </Link>
                <Link to='/pending'
                    className='back__all__btn'
                >
                    ALL
                </Link>
            </div>
        )
    }

    const transactionNumber = () => {
        return (
            <div className='pending__tran__text__and__number'>
                <div className='pending__tran__text'>
                    Transaction
                </div>
                <div className='pending__tran__number'>
                    {`#${pendingTran?.id}`}
                </div>
            </div>
        )
    }

    const senderReceiver = () => {
        return (
            <div>
                <div className='pending__tran__from__and__name'>
                    <div className='pending__tran__from'>
                        From
                    </div>
                    {paymentSender &&
                        <div className='pending__tran__name'>
                            {`${pendingTran.payer.last_name}, ${pendingTran.payer.first_name}`}
                        </div>
                    }
                    {paymentReceiver && <UserNameEmail user={pendingTran?.receiver} />}
                </div>
                <div className='pending__tran__to__and__user'>
                    <div className='pending__tran__to'>
                        To
                    </div>
                    {paymentSender && <UserNameEmail user={pendingTran?.receiver} />}
                    {paymentReceiver &&
                        <div className='pending__tran__name'>
                            {`${pendingTran.payer.last_name}, ${pendingTran.payer.first_name}`}
                        </div>
                    }
                </div>
            </div>
        )
    }

    const renderFundsAndEditButton = () => {
        return (
            <>
                {!editFundsEnable && <div
                    className='pending__tran__chickens__and__amount'
                    onClick={payFundsOrFormDisplay}>
                    <div className='pending__tran__chickens'>
                        Chickens
                    </div>
                    <div className='pending__tran__amount'>
                        {pendingTran?.amount}
                    </div>
                    {paymentSender &&
                        <div>
                            <button
                                onClick={payFundsOrFormDisplay}
                                className='white__button__v2 pending__edit__btn__size chicken__up'>
                                EDIT
                            </button>
                        </div>
                    }
                </div>}
            </>
        )
    }

    const displayEditFundsForm = () => {
        return (
            <>
                {editFundsEnable && <div className='edit__content__position'>
                    <div>
                        <input
                            className="edit__amount__content"
                            type="number"
                            onChange={(e) => setNewPayFunds(e.target.value)}
                            onBlur={() => {
                                const error = validateAmount(newPayFunds)
                                if (error) setAmountError(error)
                            }}
                            onFocus={() => { setAmountError('') }}
                            value={newPayFunds}
                        />
                        {amountError && <div className='error_style amount__error'>{amountError}</div>}
                    </div>
                    <div>
                        <button
                            onClick={updatePending}
                            className='red__button__v2 comment__U__C__btn__size'>
                            UPDATE
                        </button>
                        <button
                            onClick={payFundsOrFormDisplay}
                            className='white__button__v2 comment__U__C__btn__size'>
                            CANCEL
                        </button>
                    </div>
                </div>}
            </>
        )
    }

    const renderMessageAndEditButton = () => {
        return (
            <>
                {!editMessageEnable && <div>
                    <div
                        className='pending__tran__message__and__message'
                        onClick={messageOrFormDisplay}>
                        <div className='pending__tran__message__title'>
                            Message
                        </div>
                        {paymentSender &&
                            <div>
                                <button
                                    onClick={messageOrFormDisplay}
                                    className='white__button__v2 pending__edit__btn__size'>
                                    EDIT
                                </button>
                            </div>
                        }
                    </div>
                    <div className='pending__tran__message__content'>
                        {pendingTran?.message}
                    </div>
                </div>}
            </>
        )
    }

    const displayEditMessageForm = () => {
        return (
            <>
                {editMessageEnable && <div className='edit__content__position'>
                    <div>
                        <textarea
                            className="edit__message__content"
                            type="text"
                            onChange={(e) => setNewMessage(e.target.value)}
                            onBlur={() => {
                                const error = validateMessage(newMessage)
                                if (error) setMessageError(error)
                            }}
                            onFocus={() => { setMessageError('') }}
                            value={newMessage}
                        />
                    </div>
                    {messageError && <div className='error_style message__error__pending'>{messageError}</div>}
                    <div className='comment__edit__del'>
                        <button
                            onClick={updatePending}
                            className='red__button__v2 comment__U__C__btn__size'>
                            UPDATE
                        </button>
                        <button
                            onClick={messageOrFormDisplay}
                            className='white__button__v2 comment__U__C__btn__size'>
                            CANCEL
                        </button>
                    </div>
                </div>}
            </>
        )
    }

    const approvedBySender = () => {
        return (
            <div className='pending__approve__delete'>
                <div className='approve__delete__margin'>
                    <button
                        className='red__button__basic approve__btn__size'
                        onMouseDown={approvePayment}
                        onMouseUp={updatePending}
                    >APPROVE</button>
                </div>
                <div className='approve__delete__margin'>
                    <button
                        className='blue__button__basic approve__btn__size'
                        onClick={() => deletePending(pendingTran)}
                    >DELETE</button>
                </div>
            </div>
        )
    }

    const approvedByReceiver = () => {
        return (
            <div className='pending__approve__delete'>
                <div className='approve__delete__margin'>
                    <button
                        className='red__button__basic approve__solo__btn__size'
                        onMouseDown={approvePayment}
                        onMouseUp={updatePending}
                    >APPROVE</button>
                </div>
            </div>
        )
    }

    return (
        <div className='transactions__container'>
            {backAndAll()}
            <div className='pending__tran__container'>
                {transactionNumber()}
                {senderReceiver()}
                <div>
                    {renderFundsAndEditButton()}
                    {displayEditFundsForm()}
                </div>
                <div>
                    {renderMessageAndEditButton()}
                    {displayEditMessageForm()}
                </div>
                {paymentSender && approvedBySender()}
                {paymentReceiver && approvedByReceiver()}
            </div>
            <div >
                <img
                    id='chicken__6__yellow__one__pending'
                    src='/static/chicken-6-yellow.png'
                    alt='chicken__6__yellow__one__pending' />
            </div>
            <div>
                <img
                    id='chicken__4__gray__one__pending'
                    src='/static/chicken-4-light-gray.png'
                    alt='chicken__4__gray__one__pending' />
            </div>
        </div>
    )
};

export default OnePending;
