import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/misc/PrivateRoute';
import LoginForm from './components/misc/LoginForm';
import SignUpForm from './components/misc/SignUpForm';
import App from './App';
import Logout from './components/misc/Logout';
import ApiMessenger from './controllers/ApiMessenger';
import SettingsView from './components/app_view/settings_view/SettingsView';

class MainRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverOk: true,
    };
  }

  componentDidMount() {
    ApiMessenger.checkServerStatus()
      .catch(() => {
        console.log('Server is down');
        this.setState({ serverOk: false });
      });
  }

  render(){
    if (!this.state.serverOk) {
      return (
        <h1> Sorry! Looks like the server is down!</h1>
      );
    }
    return (
      <Router basename="/">
        <PrivateRoute exact path="/" component={App} />
        <PrivateRoute path="/settings" component={SettingsView} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/logout" component={Logout} />
        
      </Router>
    );
  }
}

export default MainRouter;
