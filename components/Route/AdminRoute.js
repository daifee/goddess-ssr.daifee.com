/**
 * 只允许游客访问
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

export default function UserRouter({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.user && rest.user.role === 'admin') {
          return (<Component {...rest} {...props} />);
        } else {
          return (
            <Redirect to={{pathname: '/'}} />
          );
        }
      }}
    />
  );
}

UserRouter.propTypes = {
  user: PropTypes.object
};
