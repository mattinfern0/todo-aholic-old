/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import MainRouter from './MainRouter';
import * as serviceWorker from './serviceWorker';

import ApiMessenger from './controllers/ApiMessenger';

// Setup defaults
ApiMessenger.checkServerStatus()
  .then(() => {

    ReactDOM.render(<MainRouter />, document.getElementById('root'));
    ApiMessenger.getUserInbox('testUser');
    ApiMessenger.getProjectList();

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register();
  }).catch((err) => {
    console.log(err);
    alert("Sorry! Can't establish connection to server!");
  });
