import Axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TBContext } from "../context/context";
import accounts from "../context/data/accounts";
import Navbar from "../components/Navbar";

const Error = ({ initAccount, getAccount, setAccount }) => {
  const initHandler = (address) => {
    initAccount(address);
  };
  const getHandler = (address) => {
    getAccount(address);
  };
  const setHandler = (address, status, balance) => {
    setAccount(address, status, balance);
  };

  const testHandler = () => {
    Axios.get("http://0.0.0.0:80/test").then((data) => console.log(data));
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <button className="btn" onClick={() => initHandler(accounts[0])}>
          click
        </button>
        <button className="btn" onClick={() => getHandler(accounts[0])}>
          getAccount
        </button>
        <button className="btn" onClick={() => setHandler(accounts[0], 1, 100)}>
          setAccount
        </button>
        <button className="btn" onClick={testHandler}>
          test
        </button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 3rem;
  display: center;
  padding: 2rem;
`;

export default Error;
