import React from 'react';
import {Redirect} from 'react-router-dom';
import {EventTypes, Events} from '../../controllers/EventController';

class LogoutButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggingOut: false,
    };
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount(){
    Events.subscribe(EventTypes.logout, this.onLogout);
  }

  componentWillUnmount(){
    Events.unsubscribe(EventTypes.logout, this.onLogout);
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
