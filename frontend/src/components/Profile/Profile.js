import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserIcon } from '../UserIcons/UserIcons';
import { readFunds, updateFunds } from '../../store/funds';
import { updateUser } from '../../store/session';

import { avatars } from '../../context/Avatar';

import './Profile.css';
import { Icons } from '../UserIcons/Icons';

const Profile = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const funds = useSelector(state => state.funds);

    const userFunds = funds[sessionUser?.id];

    useEffect(() => {
        dispatch(readFunds(sessionUser.id));
    }, [dispatch]);

    const [newAmount, setNewAmount] = useState(userFunds?.amount);

    const [newFirstName, setNewFirstName] = useState(sessionUser.first_name);
    const [newLastName, setNewLastName] = useState(sessionUser.last_name);
    const [newAvatarId, setNewAvatarId] = useState(sessionUser.avatar_id);

    const [fundDisplay, setFundDisplay] = useState('displayed__funds');
    const [fundInputDisplay, setFundInputDisplay] = useState('input__funds');
    const [namesDisplay, setNamesDisplay] = useState('displayed__names');
    const [namesInputDisplay, setNamesInputDisplay] = useState('input__names');
    const [avatarDisplay, setAvatarDisplay] = useState('displayed__avatars');
    const [avatarInputDisplay, setAvatarInputDisplay] = useState('input__avatars');

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

    const changeUserName = async () => {
        let editUserName = {
            first_name: sessionUser.first_name,
            last_name: sessionUser.last_name,
            avatar_id: sessionUser.avatar_id,
        };

        await dispatch(updateUser(editUserName, editUserName.id));
        setNamesDisplay('displayed__names');
        setNamesInputDisplay('input__names');
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

    const changeNameAndDisplay = () => {
        if (namesDisplay === 'displayed__names') {
            setNamesDisplay('input__names');
            setNamesInputDisplay('displayed__names');
        } else {
            setNamesDisplay('displayed__names');
            setNamesInputDisplay('input__names');
        }

        if (namesInputDisplay === 'input__names') {
            setNamesDisplay('input__names');
            setNamesInputDisplay('displayed__names');
        } else {
            setNamesDisplay('displayed__names');
            setNamesInputDisplay('input__names');
        }
        setNewFirstName(sessionUser.first_name);
        setNewLastName(sessionUser.last_name);
    };

    const changeAvatarAndDisplay = () => {
        if (avatarDisplay === 'displayed__avatars') {
            setAvatarDisplay('input__avatars');
            setAvatarInputDisplay('displayed__avatars');
        } else {
            setAvatarDisplay('displayed__avatars');
            setAvatarInputDisplay('input__avatars');
        }

        if (avatarInputDisplay === 'input__avatars') {
            setAvatarDisplay('input__avatars');
            setAvatarInputDisplay('displayed__avatars');
        } else {
            setAvatarDisplay('displayed__avatars');
            setAvatarInputDisplay('input__avatars');
        }
        setNewAvatarId(sessionUser.avatar_id);
    };

    if (!userFunds) return null;

    return (
        <div className='profile__container'>
            <div className='forms__name'>
                USER PROFILE
            </div>
            <div className='profile__edges'>
                <div className='label__and__button'>
                    <label className='profile__label'>
                        NAME
                    </label>
                    <div className={`${namesDisplay}`}>
                        <button
                            onClick={changeNameAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            EDIT
                        </button>
                    </div>
                    <div className={`${namesInputDisplay}`}>
                        <button
                            onClick={changeUserName}
                            className='red__button__v2 edit__profile__btn__size'>
                            UPDATE
                        </button>
                        <button
                            onClick={changeNameAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            CANCEL
                        </button>
                    </div>
                </div>
                <div className={`${namesDisplay}`}>
                    <div onClick={changeNameAndDisplay}>
                        <div className='profile__user__name'>
                            {`${sessionUser.first_name} ${sessionUser.last_name}`}
                        </div>
                    </div>
                </div>
                <div className={`${namesInputDisplay}`}>
                    <div className='edit__content__position'>
                        <div className='edit__profile__inputs'>
                            <input
                                // className="edit__profile__input__name"
                                type="text"
                                value={newFirstName}
                                onChange={(e) => setNewFirstName(e.target.value)}
                            />
                            <input
                                // className="edit__profile__input__name"
                                type="text"
                                value={newLastName}
                                onChange={(e) => setNewLastName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile__edges'>
                <label className='profile__label'>
                    EMAIL
                </label>
                <div className='profile__user__email'>
                    {`${sessionUser.email}`}
                </div>
            </div>
            <div className='profile__edges'>
                <div className='label__and__button'>
                    <label className='profile__label'>
                        AVATAR
                    </label>
                    <div className={`${avatarDisplay}`}>
                        <button
                            onClick={changeAvatarAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            EDIT
                        </button>
                    </div>
                    <div className={`${avatarInputDisplay}`}>
                        <button
                            onClick={addFunds}
                            className='red__button__v2 edit__profile__btn__size'>
                            UPDATE
                        </button>
                        <button
                            onClick={changeAvatarAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            CANCEL
                        </button>
                    </div>
                </div>
                <div className={`${avatarDisplay}`}>
                    <div onClick={changeAvatarAndDisplay}>
                        <div className='avatar__profile'>
                            <UserIcon size={100} />
                        </div>
                    </div>
                </div>
                <div className={`${avatarInputDisplay}`}>
                    <div className='edit__content__position'>
                        <Icons avatarId={newAvatarId} setAvatarId={setNewAvatarId} />
                    </div>
                </div>
            </div>
            <div className='profile__edges'>
                <div className='label__and__button'>
                    <label className='profile__label'>
                        FUNDS
                    </label>
                    <div className={`${fundDisplay}`}>
                        <button
                            onClick={addFundsAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            EDIT
                        </button>
                    </div>
                    <div className={`${fundInputDisplay}`}>
                        <button
                            onClick={addFunds}
                            className='red__button__v2 edit__profile__btn__size'>
                            UPDATE
                        </button>
                        <button
                            onClick={addFundsAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            CANCEL
                        </button>
                    </div>
                </div>
                <div
                    className='pending__tran__chickens__and__amount'
                    onClick={addFundsAndDisplay}
                >
                    <div className='pending__tran__chickens'>
                        Chickens
                    </div>
                    <div className={`${fundDisplay}`}>
                        <div className='pending__tran__amount'>
                            {userFunds?.amount}
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
                    </div>
                </div>
            </div>
        </ div>
    )
};

export default Profile;
