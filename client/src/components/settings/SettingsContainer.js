import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../app/AppHeader';
import UnauthorizedListener from '../misc/UnauthorizedListener';
import NewPasswordForm from './NewPasswordForm';
import DeleteAccount from './DeleteAccount';

export default function SettingsContainer() {
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
