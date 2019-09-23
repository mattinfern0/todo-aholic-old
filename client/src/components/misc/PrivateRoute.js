/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const isAuth = false;

// eslint-disable-next-line no-undef
const PrivateRoute = ({component: Component, ...args }) => (
  <Route 
    {...args} 
    render={(props) => {
      if (localStorage.getItem('accessToken')) {
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
