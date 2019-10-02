import React from 'react';
import { Link } from 'react-router-dom';
import DropDownContainer from '../misc/DropDownContainer';

function AppDropDownButton(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="app-drop-down-button"
    >
      V
    </button>
  );
}

function AppDropDownList() {
  return (
    <ul>
      <li><Link to="/settings">Settings</Link></li>
      <li><Link to="/logout">Log Out</Link></li>
    </ul>
  );
}

function AppHeader(props){
  return (
    <header id="app-header">
      <span id="logo">
        <Link to="/"><h1>ToDo-aholic</h1></Link>
      </span>

      <DropDownContainer
        buttonComponent={<AppDropDownButton />}
        contentComponent={<AppDropDownList />}
        className="drop-down"
      />
    </header>
  );
}

export default AppHeader;
