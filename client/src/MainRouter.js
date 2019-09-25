import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/misc/PrivateRoute';
import LoginForm from './components/misc/LoginForm';
import SignUpForm from './components/misc/SignUpForm';
import App from './App';
import ApiMessenger from './controllers/ApiMessenger';

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
      <Router>
        <PrivateRoute path="/" component={App} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
      </Router>
    );
  }
}

export default MainRouter;
