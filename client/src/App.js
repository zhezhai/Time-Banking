import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  Error,
  PostService,
  GetService,
  Payment,
  Test,
  ProviderConfirm,
  Register,
} from "./pages";
import { PrivateRoute, AdminRoute } from "./components";
import { TBContext } from "./context/context";
import GlobalStyle from "./GlobalStyle";
import Supervisor from "./pages/Supervisor";

const App = () => {
  const { initContract, ethEnabled } = React.useContext(TBContext);

  useEffect(() => {
    ethEnabled();
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Switch>
          <PrivateRoute path="/" exact={true}>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/get_service">
            <GetService />
          </PrivateRoute>
          <PrivateRoute path="/post_service">
            <PostService />
          </PrivateRoute>
          <PrivateRoute path="/payment">
            <Payment />
          </PrivateRoute>
          <PrivateRoute path="/provider_confirm">
            <ProviderConfirm />
          </PrivateRoute>
          <AdminRoute path="/supervisor">
            <Supervisor />
          </AdminRoute>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
