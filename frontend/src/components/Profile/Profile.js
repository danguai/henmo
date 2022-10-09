import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserIcon } from '../UserIcons/UserIcons';
import { readFunds, updateFunds } from '../../store/funds';
import { updateUser } from '../../store/session';

import { avatars } from '../../context/Avatar';

import {
    validateFirstName,
    validateLastName,
    validateEmail,
} from '../../utils/validation';

import './Profile.css';
import { Icons } from '../UserIcons/Icons';

const Profile = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const funds = useSelector(state => state.funds);

    const userFunds = Object.values(funds)[0];

    useEffect(() => {
        dispatch(readFunds(sessionUser.id));
    }, [dispatch]);

    const [newAmount, setNewAmount] = useState(userFunds?.amount);

    const [newFirstName, setNewFirstName] = useState(sessionUser.first_name);
    const [newLastName, setNewLastName] = useState(sessionUser.last_name);
    const [newAvatarId, setNewAvatarId] = useState(sessionUser.avatar_id);

    const [editFundsEnable, setEditFundsEnable] = useState(false);
    const [editFirstNameEnable, setEditFirstNameEnable] = useState(false);
    const [editLastNameEnable, setEditLastNameEnable] = useState(false);
    const [editAvatarEnable, setEditAvatarEnable] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [avatarError, setAvatarError] = useState('');

    const addFunds = async () => {
        let newFund = {
            id: userFunds.id,
            user_id: userFunds.user_id,
            amount: newAmount
        };

        await dispatch(updateFunds(newFund, newFund.id));
        setEditFundsEnable(false);
    };

    const changeUser = async () => {
        let editUser = {
            first_name: newFirstName,
            last_name: newLastName,
            avatar_id: newAvatarId,
        };

        await dispatch(updateUser(editUser, sessionUser.id));
        setEditFirstNameEnable(false);
        setEditLastNameEnable(false);
        setEditAvatarEnable(false);
    };

    const addFundsAndDisplay = () => {
        setEditFundsEnable(!editFundsEnable);
        setNewAmount(userFunds.amount);
    };

    const changeNameAndDisplay = () => {
        setEditFirstNameEnable(!editFirstNameEnable);
        setNewFirstName(sessionUser.first_name);

        setEditLastNameEnable(!editLastNameEnable);
        setNewLastName(sessionUser.last_name);
    };

    const changeAvatarAndDisplay = () => {
        setEditAvatarEnable(!editAvatarEnable);
        setNewAvatarId(sessionUser.avatar_id);
    };

    if (!userFunds) return null;

    const renderNameAndEditButtons = () => {
        return (
            <>
                <label className='profile__label'>
                    NAME
                </label>
                {!editFirstNameEnable && !editLastNameEnable && <div>
                    <div onClick={changeNameAndDisplay}>
                        <div className='profile__user__name'>
                            {`${sessionUser.first_name} ${sessionUser.last_name}`}
                        </div>
                        <button
                            className='white__button__v2 edit__profile__btn__size'>
                            EDIT
                        </button>
                    </div>
                </div>}
            </>
        )
    }

    const displayEditNamesForm = () => {
        return (
            <>
                {editFirstNameEnable && editLastNameEnable && <div>
                    <div className='edit__profile__inputs'>
                        <input
                            type="text"
                            value={newFirstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            value={newLastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                        />
                    </div>
                    {firstNameError && <div className='error_style first__name__error'>{firstNameError}</div>}
                    {lastNameError && <div className='error_style last__name__error'>{lastNameError}</div>}
                    <div>
                        <button
                            onClick={changeUser}
                            className='red__button__v2 edit__profile__btn__size'>
                            UPDATE
                        </button>
                        <button
                            onClick={changeNameAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            CANCEL
                        </button>
                    </div>
                </div>}
            </>
        )
    }

    return (
        <div className='profile__container'>
            <div className='forms__name'>
                USER PROFILE
            </div>
            <div className='profile__edges'>
                {renderNameAndEditButtons()}
                {displayEditNamesForm()}
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
                    <div>
                        <button
                            onClick={changeAvatarAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            EDIT
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={changeUser}
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
                <div>
                    <div onClick={changeAvatarAndDisplay}>
                        <div className='avatar__profile'>
                            <UserIcon size={100} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='edit__content__position'>
                        <Icons avatarId={newAvatarId} setAvatarId={setNewAvatarId}
                            avatarError={avatarError} setAvatarError={setAvatarError}
                        />
                    </div>
                </div>
            </div>
            <div className='profile__edges'>
                <div className='label__and__button'>
                    <label className='profile__label'>
                        FUNDS
                    </label>
                    <div>
                        <button
                            onClick={addFundsAndDisplay}
                            className='white__button__v2 edit__profile__btn__size'>
                            EDIT
                        </button>
                    </div>
                    <div>
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
                    <div>
                        <div className='pending__tran__amount'>
                            {userFunds?.amount}
                        </div>
                    </div>
                </div>
                <div>
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
