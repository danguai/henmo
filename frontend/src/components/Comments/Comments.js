import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
import { createComment, readAllComments, updateComment, deleteComment } from '../../store/comment';
import { UserIcon } from '../UserIcons/UserIcons';
import User from '../Users/User';

import AddComment from './NewComment';
import CommentWithEdit from './CommentWithEdit';


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
        // setMessage('');
    };

    const removeComment = async (comment) => {
        await dispatch(deleteComment(comment));
    };

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
            <div>
                <AddComment approvedTran={approvedTran} />
            </div>
            <div>
                {theseComments.map((comment, i) =>
                    <div key={i}>
                        <CommentWithEdit comment={comment} />
                    </div>
                )}
            </div>
        </div>
    )
};

export default Comments;
