import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  Error,
  PostService,
  GetService,
  Payment,
  Test
} from "./pages";
import { TBContext } from "./context/context";
import GlobalStyle from "./GlobalStyle";
import Web3 from "web3";
import Axios from "axios";
const App = () => {
  const {
    loadWeb3,
    initContract,
    currentAccount,
    setCurrentAccount,
    contract,
  } = React.useContext(TBContext);

  useEffect(() => {
    loadWeb3();
    initContract();
  }, []);

  const initAccount = async (address) => {
    contract.methods.initAccount(address).send({ from: currentAccount });
  };

  const getAccount = (address) => {
      Axios.get('http:0.0.0.0:80/TB/api/v1.0/getAccount', {'addr':address}).then((result) => console.log(result))
  };

  const setAccount = (address,status,balance) => {
    contract.methods.setAccount(address, status, balance).send({from:currentAccount})
  }

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
            <Error initAccount={initAccount} getAccount={getAccount} setAccount={setAccount}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
