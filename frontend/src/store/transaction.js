// TRANSACTION CONSTANTS
const CREATE_TRANSACTION = 'transactions/CREATE_TRANSACTION';
const READ_ALL_TRANSACTIONS = 'transactions/READ_ALL_TRANSACTIONS';
const READ_ONE_TRANSACTION = 'transactions/READ_ONE_TRANSACTION';
const UPDATE_TRANSACTION = 'transactions/UPDATE_TRANSACTION';
const DELETE_TRANSACTION = 'transactions/DELETE_TRANSACTION';

// TRANSACTION ACTIONS
const createTransactionAction = transaction => ({
    type: CREATE_TRANSACTION,
    transaction
});

const readAllTransactionsAction = transactions => ({
    type: READ_ALL_TRANSACTIONS,
    transactions
});

const readOneTransactionAction = transaction => ({
    type: READ_ONE_TRANSACTION,
    transaction
});

const updateTransactionAction = transaction => ({
    type: UPDATE_TRANSACTION,
    transaction
});

const deleteTransactionAction = transaction => ({
    type: DELETE_TRANSACTION,
    transaction
});

// TRANSACTION THUNKS
// C R E A T E
export const createTransaction = transaction => async dispatch => {
    const response = await fetch('/api/transactions/new-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createTransactionAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// R E A D   A L L
export const readAllTransactions = () => async dispatch => {
    const response = await fetch('/api/transactions/');

    const data = await response.json();

    if (response.ok) {
        await dispatch(readAllTransactionsAction(data.transactions));
        return data;
    } else {
        console.log(data.errors);
    }
};

// R E A D   O N E
export const readOneTransaction = id => async dispatch => {
    const response = await fetch(`/api/transactions/${id}`);

    const data = await response.json();

    if (response.ok) {
        await dispatch(readOneTransactionAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// U P D A T E
export const updateTransaction = (transaction, id) => async dispatch => {
    const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(updateTransactionAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// D E L E T E
export const deleteTransaction = transaction => async dispatch => {
    const response = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(deleteTransactionAction(data));
    } else {
        console.log(data.errors);
    }
};



// R E D U C E R
let initialState = {};

const transactionReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_TRANSACTION:
            newState[action.transaction.id] = action.transaction;
            return newState;
        case READ_ALL_TRANSACTIONS:
            action.transactions.forEach(transaction => newState[transaction.id] = transaction);
            return newState;
        case READ_ONE_TRANSACTION:
            newState[action.transaction.id] = action.transaction;
            return newState;
        case UPDATE_TRANSACTION:
            newState[action.transaction.id] = action.transaction;
            return newState;
        case DELETE_TRANSACTION:
            delete newState[action.transaction.id];
            return newState;
        default:
            return state;
    }
};

export default transactionReducer;
