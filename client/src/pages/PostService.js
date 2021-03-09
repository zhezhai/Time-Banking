import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/index";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { TBContext } from "../context/context";

const PostService = () => {
  const { contract, providers, setProviders, currentAccount } = React.useContext(
    TBContext
  );
  const { register, handleSubmit, error } = useForm();

  const updateProvider = async (data) => {
    let provider_addr = await window.web3.eth.getAccounts();
    contract.methods
      .updateProvider(provider_addr[0], data.provider_service)
      .send({ from: currentAccount });
    setProviders(
      {name: data.provider_name,
      service: data.provider_service,
      price: data.provider_price,
      address: provider_addr[0]}
    );
    // console.log(data);
    // console.log(provider_addr);
    // console.log(data.provider_service);
  };

  useEffect(() => {
    localStorage.setItem("provider_info", JSON.stringify(providers));
  }, [providers]);

  return (
    <div>
      <Navbar />
      <Wrapper>
        <div className="container">
          <form onSubmit={handleSubmit(updateProvider)}>
            <div className="form-group">
              <label htmlFor="provider_name">provider name</label>
              <input
                type="text"
                className="form-control"
                name="provider_name"
                placeholder="please enter your name"
                ref={register}
              />
            </div>
            <div className="form-group">
              <label htmlFor="provider_service">service info</label>
              <input
                type="text"
                className="form-control"
                name="provider_service"
                placeholder="please enter your service info"
                ref={register}
              />
            </div>
            <div className="form-group">
              <label htmlFor="provider_price">service price</label>
              <input
                type="text"
                className="form-control"
                name="provider_price"
                placeholder="please enter your price"
                ref={register}
              />
            </div>
            <button className="btn btn-primary">post service</button>
          </form>
          <button
            onClick={() => {
              console.log(providers);
            }}
          >
            test
          </button>
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  .container {
    display: block;
    justify-content: center;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    padding: 1rem;
  }

  .btn.btn-primary {
    display: flex;
    justify-content: center;
    margin: auto;
  }
`;
export default PostService;
