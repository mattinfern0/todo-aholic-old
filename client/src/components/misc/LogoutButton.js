import React from 'react';
import {Redirect} from 'react-router-dom';
import {Events} from '../../controllers/EventController';
import MiscEvents from '../../event_types/miscEvents';

class LogoutButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggingOut: false,
    };
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount(){
    Events.subscribe(MiscEvents.logout, this.onLogout);
  }

  componentWillUnmount(){
    Events.unsubscribe(MiscEvents.logout, this.onLogout);
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
        className="logout-button"
        type="button"
        onClick={this.onLogout}
      >
        Logout
      </button>
    );
  }
}

export default LogoutButton;
