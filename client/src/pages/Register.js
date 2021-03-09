import React, { useState } from "react";
import styled from "styled-components";
import { Navbar } from "../components/index";
import Axios from "axios";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({ name: "", password: "", address: "" });
  const [log, setLog] = useState("");

  const submitHandler = () => {
    Axios.get("http://127.0.0.1:3001/user_list", {
      params: {
        name: user.name,
      },
    }).then((response) => {
      if (response.data == "no user") {
        Axios.post("http://127.0.0.1:3001/register", {
          name: user.name,
          password: user.password,
          address: user.address,
        }).then((response) => {
          console.log(response);
        });
      } else {
        console.log(response.data);
        setLog("user already exist");
      }
    });
  };

  const test = () => {
    Axios.get("http://127.0.0.1:3001/user_list", {
      params: {
        name: user.name,
      },
    }).then((response) => {
      if (response.data == "no user") {
        console.log("hello");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>registration</h1>

        <div className="control-group">
          <label className="control-label">Username</label>
          <div className="controls">
            <input
              type="text"
              name="name"
              placeholder=""
              className="input-xlarge"
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            {!log ? (
              <p className="help-block">
                Username can contain any letters or numbers, without spaces
              </p>
            ) : (
              <p>{log}</p>
            )}
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Password</label>
          <div className="controls">
            <input
              type="password"
              name="password"
              placeholder=""
              className="input-xlarge"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            <p className="help-block">
              Password should be at least 4 characters
            </p>
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">address</label>
          <div className="controls">
            <input
              type="text"
              name="address"
              placeholder=""
              className="input-xlarge"
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
            />
            <p className="help-block">Please enter your account address</p>
          </div>
        </div>

        <div className="control-group">
          <div className="controls">
            <button className="btn btn-primary" onClick={submitHandler}>
              Register
            </button>
          </div>
        </div>

        <div className="control-group">
          <div className="controls">
            <button className="btn btn-primary" onClick={test}>
              get_user
            </button>
          </div>
        </div>
        <div className="control-group">
          <div className="controls">
            <Link to="/login">
              <button className="btn btn-primary">go to login page</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
