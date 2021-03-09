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
  PrivateRoute,
} from "./pages";
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
          <Route path="/get_service" component={GetService} />
          <Route path="/post_service" component={PostService} />
          <Route path="/payment" component={Payment} />
          <Route path="/provider_confirm" component={ProviderConfirm} />
          <Route path="/test" component={Test} />
          <Route path="/register" component={Register} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
