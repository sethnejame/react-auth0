import React from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { Route } from "react-router-dom";

function PublicRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default PublicRoute;
