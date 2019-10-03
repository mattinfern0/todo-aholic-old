/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../AppHeader';
import UnauthorizedListener from '../../misc/UnauthorizedListener';
import NewPasswordForm from './NewPasswordForm';
import DeleteAccount from './DeleteAccount';


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
        <div id="settings-container">
          <div id="settings-content">
            <Link to="/" className="settings-back-link">Back</Link>
            <h2>Your Account</h2>
            <h3>{`Username: ${currentUser.username}`}</h3>
            <hr />
            <NewPasswordForm />
            <hr />
            <DeleteAccount />
          </div>
          
        </div>      
      </div>
    );
  }
}

export default SettingsView;
