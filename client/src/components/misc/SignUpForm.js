import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import ApiMessenger from '../../controllers/ApiMessenger';
import { Events } from '../../controllers/EventController';
import { apiEvents, miscEvents } from '../../event_types';


class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessages: [],
      success: false,
    };
    this.doSignUp = this.doSignUp.bind(this);
    this.onError = this.onError.bind(this);
    this.onSucess = this.onSucess.bind(this);
  }

  componentDidMount(){
    Events.subscribe(miscEvents.signupFailed, this.onError);
    Events.subscribe(miscEvents.signupSuccess, this.onSucess);
  }

  componentWillUnmount(){
    Events.unsubscribe(miscEvents.signupFailed, this.onError);
    Events.unsubscribe(miscEvents.signupSuccess, this.onSucess);
  }

  doSignUp(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const password2 = this.state.confirmPassword;

    if (password2 !== password) {
      this.setState({ errorMessages: [{msg: 'Passwords don\'t match'}] });
      return;
    }

    const credentials = {
      username,
      password,
    };

    Events.publish(apiEvents.signup, credentials);
  }

  onError(errors){
    this.setState({ errorMessages: errors });
  }

  onSucess(){
    this.setState({ success: true });
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/login" />;
    }

    return (
      <span>
        <h5>Todo-aholic</h5>
        <div id="signin-container" className="user-form-container">
          <h2>Sign Up</h2>
          <form onSubmit={this.doSignUp}>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={(e) => this.setState({username: e.target.value})}
              placeholder="Username"
            />
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={(e) => this.setState({password: e.target.value})}
              placeholder="Password"
            />
            <input
              type="password"
              value={this.state.confirmPassword}
              name="confirm-password"
              onChange={(e) => this.setState({confirmPassword: e.target.value})}
              placeholder="Confirm Password"
            />
            <input type="submit" value="Sign Up" />
          </form>

          <span>
            <h3>{this.state.errorMessages.length > 0 && this.state.errorMessages[0].msg}</h3>
          </span>

          <span>
            {'Already have an account? '}
            <Link to="/login">Log In</Link>
          </span>
        </div>
      </span>
    );
  }
}

export default SignUpForm;
