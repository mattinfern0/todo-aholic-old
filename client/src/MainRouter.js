import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/misc/PrivateRoute';
import LoginForm from './components/misc/LoginForm';
import App from './App';

function MainRouter() {
  return (
    <Router>
      <PrivateRoute path="/" component={App} />
      <Route path="/login" component={LoginForm} />
    </Router>
  );
}

export default MainRouter;
