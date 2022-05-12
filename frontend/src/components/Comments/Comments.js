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
    // const [editMessage, setEditMessage] = useState(message);

    const theseComments = [];
    Object.values(allComments).forEach(comment => {
        if (comment?.outgoing_id === approvedTran?.id) {
            theseComments.push(comment)
        }
    });

    const addComment = async () => {
        const newComment = {
            user_id: sessionUser.id,
            outgoing_id: approvedTran.id,
            message
        };
        await dispatch(createComment(newComment));
        setMessage('');
    };

    useEffect(() => {
        dispatch(readAllComments());
    }, [dispatch]);

    if (!theseComments) return;

    return (
        <div>
            <div className='approved__comment__title'>
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
                    placeholder='Add a comment...'
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
