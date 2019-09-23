import React from 'react';
import {APIMessengerTypes, Events} from '../../controllers/EventController';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.doLogin = this.doLogin.bind(this);
  }

  doLogin(e) {
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };

    Events.publish(APIMessengerTypes.login, credentials);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <form id="login-form" onSubmit={this.doLogin}>
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
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
