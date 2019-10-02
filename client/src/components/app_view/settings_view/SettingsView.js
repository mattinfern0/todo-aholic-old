/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import AppHeader from '../AppHeader';
import UnauthorizedListener from '../../misc/UnauthorizedListener';

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('Settings mounted');
  }

  render(){
    return (
      <div id="app-container">
        <UnauthorizedListener />
        <AppHeader />
        <div>
          <h2>Not Implemented</h2>
        </div>      
      </div>
    );
  }
}

export default SettingsView;
