import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import User from '../Users/User';

import { readOneOutgoing, updateOutgoing, deleteOutgoing } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

// import { NavLink } from 'react-router-dom';


import './OnePending.css';

const OnePending = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { pending_id } = useParams();

    const sessionUser = useSelector(state => state.session?.user);
    const pendingTran = useSelector(state => state.outgoing[pending_id]);

    const [newPayFunds, setNewPayFunds] = useState(pendingTran?.pay_funds);
    const [newMessage, setNewMessage] = useState(pendingTran?.message);
    const [newPaid, setNewPaid] = useState(false);
    const [errors, setErrors] = useState([]);


    const [payFundsDisplay, setPayFundsDisplay] = useState('displayed__pay__funds');
    const [payFundsInputDisplay, setPayFundsInputDisplay] = useState('not__displayed__pay__funds');
    const [messageDisplay, setMessageDisplay] = useState('displayed__message');
    const [messageInputDisplay, setMessageInputDisplay] = useState('not__displayed__message');

    const [showEditModal, setShowEditModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);


    // useEffect(() => {
    //     const func = async () => {
    //         dispatch(readOneOutgoing(pending_id));
    //         setIsLoaded(true);
    //     };
    //     func();
    // }, [dispatch, pending_id]);

    const updatePending = async () => {
        let oneTran = {
            id: pendingTran.id,
            message: newMessage,
            paid: newPaid,
            pay_funds: newPayFunds,
            payer_id: pendingTran.payer_id,
            receiver_id: pendingTran.receiver_id
        };

        const updatedTran = await dispatch(updateOutgoing(oneTran, pending_id));
        console.log('UPDATED TRANSACTION: ', updatedTran);
        setMessageDisplay('displayed__message');
        setMessageInputDisplay('not__displayed__message');
        setPayFundsDisplay('displayed__pay__funds');
        setPayFundsInputDisplay('not__displayed__pay__funds');

        if (newPaid) {
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
        setNewPaid(!newPaid);
    };

    console.log('APPROVED PAYMENT: ', newPaid);


    if (!pendingTran) {
        if (isLoaded) {
            history.push('/pending');
        }
        return null;
    }

    const stopTheProp = e => e.stopPropagation();

    return (
        <div
            className='transactions__container'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
        >
            <Link to='/pending'
                className='back__btn'
            >
                BACK
            </Link>
            <div className='pending__tran__container' >
                <div className='pending__tran__text'>
                    Transaction #
                    <span className='pending__tran__number'>
                        {pendingTran?.id}
                    </span>
                </div>
                <div>
                    <span>
                        From
                    </span>
                    {sessionUser.last_name}, {sessionUser.first_name}
                </div>
                <div className='to__user'>
                    <span>
                        To
                    </span>
                    <User id={pendingTran?.receiver_id} />
                </div>
                <div>
                    <div className={`${payFundsDisplay}`}>
                        <div className='edit__amount' onClick={payFundsAndInputDisplay}>
                            <div>
                                Chickens
                            </div>
                            <div>
                                {pendingTran?.pay_funds}
                            </div>
                            <div>
                                <button
                                    onClick={payFundsAndInputDisplay}
                                    className=''>
                                    Edit
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
                                    className="content__input"
                                ></input>
                            </div>
                            <div>
                                <button
                                    onClick={updatePending}
                                    className=''>
                                    Update
                                </button>
                                <button
                                    onClick={payFundsAndInputDisplay}
                                    className=''>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${messageDisplay}`}>
                        <div className='edit__message' onClick={messageAndInputDisplay}>
                            <div>
                                Message
                            </div>
                            <div>
                                {pendingTran?.message}
                            </div>
                            <div>
                                <button
                                    onClick={messageAndInputDisplay}
                                    className=''>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${messageInputDisplay}`}>
                        <div className='edit__content__position'>
                            <div>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="content__input"
                                ></input>
                            </div>
                            <div>
                                <button
                                    onClick={updatePending}
                                    className=''>
                                    Update
                                </button>
                                <button
                                    onClick={messageAndInputDisplay}
                                    className=''>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pending__approve__delete'>
                    <div className=''>
                        <button

                            className='red__button__basic approve__btn__size'
                            onMouseDown={approvePayment}
                            onMouseUp={updatePending}
                        >Approve</button>
                    </div>
                    <div className='pending__approve__delete'>
                        <button
                            className='blue__button__basic approve__btn__size'
                            onClick={() => deletePending(pendingTran)}
                        >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OnePending;
