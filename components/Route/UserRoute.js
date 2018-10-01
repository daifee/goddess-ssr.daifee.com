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
        if (rest.user) {
          return (<Component {...rest} {...props} />);
        } else {
          const ref = encodeURIComponent(window.location.href);
          return (
            <Redirect to={{pathname: '/login', search: `?ref=${ref}`}} />
          );
        }
      }}
    />
  );
}

UserRouter.propTypes = {
  user: PropTypes.object
};
