import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createComment } from '../../store/comment';
import { UserIcon } from '../UserIcons/UserIcons';

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
        await dispatch(createComment(newComment));
        setMessage('');
    };

    return (
        <div>
            <div className='next__comment'>
                <div className='comments__image__users'>
                    <UserIcon size={30} isNavIcon={true} />
                </div>
                <textarea
                    className='textarea__add__comment__margin'
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
