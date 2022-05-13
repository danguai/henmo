import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
import { createComment, readAllComments, updateComment, deleteComment } from '../../store/comment';
import { UserIcon } from '../UserIcons/UserIcons';
import User from '../Users/User';


// import { NavLink } from 'react-router-dom';
import './Comments.css';


const Comments = ({ approvedTran }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session?.user);
    const allComments = useSelector(state => state.comment);

    const [message, setMessage] = useState('');

    const [commentsDisplay, setCommentsDisplay] = useState('displayed__comments');
    const [commentsInputDisplay, setCommentsInputDisplay] = useState('not__displayed__comments');

    const theseComments = [];
    Object.values(allComments).forEach(comment => {
        if (comment?.outgoing_id === approvedTran?.id) {
            theseComments.push(comment)
        }
    });

    let createdComment;

    const addComment = async () => {
        const newComment = {
            user_id: sessionUser.id,
            outgoing_id: approvedTran.id,
            message
        };
        createdComment = await dispatch(createComment(newComment));
        setMessage('');
    };

    const [editMessage, setEditMessage] = useState(createComment.message);


    const editedComment = async () => {
        let editComment = {
            id: createdComment?.id,
            user_id: createdComment?.user_id,
            outgoing_id: createdComment?.outgoing_id,
            message: editMessage
        };
        const updatedComment = await dispatch(updateComment(editComment, editComment.id));

    };

    const removeComment = async (comment) => {
        await dispatch(deleteComment(comment));
    }

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
        setEditMessage(createdComment.message);
    }
    useEffect(() => {
        dispatch(readAllComments());
    }, [dispatch]);

    if (!theseComments) return;

    const stopTheProp = e => e.stopPropagation();

    return (
        <div>
            <div
                className='approved__comment__title'
                onClick={stopTheProp}
                onMouseDown={stopTheProp}
            >
                COMMENTS
            </div>
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
                    {/* {cardOwner && */}
                    <button
                        onClick={addComment}
                        className=''>
                        Add Comment
                    </button>

                </div>
            </div>
            <div>
                {theseComments.map((comment, i) =>
                    <div className='comment__box' key={i}>
                        <div className='comments__image__users'>
                            <UserIcon id={comment.user_id} />
                        </div>
                        <div className={`${commentsDisplay}`}>
                            <div>
                                {comment.message}
                            </div>

                            <div className='por__ahora' >
                                {comment.user_id === sessionUser?.id &&
                                    <div>
                                        <div>
                                            <input
                                                type="text"
                                                value={editMessage}
                                                onChange={(e) => setEditMessage(e.target.value)}
                                            // className="content__input"
                                            ></input>
                                        </div>
                                        <div className='comment__edit'>
                                            <button
                                                className='red__button__basic comment__btn__size'
                                                onClick={() => editedComment(comment)}
                                            >
                                                SAVE
                                            </button>
                                        </div>
                                        <div className='comment__delete'>
                                            <button
                                                className='blue__button__basic comment__btn__size'
                                                onClick={() => removeComment(comment)}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Comments;
