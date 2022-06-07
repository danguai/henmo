import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { readAllTransactions } from '../../store/transaction';
import { UserIcon } from '../UserIcons/UserIcons';

import UserName from '../Users/UserName';

import './AllApprovedTransactions.css';
import './Loading.css';

const AllApprovedTransactions = () => {
    const dispatch = useDispatch();
    // const history = useHistory();

    // const [users, setUsers] = useState({});
    // const [combined, setCombined] = useState({});

    const transactions = useSelector(state => state.transaction);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/users/');
    //         const responseData = await response.json();
    //         setUsers(responseData.users);
    //     }
    //     fetchData();
    // }, []);

    const allApproved = [];
    Object.values(transactions).forEach(transaction => {
        if (transaction?.paid === true) {
            allApproved.push(transaction);
        }
    });
    allApproved.sort((a, b) => a.updated_at - b.updated_at);


    console.log(allApproved);

    // useEffect(() => {
    //     (async (allApproved, users) => {
    //         return await allApproved?.map(trans => {
    //             return users?.filter(user => {
    //                 if (trans.payer_id === user.id) {

    //                     // console.log('TRANS:', trans);
    //                     // console.log('USER:', user);
    //                     setCombined({ ...trans, ...user });
    //                 }
    //                 // }
    //             });
    //         });
    //     })(allApproved, users);
    // }, [allApproved, users]);

    // console.log('COMBINED: ', combined);

    useEffect(() => {
        dispatch(readAllTransactions());
    }, [dispatch]);

    if (!transactions) return null;
    // if (!users) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>ALL TRANSACTIONS</div>
            <div>
                <img
                    id='chicken__7__orange__approved'
                    src='static/chicken-7-orange.png'
                    alt='chicken__7__orange__approved' />
            </div>
            <div>
                <img
                    id='chicken__2__black__approved'
                    src='static/chicken-2-black.png'
                    alt='chicken__2__black__approved' />
            </div>
            <div className='transactions__list__container'>
                {allApproved?.map((paid, i) =>
                    <div className='transactions__list__container' key={i}>
                        <Link
                            className='each__transaction'
                            to={`/approved/${paid.id}`}>
                            <div className='icon__with__message'>
                                <div className='avatar__box__transactions'>
                                    <UserIcon size={40} givenUser={paid.payer} />
                                </div>
                                <div>
                                    <div className='you__sent'>
                                        <div className='payer__name'>
                                            <UserName user={paid.payer} />
                                        </div>
                                        sent
                                        <div className='receiver__name'>
                                            <UserName user={paid.receiver} />
                                        </div>
                                        <div className='receiver__user'>
                                            <UserIcon size={20} givenUser={paid.receiver} />
                                        </div>
                                    </div>
                                    <div className='message__preview'>
                                        {paid.message}
                                    </div>
                                </div>
                            </div>
                            <div className='number__of__chickens'>
                                <div className='chickens__label'>
                                    CHICKENS
                                </div>
                                <div className='chickens__number'>
                                    {paid.amount}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div >
    );
}

export default AllApprovedTransactions;
