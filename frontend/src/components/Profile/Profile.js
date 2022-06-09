import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserIcon } from '../UserIcons/UserIcons';
import { readFunds, updateFunds } from '../../store/funds';

import { avatars } from '../../context/Avatar';

import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const funds = useSelector(state => state.funds);

    const userFunds = funds[sessionUser?.id];

    useEffect(() => {
        dispatch(readFunds(sessionUser.id));
    }, [dispatch]);

    const [newAmount, setNewAmount] = useState(userFunds.amount);

    const [fundDisplay, setFundDisplay] = useState('displayed__funds');
    const [fundInputDisplay, setFundInputDisplay] = useState('input__funds');

    const addFunds = async () => {
        let newFund = {
            id: userFunds.id,
            user_id: userFunds.user_id,
            amount: newAmount
        };

        await dispatch(updateFunds(newFund, newFund.id));
        setFundDisplay('displayed__funds');
        setFundInputDisplay('input__funds');
    };

    const addFundsAndDisplay = () => {
        if (fundDisplay === 'displayed__funds') {
            setFundDisplay('input__funds');
            setFundInputDisplay('displayed__funds');
        } else {
            setFundDisplay('displayed__funds');
            setFundInputDisplay('input__funds');
        }

        if (fundInputDisplay === 'input__funds') {
            setFundDisplay('input__funds');
            setFundInputDisplay('displayed__funds');
        } else {
            setFundDisplay('displayed__funds');
            setFundInputDisplay('input__funds');
        }
        setNewAmount(userFunds.amount);
    };

    if (!userFunds) return null;

    return (
        <div className='transactions__container'>
            <div>
                {`${sessionUser.first_name} ${sessionUser.last_name}`}
            </div>
            <div>
                {`${sessionUser.email}`}
            </div>
            <div className='avatar__box__user'>
                <UserIcon size={100} />
            </div>
            <div className={`${fundDisplay}`}>
                <div
                    className='pending__tran__chickens__and__amount'
                    onClick={addFundsAndDisplay}
                >
                    <div className='pending__tran__chickens'>
                        Chickens
                    </div>
                    <div className='pending__tran__amount'>
                        {userFunds?.amount}
                    </div>
                    <div>
                        <button
                            onClick={addFundsAndDisplay}
                            className='white__button__v2 pending__edit__btn__size chicken__up'>
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${fundInputDisplay}`}>
                <div className='edit__content__position'>
                    <div>
                        <input
                            className="edit__amount__content"
                            type="number"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <button
                            onClick={addFunds}
                            className='red__button__v2 comment__U__C__btn__size'>
                            UPDATE
                        </button>
                        <button
                            onClick={addFundsAndDisplay}
                            className='white__button__v2 comment__U__C__btn__size'>
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </ div>
    )
};

export default Profile;
