import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import abi from "../contracts/SrvExchange.json";
import menu from "./data/data";
import accounts from "./data/accounts";
import Axios from "axios";

const TBContext = React.createContext();
const TBProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [service, setService] = useState(menu);
  const [contract, setContract] = useState();

  // search the specific service
  const searchTBService = (serviceName) => {
    if (serviceName) {
      const result = menu.filter(
        (item) =>
          item.category.includes(serviceName) ||
          item.title.includes(serviceName)
      );
      setService(result);
      console.log(result);
    } else {
      setService(menu);
    }
  };

  // load browser web3
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const initContract = async () => {
    if (
      typeof window.ethereum == "undefined" ||
      typeof window.web3 == "undefined"
    ) {
      return;
    }
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentAccount(account);

    const networkId = await web3.eth.net.getId();
    const address = abi.networks[networkId].address;
    const newContract = new web3.eth.Contract(abi.abi, address);
    setContract(newContract);
  };

  // const initAccount = async (address) => {
  //   contract.methods.initAccount(address).send({ from: currentAccount });
  // };

  // const getAccount = async (address) => {
  //   const response = await contract.methods.getAccount(address).call();
  //   console.log(response)
  // };

  // const setAccount = (address, status, balance) => {
  //   contract.methods
  //     .setAccount(address, status, balance)
  //     .send({ from: currentAccount });
  // };

  return (
    <TBContext.Provider
      value={{
        loadWeb3,
        initContract,
        service,
        setService,
        searchTBService,
        currentAccount,
        setCurrentAccount,
        contract,
        // getAccount,
      }}
    >
      {children}
    </TBContext.Provider>
  );
};

export { TBProvider, TBContext };
