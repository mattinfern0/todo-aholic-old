import React from 'react';
import {Events} from '../../controllers/EventController';
import MiscEvents from '../../event_types/miscEvents';
import ApiEvents from '../../event_types/apiEvents';

const ERROR_MESSAGE = 'Something went wrong. Please try again.';

class DeleteAccount extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confirming: false,
      error: false,
    };
    this.onAttempt = this.onAttempt.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount(){
    Events.subscribe(MiscEvents.deleteAccountAttempt, this.onAttempt);
  }

  componentWillUnmount(){
    Events.unsubscribe(MiscEvents.deleteAccountAttempt, this.onAttempt);
  }

  onDelete() {
    Events.publish(ApiEvents.deleteAccount);
  }

  onAttempt(err) {
    if (err) {
      this.setState({ error: true });
    } else {
      Events.publish(MiscEvents.logout);
    }
  }

  render(){
    return (
      <div>
        <h2>Delete Account</h2>
        {this.state.confirming && (
          <span>
            <h3>Are You Sure?</h3>
            <button
              type="button"
              onClick={this.onDelete}
            >
              Yes, delete my account
            </button>
            <button
              type="button"
              onClick={() => this.setState({ confirming: false })}
            >
              Cancel
            </button>
            <p>{this.state.error && ERROR_MESSAGE}</p>
          </span>
        )}
        {!this.state.confirming && (
          <button
            type="button"
            onClick={() => this.setState({ confirming: true })}
          >
            Delete Account
          </button>
        )
        }
      </div>
    );
  }
}

export default DeleteAccount;
