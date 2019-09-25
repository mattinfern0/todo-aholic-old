import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {EventTypes, APIMessengerTypes, Events} from '../../controllers/EventController';


class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loggedIn: false,
    };
    this.doSignUp = this.doSignUp.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidMount(){
    // Events.subscribe(EventTypes.login, this.changeLoggedInStatus);
  }

  changeStatus() {
    this.setState({ loggedIn: true });
  }

  doSignUp(e) {
    // Code to Validate & sanitize credentials

    /* const credentials = {
      username: this.state.username,
      password: this.state.password,
    };

    Events.publish(APIMessengerTypes.login, credentials); */
    e.preventDefault();
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div id="signin-container" className="user-form-container">
        <h4>Sign Up</h4>
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
          {'Already have an account? '}
          <Link to="/login">Log In</Link>
        </span>
        <span>
          <h3>{this.state.errorMessage}</h3>
        </span>
      </div>
    );
  }
}

export default SignUpForm;
