/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getToken} from '../../controllers/PersistentData';

// eslint-disable-next-line no-undef
const PrivateRoute = ({component: Component, ...args }) => (
  <Route
    {...args} 
    render={(props) => {
      if (getToken()) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        );
      }
    }}
  />
);

export default PrivateRoute;
