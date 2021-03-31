import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loading && isAuthenticated) {
          return <Component {...props} />;
        }

        if (isAdmin && !user.role === 'admin') {
          <Redirect to='/' />;
        }
        return <Redirect to='/login' />;
      }}
    />
  );
};

export default ProtectedRoute;
