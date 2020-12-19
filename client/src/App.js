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
          <Route path="/" exact={true}>
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/get_service">
            <GetService />
          </Route>
          <Route path="/post_service">
            <PostService />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="*">
            <Error
              initAccount={initAccount}
              getAccount={getAccount}
              setAccount={setAccount}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
