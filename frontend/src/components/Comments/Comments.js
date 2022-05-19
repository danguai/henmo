import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { readAllComments } from '../../store/comment';

import AddComment from './NewComment';
import CommentWithEdit from './CommentWithEdit';

import './Comments.css';

const Comments = ({ approvedTran }) => {
    const dispatch = useDispatch();

    const allComments = useSelector(state => state.comment);

    const theseComments = [];

    Object.values(allComments).forEach(comment => {
        if (comment?.outgoing_id === approvedTran?.id) {
            theseComments.push(comment)
        }
    });

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
