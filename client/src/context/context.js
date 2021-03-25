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
      }}
    >
      {children}
    </TBContext.Provider>
  );
};

export { TBProvider, TBContext };
