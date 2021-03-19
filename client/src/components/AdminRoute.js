import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import { TBContext } from "../context/context";

const AdminRoute = ({ children, ...rest }) => {
  const status = cookie.load("admin");
  return (
    <Route
      {...rest}
      render={() => {
        return status ? children : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default AdminRoute;
