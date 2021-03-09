import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import { TBContext } from "../context/context";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return cookie.load('user') ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
};

export default PrivateRoute;
