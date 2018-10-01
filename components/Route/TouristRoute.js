/**
 * 只允许游客访问
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

export default function TouristRouter({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.user) {
          return (
            <Redirect to={{pathname: `/users/${rest.user.id}`}} />
          );
        } else {
          return (<Component {...rest} {...props} />);
        }
      }}
    />
  );
}

TouristRouter.propTypes = {
  user: PropTypes.object
};
