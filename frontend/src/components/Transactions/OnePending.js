import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

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

    console.log(pending_id);
    console.log(pendingTran);
    const [newPayFunds, setNewPayFunds] = useState(pendingTran?.pay_funds);
    const [newMessage, setNewMessage] = useState(pendingTran?.message);
    const [errors, setErrors] = useState([]);

    // const [paid, setPaid] = useState(false);

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
            paid: pendingTran.paid,
            pay_funds: newPayFunds,
            payer_id: pendingTran.payer_id,
            receiver_id: pendingTran.receiver_id
        };

        const updatedTran = await dispatch(updateOutgoing(oneTran, pending_id));
        console.log('UPDATED TRANSACTION: ', updatedTran);
        // setMessageDisplay('displayed__message');
        // setMessageInputDisplay('not__displayed__message');
        // history.push('/pending');
        setNewMessage('');
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

    const approvePayment = () => { };

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
            <div className='approved__tran__container' >
                <div>
                    Transaction Number {pendingTran.id}
                </div>
                <div>
                    From {sessionUser.last_name}, {sessionUser.first_name}
                </div>
                <div>
                    To
                    <span>
                        (Need to Add Logic)
                    </span>
                    {pendingTran.receiver_id}
                </div>
                <div>
                    Chickens {pendingTran.pay_funds}
                </div>
                <div>
                    Message {pendingTran.message}
                </div>
                <div>
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
                {/* <div>
                    (TEMP) PENDING
                </div> */}
                <div className=''>
                    <button
                        id=''
                        className=''
                        onClick={approvePayment}
                    >Approve Payment</button>
                </div>
                <div className=''>
                    <button
                        id=''
                        className=''
                        onClick={() => deletePending(pendingTran)}
                    >Delete Payment</button>
                </div>
            </div>
        </div>
    )
};

export default OnePending;
