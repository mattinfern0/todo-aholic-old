import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {LoginForm} from '../misc';
import {Events} from '../../controllers/EventController';
import {miscEvents} from '../../event_types';


class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      errorMessage: '',
    };
    this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this);
  }

  componentDidMount(){
    Events.subscribe(miscEvents.login, this.changeLoggedInStatus);
    Events.subscribe(miscEvents.loginFailed, this.changeErrorMessage);
  }

  componentWillUnmount(){
    Events.unsubscribe(miscEvents.login, this.changeLoggedInStatus);
    Events.unsubscribe(miscEvents.loginFailed, this.changeErrorMessage);
  }

  changeLoggedInStatus() {
    this.setState({ loggedIn: true });
  }

  changeErrorMessage(message) {
    this.resetForm();
    this.setState({errorMessage: message});
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <span>
        <h5>Todo-aholic</h5>
        <div id="login-container" className="user-form-container">
          <h2>Log In</h2>
          <LoginForm />
          {this.state.errorMessage !== '' && (
            <div className="error-message">
              <h3>{this.state.errorMessage}</h3>
            </div>
          )}
          <div>
            {"Don't have an account? "}
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </span>
      
    );
  }
}

export default LoginContainer;
