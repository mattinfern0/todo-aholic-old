import React from 'react';
import { Redirect } from 'react-router-dom';
import {Events} from '../../controllers/EventController';
import MiscEvents from '../../event_types/miscEvents';

class UnauthorizedListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };
    this.onUnauthorized = this.onUnauthorized.bind(this);
  }

  componentDidMount(){
    Events.subscribe(MiscEvents.logout, this.onUnauthorized);
  }

  componentWillUnmount() {
    Events.unsubscribe(MiscEvents.logout, this.onUnauthorized);
  }

  onUnauthorized(){
    this.setState({ authenticated: false });
  }

  render() {
    if (!this.state.authenticated) {
      return <Redirect to="/logout" />;
    } else {
      return null;
    }
  }
}

export default UnauthorizedListener;
