import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import User_Name_Email from '../Users/User_Name_and_Email';

import { readAllOutgoings, updateOutgoing, deleteOutgoing } from '../../store/outgoing';

import './OnePending.css';

const OnePending = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { pending_id } = useParams();

    const sessionUser = useSelector(state => state.session?.user);
    const outgoings = useSelector(state => state.outgoing);

    const pendingTran = outgoings[pending_id];

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    const [newPayFunds, setNewPayFunds] = useState(pendingTran?.pay_funds);
    const [newMessage, setNewMessage] = useState(pendingTran?.message);
    const [isPaid, setIsPaid] = useState(false);

    const [payFundsDisplay, setPayFundsDisplay] = useState('displayed__pay__funds');
    const [payFundsInputDisplay, setPayFundsInputDisplay] = useState('not__displayed__pay__funds');
    const [messageDisplay, setMessageDisplay] = useState('displayed__message');
    const [messageInputDisplay, setMessageInputDisplay] = useState('not__displayed__message');

    const [errors, setErrors] = useState([]);

    const updatePending = async () => {
        let oneTran = {
            id: pendingTran.id,
            message: newMessage,
            paid: isPaid,
            pay_funds: newPayFunds,
            payer_id: pendingTran.payer_id,
            receiver_id: pendingTran.receiver_id
        };

        await dispatch(updateOutgoing(oneTran, pending_id));
        setMessageDisplay('displayed__message');
        setMessageInputDisplay('not__displayed__message');
        setPayFundsDisplay('displayed__pay__funds');
        setPayFundsInputDisplay('not__displayed__pay__funds');

        if (isPaid) {
            history.push('/');
        }
    };

    const deletePending = async () => {
        await dispatch(deleteOutgoing(pendingTran));
        history.push('/');
    };

    const payFundsAndInputDisplay = () => {
        if (payFundsDisplay === 'displayed__pay__funds') {
            setPayFundsDisplay('not__displayed__pay__funds');
            setPayFundsInputDisplay('displayed__pay__funds');
        } else {
            setPayFundsDisplay('displayed__pay__funds');
            setPayFundsInputDisplay('not__displayed__pay__funds');
        }

        if (payFundsInputDisplay === 'not__displayed__pay__funds') {
            setPayFundsDisplay('not__displayed__pay__funds');
            setPayFundsInputDisplay('displayed__pay__funds');
        } else {
            setPayFundsDisplay('displayed__pay__funds');
            setPayFundsInputDisplay('not__displayed__pay__funds');
        }
        setNewPayFunds(pendingTran.pay_funds);
    };

    const messageAndInputDisplay = () => {
        if (messageDisplay === 'displayed__message') {
            setMessageDisplay('not__displayed__message');
            setMessageInputDisplay('displayed__message');
        } else {
            setMessageDisplay('displayed__message');
            setMessageInputDisplay('not__displayed__message');
        }

        if (messageInputDisplay === 'not__displayed__message') {
            setMessageDisplay('not__displayed__message');
            setMessageInputDisplay('displayed__message');
        } else {
            setMessageDisplay('displayed__message');
            setMessageInputDisplay('not__displayed__message');
        }
        setNewMessage(pendingTran.message);
    };

    const approvePayment = () => {
        setIsPaid(!isPaid);
    };

    if (!pendingTran) return null;

    return (
        <div className='transactions__container'>
            <Link to='/pending'
                className='back__btn'
            >
                BACK
            </Link>
            <div className='pending__tran__container' >
                <div className='pending__tran__text__and__number'>
                    <div className='pending__tran__text'>
                        Transaction
                    </div>
                    <div className='pending__tran__number'>
                        {`#${pendingTran?.id}`}
                    </div>
                </div>
                <div className='pending__tran__from__and__name'>
                    <div className='pending__tran__from'>
                        From
                    </div>
                    <div className='pending__tran__name'>
                        {`${sessionUser.last_name}, ${sessionUser.first_name}`}
                    </div>
                </div>
                <div className='pending__tran__to__and__user'>
                    <div className='pending__tran__to'>
                        To
                    </div>
                    <User_Name_Email id={pendingTran?.receiver_id} />
                </div>
                <div>
                    <div className={`${payFundsDisplay}`}>
                        <div
                            className='pending__tran__chickens__and__amount'
                            onClick={payFundsAndInputDisplay}>
                            <div className='pending__tran__chickens'>
                                Chickens
                            </div>
                            <div className='pending__tran__amount'>
                                {pendingTran?.pay_funds}
                            </div>
                            <div>
                                <button
                                    onClick={payFundsAndInputDisplay}
                                    className='white__button__v2 pending__edit__btn__size chicken__up'>
                                    EDIT
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${payFundsInputDisplay}`}>
                        <div className='edit__content__position'>
                            <div>
                                <input
                                    type="number"
                                    value={newPayFunds}
                                    onChange={(e) => setNewPayFunds(e.target.value)}
                                    className="edit__amount__content"
                                ></input>
                            </div>
                            <div>
                                <button
                                    onClick={updatePending}
                                    className='red__button__v2 comment__U__C__btn__size'>
                                    UPDATE
                                </button>
                                <button
                                    onClick={payFundsAndInputDisplay}
                                    className='white__button__v2 comment__U__C__btn__size'>
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${messageDisplay}`}>
                        <div
                            className='pending__tran__message__and__message'
                            onClick={messageAndInputDisplay}>
                            <div className='pending__tran__message__title'>
                                Message
                            </div>
                            <div>
                                <button
                                    onClick={messageAndInputDisplay}
                                    className='white__button__v2 pending__edit__btn__size'>
                                    EDIT
                                </button>
                            </div>
                        </div>
                        <div className='pending__tran__message__content'>
                            {pendingTran?.message}
                        </div>
                    </div>
                    <div className={`${messageInputDisplay}`}>
                        <div className='edit__content__position'>
                            <div>
                                <textarea
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="edit__message__content"
                                ></textarea>
                            </div>
                            <div className='comment__edit__del'>
                                <button
                                    onClick={updatePending}
                                    className='red__button__v2 comment__U__C__btn__size'>
                                    UPDATE
                                </button>
                                <button
                                    onClick={messageAndInputDisplay}
                                    className='white__button__v2 comment__U__C__btn__size'>
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>
        </div>
    )
};

export default OnePending;
