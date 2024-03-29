import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Splashpage from './components/Splashpage/Splashpage';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';

import AllApprovedTransactions from './components/Transactions/AllApprovedTransactions';
import OneApproved from './components/Transactions/OneApproved';
import OneUserAllApproved from './components/Transactions/OneUserAllApproved';
import PendingOut from './components/Transactions/PendingOut';
import PendingIn from './components/Transactions/PendingIn';
import PendingAll from './components/Transactions/PendingAll';
import OnePending from './components/Transactions/OnePending';

import SendPayment from './components/Payment/SendPayment';

import PageNotFound from './components/PageNotFound/PageNotFound';

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

  if (!loaded) return null;

  return (
    <BrowserRouter>
      {sessionUser && <NavBar />}
      <Switch>
        <Route path='/' exact={true}>
          <Splashpage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/profile' exact={true} >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/all-approved' exact={true} >
          <AllApprovedTransactions />
        </ProtectedRoute>
        <ProtectedRoute path='/approved' exact={true} >
          <OneUserAllApproved />
        </ProtectedRoute>
        <ProtectedRoute path='/pending' exact={true} >
          <PendingAll />
        </ProtectedRoute>
        <ProtectedRoute path='/pending-out' exact={true} >
          <PendingOut />
        </ProtectedRoute>
        <ProtectedRoute path='/pending-in' exact={true} >
          <PendingIn />
        </ProtectedRoute>
        <ProtectedRoute path='/send-payment' exact={true} >
          <SendPayment />
        </ProtectedRoute>
        <ProtectedRoute path='/approved/:approved_id' exact={true} >
          <OneApproved />
        </ProtectedRoute>
        <ProtectedRoute path='/pending/:pending_id' exact={true} >
          <OnePending />
        </ProtectedRoute>
        <Route path='*'><PageNotFound /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
