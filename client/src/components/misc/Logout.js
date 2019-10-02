import React from 'react';
import { Redirect } from 'react-router-dom';
import {clearData} from '../../controllers/PersistentData';

function Logout() {
  clearData();
  return <Redirect to="/login" />;
}

export default Logout;
