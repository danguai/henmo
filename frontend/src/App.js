import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Splashpage from './components/Splashpage/Splashpage';
import NavBar from './components/NavBar/NavBar';
import AllApprovedTransactions from './components/Transactions/AllApprovedTransactions';
import OneApproved from './components/Transactions/OneApproved';
import OneUserAllApproved from './components/Transactions/OneUserAllApproved';
import AllPending from './components/Transactions/AllPending';
import OnePending from './components/Transactions/OnePending';

import OnePaymentNew from './components/OnePayment/OnePaymentNew';

// import AddComments from './components/Comments/AddComment';

import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session?.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {sessionUser && <NavBar />}
      <Switch>
        <Route path='/home' exact={true}>
          <Splashpage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/all-approved' exact={true} >
          <AllApprovedTransactions />
        </ProtectedRoute>
        <ProtectedRoute path='/approved' exact={true} >
          <OneUserAllApproved />
        </ProtectedRoute>
        <ProtectedRoute path='/pending' exact={true} >
          <AllPending />
        </ProtectedRoute>
        <ProtectedRoute path='/new-payment' exact={true} >
          <OnePaymentNew />
        </ProtectedRoute>
        <ProtectedRoute path='/approved/:approved_id' exact={true} >
          <OneApproved />
        </ProtectedRoute>
        <ProtectedRoute path='/pending/:pending_id' exact={true} >
          <OnePending />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
