import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TBContext } from "../context/context";

const Service = ({ provider_info }) => {
  const {
    contract,
    providers,
    currentAccount,
    setRecipient,
    recipient,
    setProviders,
    setCurrentAccount
  } = React.useContext(TBContext);

  const updateRecipient = async () => {
    const data = JSON.parse(localStorage.getItem("provider_info"));
    contract.methods
      .updateRecipient(data.address, data.service)
      .send({ from: currentAccount });
    setRecipient({ address: data.address, service: data.service });
    setCurrentAccount(await window.web3.eth.getAccounts())
  };

  useEffect(() => {
    localStorage.setItem("recipient_info", JSON.stringify(recipient));
    localStorage.setItem('currentAccount', JSON.stringify(currentAccount))
  },[recipient,currentAccount]);

  return (
    <article className="menu-item">
      <div className="item-info">
        <header>
          <h4>provider: {provider_info.name}</h4>
        </header>
        <p className="item-text">
          service information: {provider_info.service}
        </p>
        <p className="item-text">price: {provider_info.price}</p>
        <Link to="/get_service">purchase</Link>
        <button onClick={updateRecipient}>test</button>
      </div>
    </article>
  );
};

export default Service;
