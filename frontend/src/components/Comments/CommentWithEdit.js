import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateComment, deleteComment } from '../../store/comment';
import { UserIcon } from '../UserIcons/UserIcons';
import UserInitials from '../Users/UserInitials';

import { validateComment } from '../../utils/validation';

import './Comments.css';


const CommentWithEdit = ({ comment }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);

    const [editMessage, setEditMessage] = useState(comment?.message);
    const [commentError, setCommentError] = useState('');
    const [editEnabled, setEditEnabled] = useState(false);

    const editedComment = async () => {
        let editComment = {
            id: comment.id,
            user_id: comment.user_id,
            transaction_id: comment.transaction_id,
            message: editMessage
        };
        await dispatch(updateComment(editComment, editComment.id));

        setEditEnabled(false);
    };

    const removeComment = async (comment) => await dispatch(deleteComment(comment));

    const toggleEditCommentForm = () => {
        setEditEnabled(!editEnabled);
        setEditMessage(comment.message);
    };

    const isOwnerOfComment = comment.user_id === sessionUser?.id;

    const renderComment = (editEnabled) => {
        return (
            <div style={{ display: 'flex', padding: 5 }}>
                <UserIcon givenUser={comment.user} />
                {!editEnabled && <div style={{ marginLeft: 5 }}>
                    <span style={{ fontWeight: 'bold' }}>
                        <UserInitials user={comment.user} />
                    </span>
                    {comment.message}
                </div>}
            </div>
        );
    }

    const renderEditCommentForm = () => {
        return (
            <div>
                <textarea
                    className='textarea__add__comment__margin'
                    type="text"
                    onChange={(e) => setEditMessage(e.target.value)}
                    onBlur={() => {
                        const error = validateComment(editMessage)
                        if (error) setCommentError(error)
                    }}
                    onFocus={() => { setCommentError('') }}
                    value={editMessage}
                ></textarea>
                <div className='comment__update__cancel'>
                    <button
                        className='red__button__basic'
                        onClick={() => editedComment(comment)}
                    >
                        UPDATE
                    </button>
                    <button
                        className='red__button__basic'
                        onFocus={() => { setCommentError('') }}
                        onClick={toggleEditCommentForm}
                    >
                        CANCEL
                    </button>
                </div>
            </div>);
    }

    const renderEditActionButtons = () => {
        return (
            <div className='comment__edit__del'>
                <button
                    className='red__button__basic'
                    onClick={toggleEditCommentForm}
                >
                    EDIT
                </button>
                <button
                    className='red__button__basic'
                    onClick={() => removeComment(comment)}
                >
                    DELETE
                </button>
            </div>
        );
    }

    return (
        <div className='comment__box'>
            {commentError && <div className='error_style comment__error'>{commentError}</div>}
            <div className='comment__user__message'>
                {renderComment(editEnabled)}
                {isOwnerOfComment && editEnabled && renderEditCommentForm()}
            </div>
            {isOwnerOfComment && !editEnabled && renderEditActionButtons()}
        </div>
    )
};

export default CommentWithEdit;
