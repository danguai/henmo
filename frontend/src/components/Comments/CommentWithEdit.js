import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createComment, readAllComments, updateComment, deleteComment } from '../../store/comment';
import { UserIcon } from '../UserIcons/UserIcons';

import './Comments.css';


const CommentWithEdit = ({ comment }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);

    const [commentsDisplay, setCommentsDisplay] = useState('displayed__comments');
    const [commentsInputDisplay, setCommentsInputDisplay] = useState('not__displayed__comments');

    const [editMessage, setEditMessage] = useState(createComment?.message);

    const editedComment = async () => {
        let editComment = {
            id: comment.id,
            user_id: comment.user_id,
            outgoing_id: comment.outgoing_id,
            message: editMessage
        };
        await dispatch(updateComment(editComment, editComment.id));
        setCommentsDisplay('displayed__comments');
        setCommentsInputDisplay('not__displayed__comments');
    };

    const removeComment = async (comment) => {
        await dispatch(deleteComment(comment));
    };

    const commentsAndInputDisplay = () => {
        if (commentsDisplay === 'displayed__comments') {
            setCommentsDisplay('not__displayed__comments');
            setCommentsInputDisplay('displayed__comments');
        } else {
            setCommentsDisplay('displayed__comments');
            setCommentsInputDisplay('not__displayed__comments');
        }

        if (commentsInputDisplay === 'not__displayed__comments') {
            setCommentsDisplay('not__displayed__comments');
            setCommentsInputDisplay('displayed__comments');
        } else {
            setCommentsDisplay('displayed__comments');
            setCommentsInputDisplay('not__displayed__comments');
        }
        setEditMessage(comment.message);
    }
    useEffect(() => {
        dispatch(readAllComments());
    }, [dispatch]);

    const isOwnerOfComment = comment.user_id === sessionUser?.id;

    return (
        <div className='comment__box'>
            <div className='comment__user__message'>
                <div className='comments__image__users'>
                    <UserIcon id={comment.user_id} />
                </div>
                <div className={`${commentsDisplay}`}>
                    <div
                        className='comment__display'
                        onClick={commentsAndInputDisplay}
                    >
                        {comment.message}
                    </div>
                </div>
                {isOwnerOfComment &&
                    <div className={`${commentsInputDisplay}`}>
                        <div className='edit__comment'>
                            <textarea
                                type="text"
                                value={editMessage}
                                onChange={(e) => setEditMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='comment__edit__del'>
                            <button
                                className='red__button__v2 comment__U__C__btn__size'
                                onClick={() => editedComment(comment)}
                            >
                                UPDATE
                            </button>
                            <button
                                className='white__button__v2 comment__U__C__btn__size'
                                onClick={commentsAndInputDisplay}
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                }
            </div>
            {isOwnerOfComment &&
                <div className={`${commentsDisplay}`} >
                    <div className='comment__edit__del'>
                        <button
                            onClick={commentsAndInputDisplay}
                            className='white__button__v2 comment__E__D__btn__size'>
                            EDIT
                        </button>
                        <button
                            className='blue__button__v2 comment__E__D__btn__size'
                            onClick={() => removeComment(comment)}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            }
        </div>
    )
};

export default CommentWithEdit;
