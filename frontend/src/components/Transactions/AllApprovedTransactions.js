import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { readAllOutgoings } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';

import UserName from '../Users/UserName';

import './AllApprovedTransactions.css';
import './Loading.css';

const AllApprovedTransactions = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [users, setUsers] = useState({});
    const [combined, setCombined] = useState([]);

    const outgoings = useSelector(state => state.outgoing);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);


    const allApproved = [];
    Object.values(outgoings).forEach(outgoing => {
        if (outgoing?.paid === true) {
            allApproved.push(outgoing);
        }
    });

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
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    if (!users) return null;


    return (
        <div className='transactions__container' >
            <div className='transaction__title'>ALL TRANSACTIONS</div>
            <div className='transactions__list__container'>
                {allApproved?.map((paid, i) =>
                    <div className='transactions__list__container' key={i}>
                        <Link
                            className='each__transaction'
                            to={`/approved/${paid.id}`}>
                            <div className='icon__with__message'>
                                <div className='avatar__box__transactions'>
                                    <UserIcon size={40} />
                                </div>
                                <div>
                                    <div className='you__paid'>
                                        {/* <section class="section section-4">
                                            <span class="loader loader-bars"><span></span></span>
                                            Loading...
                                        </section> */}
                                        <span className='payer__name'>
                                            <UserName id={paid.payer_id} />
                                        </span>
                                        sent
                                        <span className='receiver__name'>
                                            <UserName id={paid.receiver_id} />
                                        </span>
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
                                    {paid.pay_funds}
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
