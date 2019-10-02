import React from 'react';

class NewPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      errorMessage: '',
    };
    this.updatePassword = this.updatePassword.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  updatePassword(e) {
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({errorMessage: 'Passwords don\'t match'});
    } else {
      this.setState({errorMessage: 'Not implemented'});
    }
    e.preventDefault();
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
          <h3>{this.state.errorMessage !== '' && this.state.errorMessage}</h3>
        </span>
      </span>
    );
  }
}

export default NewPasswordForm;
