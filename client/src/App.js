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
import { PrivateRoute } from "./components";
import { TBContext } from "./context/context";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  const {
    loadWeb3,
    initContract,
    currentAccount,
    setCurrentAccount,
    contract,
    initAccount,
    setAccount,
    getAccount,
    providers,
    setProviders,
  } = React.useContext(TBContext);

  useEffect(() => {
    loadWeb3();
    initContract();
  }, [currentAccount]);

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Switch>
          <PrivateRoute path="/" exact={true}>
            <Dashboard />
          </PrivateRoute>
          <Route path="/login" component={Login} />
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
          <Route path="/test" component={Test} />
          <Route path="/register" component={Register} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
