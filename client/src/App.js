import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  Error,
  PostService,
  MyService,
  Payment,
  ProviderConfirm,
  Register,
  Supervisor,
  MyInfo,
} from "./pages";
import { PrivateRoute, AdminRoute } from "./components";
import { TBContext } from "./context/context";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  const { ethEnabled } = React.useContext(TBContext);

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
          <PrivateRoute path="/myinfo">
            <MyInfo />
          </PrivateRoute>
          <PrivateRoute path="/myservice">
            <MyService />
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
