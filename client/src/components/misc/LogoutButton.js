import React from 'react';
import {Redirect} from 'react-router-dom';

class LogoutButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggingOut: false,
    };
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(){
    localStorage.clear();
    this.setState({ loggingOut: true });
  }

  render(){
    if (this.state.loggingOut){
      return <Redirect to="/login" />;
    }

    return (
      <button
        type="button"
        onClick={this.onLogout}
      >
        Logout
      </button>
    );
  }
}

export default LogoutButton;
