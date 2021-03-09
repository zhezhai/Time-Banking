import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import cookie from "react-cookies";
import { TBContext } from "../context/context";

const Login = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [log, setLog] = useState("please enter user name");
  const [value, setValue] = useState();
  const { isLoggedIn, setIsLoggedIn } = React.useContext(TBContext);
  const history = useHistory();

  Axios.defaults.withCredentials = true;
  const loginHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      name: user.name,
      password: user.password,
    }).then((response) => {
      if (response.data.message == "you are logged in") {
        cookie.save("user", response.data.result[0]);
        console.log(response.data.result[0]);
        setLog(response.data.message);
        setIsLoggedIn(true);
        history.push("/");
      }
      if (response.data.message == "no matched user") {
        setLog("wrong username or password");
        console.log("no matched user");
      }
    });
  };

  const test = (e) => {
    e.preventDefault();
    console.log(cookie.load("user"));
  };

  return (
    <Wrapper>
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <p>{log}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email">password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={loginHandler}
          >
            Login
          </button>

          <Link to="/register">
            <button className="btn btn-primary">register</button>
          </Link>
          <button className="btn btn-primary" onClick={test}>
            test
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .login {
    display: flex;
    flex-direction: column;
  }
  .login h1 {
    display: flex;
    justify-content: center;
  }
  .form-control {
    justify-content: center;
  }
  .dash-link {
    display: flex;
    justify-content: center;
  }
  h2 {
    display: flex;
    justify-content: center;
  }
`;

export default Login;
