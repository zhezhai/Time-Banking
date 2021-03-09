import Axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TBContext } from "../context/context";
import accounts from "../context/data/accounts";
import Navbar from "../components/Navbar";
import Web3 from "web3";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const Supervisor = () => {
  const supervisor = "0xBC917c093788EfFE54D9A519BB237657F9Df159E";
  const { contract, currentAccount, setCurrentAccount } = React.useContext(
    TBContext
  );
  const { register, handleSubmit } = useForm();

  const [accountInfo, setAccountInfo] = useState({});
  const [isInit, setIsInit] = useState(false);
  const [inputAccount, setInputAccount] = useState("");
  const [serviceInfo, setServiceInfo] = useState({})

  useEffect(() => {
    console.log(currentAccount);
  }, [currentAccount]);

  const supervisorLogin = async () => {
    const account = await window.web3.eth.getAccounts();
    setCurrentAccount(account[0]);
  };

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
    contract.methods
      .setAccount(
        currentAccount,
        Number(data["balance"]),
        Number(data["status"])
      )
      .send({ from: currentAccount });
  };

  const initService = () => {
    contract.methods.initService().send({ from: currentAccount });
  };

  const check = async () => {
    const account = await window.web3.eth.getAccounts()
    setCurrentAccount(account[0])
  }

  const getService = () => {
    contract.methods.getService().call().then((data) => {
      console.log(data);
      setServiceInfo(data)
    })
  }

  if (currentAccount == supervisor) {
    return (
      <>
        <Navbar />
        <Wrapper>
          <div className="container">
            {/* get the account status */}
            <div className="blocks">
              <h3>account status</h3>
              {!isInit ? (
                <h4>account is not initialized</h4>
              ) : (
                <h4>account is initialized</h4>
              )}
              <button className="btn" onClick={() => checkIsInit(accounts[2])}>
                check
              </button>
            </div>

            {/* init the account */}
            <div className="blocks">
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
            </div>

            {/* function:get the account info */}
            <div className="blocks">
              <h3>get account info</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  account uid is: {accountInfo[0]}
                </li>
                <li className="list-group-item">
                  account balance is: {accountInfo[1]}
                </li>
                <li className="list-group-item">
                  account status is: {accountInfo[2]}
                </li>
              </ul>
              <button
                className="btn"
                onClick={() => getHandler(currentAccount)}
              >
                getAccount
              </button>
            </div>

            {/* set the account */}
            <div className="blocks">
              <h3>set Account</h3>
              <form onSubmit={handleSubmit(setAccountSubmit)}>
                <div className="form-group">
                  <label>the account balance</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter balance"
                    name="balance"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label>the account status</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter status"
                    name="status"
                    ref={register}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  set account
                </button>
              </form>
            </div>

            {/* init service function */}
            <div className="blocks">
              <h3>init service</h3>
              <button className="btn btn-primary" onClick={initService}>
                init service
              </button>
            </div>

            <div className="check">
              <button className="btn btn-primary" onClick={check}>check</button>
            </div>

            <div className = 'blocks'>
            <p>dealer_balance: {serviceInfo.dealer_balance}</p>
            <p>dealer_uid: {serviceInfo.dealer_uid}</p>
            <p>provider_VID: {serviceInfo.provider_VID}</p>
            <p>provider_serviceInfo: {serviceInfo.provider_serviceInfo}</p>
            <p>provider_status: {serviceInfo.provider_status}</p>
            <p>recipient_VID: {serviceInfo.recipient_VID}</p>
            <p>recipient_serviceInfo: {serviceInfo.recipient_serviceInfo}</p>
            <p>recipient_status: {serviceInfo.recipient_status}</p>
              <button className = 'btn btn-primary' onClick={getService}>getService</button>
            </div>
          </div>
        </Wrapper>
      </>
    );
  }
  return (
    <>
      <h2>you are not logged in as supervisor</h2>
      <button className="btn btn-primary" onClick={supervisorLogin}>
        login
      </button>
    </>
  );
};

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: center;
  }
  .blocks {
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
    padding: 2rem;
    justify-content: center;
    border: 1px solid black;
  }
  .check {
    display: flex;
    margin: auto;

  }
`;

export default Supervisor;
