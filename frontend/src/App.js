import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Splashpage from './components/Splashpage/Splashpage';
import NavBar from './components/NavBar/NavBar';
import Transactions from './components/Transactions/Transactions';
import ApprovedTran from './components/Transactions/ApprovedTran';
import Pending from './components/Pending/Pending';
import PendingTran from './components/Pending/PendingTran';

import OnePaymentNew from './components/OnePayment/OnePaymentNew';
import OnePaymentWithEdit from './components/OnePayment/OneApprovedWithEdit';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
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
        <ProtectedRoute path='/' exact={true} >
          <Transactions />
        </ProtectedRoute>
        <ProtectedRoute path='/pending' exact={true} >
          <Pending />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}
        { /*<ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/new-payment' exact={true} >
          <OnePaymentNew />
        </ProtectedRoute>
        <ProtectedRoute path='/transactions/:approved_id' exact={true} >
          <ApprovedTran />
        </ProtectedRoute>
        <ProtectedRoute path='/pending/:pending_id' exact={true} >
          <PendingTran />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
