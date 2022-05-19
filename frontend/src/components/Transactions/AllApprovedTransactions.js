import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { readAllOutgoings } from '../../store/outgoing';
import { UserIcon } from '../UserIcons/UserIcons';
import LottieChickens from '../AnimatedChickens/LottieChickens';

import UserName from '../Users/UserName';

import './AllApprovedTransactions.css';
import './Loading.css';

const AllApprovedTransactions = () => {
    const dispatch = useDispatch();
    const outgoings = useSelector(state => state.outgoing);

    const allApproved = [];
    Object.values(outgoings).forEach(outgoing => {
        if (outgoing?.paid === true) {
            allApproved.push(outgoing);
        }
    });
    allApproved.sort((a, b) => a.updated_at - b.updated_at);

    useEffect(() => {
        dispatch(readAllOutgoings());
    }, [dispatch]);

    if (!outgoings) return null;

    return (
        <div className='transactions__container' >
            <div className='transaction__title'>ALL TRANSACTIONS</div>
            <div className='chicken__img__container__lottie__approved__bottom'>
                <div className='LottieChicken__container__approved__bottom'>
                    <LottieChickens size={335} />
                </div>
            </div>
            {/* <div>
                <img
                id='chicken__7__orange__approved'
                src='static/chicken-7-orange.png'
                alt='chicken__7__orange__approved' />
            </div> */}
            <div className='chicken__img__container__lottie__approved__top'>
                <div className='LottieChicken__container__approved__top'>
                    <LottieChickens size={210} rotate={210} />
                </div>
            </div>
            {/* <div>
                <img
                    id='chicken__2__black__approved'
                    src='static/chicken-2-black.png'
                    alt='chicken__2__black__approved' />
            </div> */}
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
