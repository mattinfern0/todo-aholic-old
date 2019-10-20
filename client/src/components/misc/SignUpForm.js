import React from 'react';
import { Events } from '../../controllers/EventController';
import { apiEvents, miscEvents } from '../../event_types';


class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.doSignUp = this.doSignUp.bind(this);
  }

  doSignUp(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const password2 = this.state.confirmPassword;

    if (password2 !== password) {
      Events.publish(miscEvents.signupFailed, [{msg: 'Passwords don\'t match'}]);
      return;
    }

    const credentials = {
      username,
      password,
    };

    Events.publish(apiEvents.signup, credentials);
  }

  render() {
    return (
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
    );
  }
}

export default SignUpForm;
