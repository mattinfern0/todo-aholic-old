import React from 'react';
import { Events } from '../../../controllers/EventController';
import MiscEvents from '../../../event_types/miscEvents';
import ApiEvents from '../../../event_types/apiEvents';

class NewPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      message: '',
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.onAttempt = this.onAttempt.bind(this);
  }

  componentDidMount() {
    Events.subscribe(MiscEvents.changePasswordAttempt, this.onAttempt);
  }

  componentWillUnmount() {
    Events.subscribe(MiscEvents.changePasswordAttempt, this.onAttempt);
  }

  // eslint-disable-next-line class-methods-use-this
  updatePassword(e) {
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({message: 'Passwords don\'t match'});
    } else {
      const data = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      };
      Events.publish(ApiEvents.changePassword, data);
    }
    e.preventDefault();
  }

  // Expects err to be a list of errorObjects
  onAttempt(err) {
    if (!err) {
      this.setState({ message: 'Password succesfully changed'});
    } else {
      this.setState({ message: err[0].msg });
    }
  }

  render(){
    return (
      <span>
        <form onSubmit={this.updatePassword}>
          <input
            type="password"
            placeholder="Current password"
            value={this.state.oldPassword}
            onChange={(e) => this.setState({ oldPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="New password"
            value={this.state.newPassword}
            onChange={(e) => this.setState({ newPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={this.state.confirmNewPassword}
            onChange={(e) => this.setState({ confirmNewPassword: e.target.value })}
          />
          <input type="submit" value="Submit" />
        </form>
        <span>
          <h3>{this.state.message !== '' && this.state.message}</h3>
        </span>
      </span>
    );
  }
}

export default NewPasswordForm;
