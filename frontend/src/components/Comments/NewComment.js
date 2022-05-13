import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createComment, readAllComments, updateComment, deleteComment } from '../../store/comment';
import { UserIcon } from '../UserIcons/UserIcons';
import User from '../Users/User';


import './Comments.css';

const AddComment = ({ approvedTran }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);

    const [message, setMessage] = useState('');

    const addComment = async () => {
        const newComment = {
            user_id: sessionUser.id,
            outgoing_id: approvedTran.id,
            message
        };
        const createdComment = await dispatch(createComment(newComment));
        setMessage('');
    };

    const stopTheProp = e => e.stopPropagation();

    return (
        <div>
            <div className='next__comment'>
                <div className='comments__image__users'>
                    <UserIcon size={30} isNavIcon={true} />
                </div>
                <textarea
                    className='textarea__input__comments'
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                // placeholder='Add a comment...'
                />
                <div className='add__cancel__comments'>
                    <button
                        onClick={addComment}
                        className='red__button__v2 comment__add__btn__size'>
                        ADD
                    </button>
                </div>
            </div>

        </div>
    )
};

export default AddComment;
