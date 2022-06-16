// FUNDS CONSTANT
const CREATE_FUNDS = 'funds/CREATE_FUNDS';
const READ_FUNDS = 'funds/READ_FUNDS';
const UPDATE_FUNDS = 'funds/UPDATE_FUNDS';

// FUNDS ACTION
const createFundsAction = funds => ({
    type: CREATE_FUNDS,
    funds
});

const readFundsAction = funds => ({
    type: READ_FUNDS,
    funds
});

const updateFundsAction = funds => ({
    type: UPDATE_FUNDS,
    funds
});

// FUNDS THUNKS
export const createFunds = funds => async dispatch => {
    const response = await fetch('/api/funds/add-funds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funds)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createFundsAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const readFunds = id => async dispatch => {
    const response = await fetch(`/api/funds/${id}`);

    const data = await response.json();

    if (response.ok) {
        await dispatch(readFundsAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const updateFunds = (funds, id) => async dispatch => {
    const response = await fetch(`/api/funds/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funds)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(updateFundsAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// REDUCER
let initialState = {};

const fundsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_FUNDS:
            newState[action.funds.id] = action.funds;
            return newState;
        case READ_FUNDS:
            newState[action.funds.id] = action.funds;
            return newState;
        case UPDATE_FUNDS:
            newState[action.funds.id] = action.funds;
            return newState;
        default:
            return state;

    }
};

export default fundsReducer;
