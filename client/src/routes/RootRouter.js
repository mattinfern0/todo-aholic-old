import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import {App, LoginContainer, SettingsContainer, SignUpContainer, Logout} from '../components';
import PrivateRoute from '../components/misc/PrivateRoute';
import {ApiMessenger} from '../controllers';

class RootRouter extends React.Component {
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
        <PrivateRoute path="/settings" component={SettingsContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignUpContainer} />
        <Route path="/logout" component={Logout} />
      </Router>
    );
  }
}

export default RootRouter;
