import Axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TBContext } from "../context/context";
import accounts from "../context/data/accounts";
import Navbar from "../components/Navbar";
import Web3 from "web3";
import {useForm} from 'react-hook-form'

const Test = () => {
  const { contract, currentAccount } = React.useContext(TBContext);

  const [accountInfo, setAccountInfo] = useState({});
  const [isInit, setIsInit] = useState(false);
  const [inputAccount, setInputAccount] = useState("");
  
  const {register, handleSubmit} = useForm()
 
  const checkIsInit = async (address) => {
    contract.methods
      .getAccount(address)
      .call()
      .then((data) => {
        if (data[0] !== "") {
          setIsInit(true);
        }
      });
  };

  const initHandler = async (address) => {
    console.log(address);
    const web3Address = Web3.utils.toChecksumAddress(address);
    await contract.methods
      .initAccount(web3Address)
      .send({ from: currentAccount });
  };

  const getHandler = (address) => {
    if (address === "") {
      window.alert("there is no account information");
    } else {
      contract.methods
        .getAccount(address)
        .call()
        .then((data) => {
          setAccountInfo(data);
        });
    }
  };

  const setAccountSubmit = (data) => {
      contract.methods.setAccount(inputAccount,Number(data['balance']),Number(data['status'])).send({'from': currentAccount})
    };


  const testHandler = () => {
    Axios.get("http://0.0.0.0:80/test").then((data) => console.log(data));
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <h3>account status</h3>
        {!isInit ? (
          <h4>account is not initialized</h4>
        ) : (
          <h4>account is initialized</h4>
        )}
        <button className="btn" onClick={() => checkIsInit(accounts[2])}>
          check
        </button>

        <h3>init account</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            initHandler(inputAccount);
          }}
        >
          <div className="form-group">
            <label>the account address you want to init</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              onChange={(e) => setInputAccount(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            init account
          </button>
        </form>

        <h3>get account info</h3>
        <ul className="list-group">
          <li className="list-group-item">account uid is: {accountInfo[0]}</li>
          <li className="list-group-item">
            account balance is: {accountInfo[1]}
          </li>
          <li className="list-group-item">
            account status is: {accountInfo[2]}
          </li>
        </ul>
        <button className="btn" onClick={() => getHandler(inputAccount)}>
          getAccount
        </button>

        <h3>set Account</h3>
        <form
          onSubmit={handleSubmit(setAccountSubmit)}
        >
          <div className="form-group">
            <label>the account balance</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter balance"
              name='balance'
              ref={register}
            />
          </div>
          <div className="form-group">
            <label>the account status</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter status"
              name='status'
              ref = {register}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            set account
          </button>
        </form>
        <button
          className="btn"
          //   onClick={() => setHandler(inputAccount, 1, 100)}
        >
          setAccount
        </button>
        <button className="btn" onClick={testHandler}>
          test
        </button>
      </Wrapper>
    </>
  );
}


const Wrapper = styled.div`
  margin: 3rem;
  display: center;
  padding: 2rem;
`;

export default Test;
