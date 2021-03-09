import React, { useEffect } from "react";
import { Navbar } from "../components";
import { TBContext } from "../context/context";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProviderConfirm = () => {
  const {
    providers,
    contract,
    currentAccount,
    setProviders,
  } = React.useContext(TBContext);
  const data = JSON.parse(localStorage.getItem("provider_info"));

  const confirm = () => {
    contract.methods
      .provider_confirm(data.address)
      .send({ from: data.address });
  };

  const providerCommit = () => {
    contract.methods
      .service_commit(data.address)
      .send({ from: data.address });
  };

  useEffect(() => {
    setProviders(data);
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <div className="container">
        <h1>ProviderConfirm</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{providers.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              price: {providers.price}
            </h6>
            <p className="card-text">{providers.service}</p>
            <button className="btn btn-primary" onClick={() => {
              confirm();
              providerCommit();
            }}>
              click to confirm
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    display: flex;
    margin: auto;
    justify-content: center;
    flex-direction: column;
  }
`;

export default ProviderConfirm;
