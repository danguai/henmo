// OUTGOING CONSTANTS
const CREATE_OUTGOING = 'outgoings/CREATE_OUTGOING';
const READ_ALL_OUTGOINGS = 'outgoings/READ_ALL_OUTGOINGS';
const READ_ONE_OUTGOING = 'outgoings/READ_ONE_OUTGOING';
const UPDATE_OUTGOING = 'outgoings/UPDATE_OUTGOING';
const DELETE_OUTGOING = 'outgoings/DELETE_OUTGOING';

// OUTGOING ACTIONS
const createOutgoingAction = outgoing => ({
    type: CREATE_OUTGOING,
    outgoing
});

const readAllOutgoingsAction = outgoings => ({
    type: READ_ALL_OUTGOINGS,
    outgoings
});

const readOneOutgoingAction = outgoing => ({
    type: READ_ONE_OUTGOING,
    outgoing
});

const updateOutgoingAction = outgoing => ({
    type: UPDATE_OUTGOING,
    outgoing
});

const deleteOutgoingAction = outgoing => ({
    type: DELETE_OUTGOING,
    outgoing
});

// OUTGOING THUNKS
// C R E A T E
export const createOutgoing = outgoing => async dispatch => {
    const response = await fetch('api/outgoings/new-outgoing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outgoing)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createOutgoingAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// R E A D   A L L
export const readAllOutgoings = () => async dispatch => {
    const response = await fetch('/api/outgoings/');

    const data = await response.json();

    if (response.ok) {
        await dispatch(readAllOutgoingsAction(data.outgoings));
        return data;
    } else {
        console.log(data.errors);
    }
};

// R E A D   O N E
export const readOneOutgoing = id => async dispatch => {
    const response = await fetch(`/api/outgoings/${id}`);

    const data = await response.json();

    if (response.ok) {
        await dispatch(readOneOutgoingAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// U P D A T E
export const updateOutgoing = (outgoing, id) => async dispatch => {
    const response = await fetch(`/api/outgoings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outgoing)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(updateOutgoingAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// D E L E T E
export const deleteOutgoing = outgoing => async dispatch => {
    const response = await fetch(`/api/outgoings/${outgoing.id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(deleteOutgoingAction(data));
    } else {
        console.log(data.errors);
    }
};



// R E D U C E R
let initialState = {};

const outgoingReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_OUTGOING:
            newState[action.outgoing.id] = action.outgoing;
            return newState;
        case READ_ALL_OUTGOINGS:
            action.outgoings.forEach(outgoing => newState[outgoing.id] = outgoing);
            return newState;
        case READ_ONE_OUTGOING:
            newState[action.outgoing.id] = action.outgoing;
            return newState;
        case UPDATE_OUTGOING:
            newState[action.outgoing.id] = action.outgoing;
            return newState;
        case DELETE_OUTGOING:
            delete newState[action.outgoing.id];
            return newState;
        default:
            return state;
    }
};

export default outgoingReducer;
