// FUNDS CONSTANT
const READ_FUNDS = 'funds/READ_FUNDS';
const UPDATE_FUNDS = 'funds/UPDATE_FUNDS';

// FUNDS ACTIONS
const readFundsActions = funds => ({
    type: READ_FUNDS,
    funds
});

const updateFundsActions = funds => ({
    type: UPDATE_FUNDS,
    funds
});

// FUNDS THUNKS
export const readFunds = id => async dispatch => {
    const response = await fetch(`/api/funds/${id}`);

    const data = await response.json();

    if (response.ok) {
        await dispatch(readFundsActions(data));
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
        await dispatch(updateFundsActions(data));
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
        case READ_FUNDS:
            newState[action.funds.id] = action.funds;
            return newState;
        // return { funds: action.funds };
        case UPDATE_FUNDS:
            newState[action.funds.id] = action.funds;
            return newState;
        default:
            return state;

    }
};

export default fundsReducer;
