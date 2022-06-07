import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { readFunds } from '../../store/funds';

import './AddFunds.css';

const AddFunds = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);

    console.log(sessionUser);


    useEffect(() => {
        dispatch(readFunds(sessionUser.id));
    }, [dispatch]);

    return (
        <div className='transactions__container'>


        </div>
    )
};

export default AddFunds;
