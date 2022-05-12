// COMMENTS CONSTANTS
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const READ_ALL_COMMENTS = 'comments/READ_ALL_COMMENTS';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';


// COMMENT ACTIONS
const createCommentAction = comment => ({
    type: CREATE_COMMENT,
    comment
});

const readAllCommentsAction = comments => ({
    type: READ_ALL_COMMENTS,
    comments
});

const updateCommentAction = comment => ({
    type: UPDATE_COMMENT,
    comment
});

const deleteCommentAction = comment => ({
    type: DELETE_COMMENT,
    comment
});

// COMMENTS THUNKS
// C R E A T E
export const createComment = comment => async dispatch => {
    const response = await fetch('/api/comments/new-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createCommentAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// R E A D   A L L
export const readAllComments = () => async dispatch => {
    const response = await fetch('/api/comments/');

    const data = await response.json();

    if (response.ok) {
        await dispatch(readAllCommentsAction(data.comments));
        return data;
    } else {
        console.log(data.errors);
    }
};


// U P D A T E
export const updateComment = (comment, id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(updateCommentAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// D E L E T E
export const deleteComment = comment => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(deleteCommentAction(data));
    } else {
        console.log(data.errors);
    }
};

// R E D U C E R
let initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        case READ_ALL_COMMENTS:
            action.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        case UPDATE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.comment.id];
            return newState;
        default:
            return state;
    }
};

export default commentReducer;
