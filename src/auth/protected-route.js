import React from "react";
import { Route } from "react-router-dom";
import Loading from "../signUp/loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);
export default ProtectedRoute;