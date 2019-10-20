import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import { Events } from '../../controllers';
import { miscEvents } from '../../event_types';
import { SignUpForm } from '../misc';


class SignUpContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessages: [],
      success: false,
    };
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
          <SignUpForm />

          {this.state.errorMessages.length > 0 && (
            <div className="error-message">
              <h3>{this.state.errorMessages[0].msg}</h3>
            </div>
          )}

          <div>
            {'Already have an account? '}
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </span>
    );
  }
}

export default SignUpContainer;
