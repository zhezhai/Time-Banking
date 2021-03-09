import React, { useEffect } from "react";
import { Navbar } from "../components/index";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { TBContext } from "../context/context";
import { Link } from "react-router-dom";

const Payment = () => {
  const {
    providers,
    contract,
    recipient,
    currentAccount,
    setProviders,
    setRecipient,
  } = React.useContext(TBContext);

  const data = JSON.parse(localStorage.getItem("recipient_info"));
  const current = JSON.parse(localStorage.getItem("currentAccount"));

  useEffect(() => {
    setProviders(JSON.parse(localStorage.getItem("provider_info")));
    setRecipient(JSON.parse(localStorage.getItem("recipient_info")));
  }, []);

  const payment = () => {
    contract.methods.service_payment(data.address).send({ from: current });
  };

  const recipientCommit = () => {
    contract.methods.service_commit(data.address).send({ from: current });
  };

  return (
    <Wrapper>
      <Navbar />
      <div className="container">
        <h1>Payment page</h1>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{providers.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                price: {providers.price}
              </h6>
              <p className="card-text">{providers.service}</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  recipientCommit();
                  payment();
                }}
              >
                click to commit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container h1 {
    display: flex;
    margin: auto;
    width: 90%;
    justify-content: center;
  }
  .btn {
    margin: auto;
  }
`;

export default Payment;
