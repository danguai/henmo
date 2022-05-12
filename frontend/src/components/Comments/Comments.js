import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
import { readAllComments } from '../../store/comment';
import { UserIcon } from '../UserIcons/UserIcons';
import User from '../Users/User';


// import { NavLink } from 'react-router-dom';
import './Comments.css';


const Comments = ({ approvedTran }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const allComments = useSelector(state => state.comment);

    const theseComments = [];

    Object.values(allComments).forEach(comment => {
        if (comment?.outgoing_id === approvedTran?.id) {
            theseComments.push(comment)
        }
    });
    console.log(theseComments);


    useEffect(() => {
        dispatch(readAllComments());
    }, [dispatch]);

    if (!theseComments) return;

    return (
        <div>
            <div className='approved__comment__title'>
                COMMENTS
            </div>
            <div>
                {theseComments.map((comment, i) =>
                    <div className='comment__box' key={i}>
                        <div className='user__comment'>
                            <UserIcon id={comment.user_id} />
                        </div>
                        <div>
                            {comment.message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Comments;
