import React, { useEffect } from "react";
import { Navbar } from "../components/index";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { TBContext } from "../context/context";
import { Link } from "react-router-dom";

const GetService = () => {
  const { providers, contract, recipient, setProviders } = React.useContext(
    TBContext
  );

  const submitHandler = () => {
    let data = JSON.parse(localStorage.getItem("provider_info"));
    contract.methods
      .recipient_deposit(data.address, data.price)
      .send({ from: data.address });
  };

  useEffect(() => {
    setProviders(JSON.parse(localStorage.getItem("provider_info")));
  }, []);

  if (providers) {
    return (
      <div>
        <Navbar />
        <Wrapper>
          <div className="container">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{providers.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  price: {providers.price}
                </h6>
                <p className="card-text">{providers.service}</p>
                <Link to="/payment">go to payment page</Link>
                <button className="btn btn-primary" onClick={submitHandler}>
                  deposit
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <h2>there is no service</h2>
    </>
  );
};

export default GetService;

const Wrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
  }

  .card {
    display: flex;
  }
`;
