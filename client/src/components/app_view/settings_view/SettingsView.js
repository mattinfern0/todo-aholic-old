/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import AppHeader from '../AppHeader';
import UnauthorizedListener from '../../misc/UnauthorizedListener';
import NewPasswordForm from './NewPasswordForm';

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('Settings mounted');
  }

  render(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (
      <div id="app-container">
        <UnauthorizedListener />
        <AppHeader />
        <div>
          <h2>Your Account</h2>
          <h3>{`Username: ${currentUser.username}`}</h3>
          <NewPasswordForm />
          <button type="button">Delete Account</button>
        </div>      
      </div>
    );
  }
}

export default SettingsView;
