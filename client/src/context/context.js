import React, { useState } from "react";
import Web3 from "web3";
import SrvExchange from "../contracts/SrvExchange.json";
import accounts from "./data/accounts";
import Axios from "axios";

const TBContext = React.createContext();
const TBProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipients, setRecipients] = useState();

  // search the specific service
  // const searchTBService = (serviceName) => {
  //   if (serviceName) {
  //     const result = menu.filter(
  //       (item) =>
  //         item.category.includes(serviceName) ||
  //         item.title.includes(serviceName)
  //     );
  //     setService(result);
  //     console.log(result);
  //   } else {
  //     setService(menu);
  //   }
  // };

  // load browser web3
  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  };

  const initContract = async () => {
    const networkId = await window.web3.eth.net.getId();
    const address = SrvExchange.networks[networkId].address;
    const newContract = new window.web3.eth.Contract(SrvExchange.abi, address);
    const accounts = await window.web3.eth.getAccounts();
    newContract.methods
      .setAccount("0xf61A109AF8d060aE1631c0848dC96826D0Ff0128", 10, 100)
      .send({ from: accounts[0] });
  };

  class SrvExchangeToken {
    constructor(http_provider, contract_addr, contract_config) {
      this.web3 = new Web3(http_provider);
      this.contract_address = Web3.utils.toChecksumAddress(contract_addr);
      this.contract_abi = contract_config.abi;
      this.contract = new this.web3.eth.Contract(
        this.contract_abi,
        this.contract_address
      );
    }

    async initAccount(address) {
      const checksumAddr = Web3.utils.toChecksumAddress(address);
      const accounts = await this.web3.eth.getAccounts();
      const supervisor = accounts[0];
      this.contract.methods
        .initAccount(checksumAddr)
        .send({ from: supervisor });
    }

    async getAccount(address) {
      const checksumAddr = Web3.utils.toChecksumAddress(address);
      return this.contract.methods.getAccount(checksumAddr).call();
    }

    async setAccount(address, status, balance) {
      const checksumAddr = Web3.utils.toChecksumAddress(address);
      const accounts = await this.web3.eth.getAccounts();
      const supervisor = accounts[0];
      this.contract.methods
        .setAccount(checksumAddr, status, balance)
        .send({ from: supervisor });
    }

    async initService() {
      const accounts = await this.web3.eth.getAccounts();
      const supervisor = accounts[0];
      this.contract.methods
        .initService()
        .send({ from: supervisor, gas: 3000000 });
    }

    async getService() {
      const result = await this.contract.methods.getService().call();
      return result;
    }
  }

  const recipientList = () => {
    Axios.get("http://localhost:3001/showRecipients").then((response) => {
      if (response.data == "empty recipient list") {
        console.log("there is no data");
        setRecipients([
          {
            provider_name: "empty",
            recipient_service: "empty",
            recipient_price: "empty",
          },
        ]);
      } else {
        setRecipients(response.data);
      }
    });
  };

  return (
    <TBContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        ethEnabled,
        initContract,
        isLoggedIn,
        setIsLoggedIn,
        recipients,
        setRecipients,
        recipientList,
        SrvExchangeToken
      }}
    >
      {children}
    </TBContext.Provider>
  );
};

export { TBProvider, TBContext };
