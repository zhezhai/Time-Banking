import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";

const Dbtest = () => {
  const [value, setValue] = useState({ name: "", email: "", service: "" });

  const test = () => {
    console.log(value);
    Axios.post("http://localhost:3001/create", {
      name: value.name,
      email: value.email,
      service: value.service,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <Wrapper>
      <div className="form">
        <label>name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setValue({ ...value, name: e.target.value });
          }}
        />
        <label>email:</label>
        <input
          type="text"
          name="email"
          onChange={(e) => {
            setValue({ ...value, email: e.target.value });
          }}
        />
        <label>service:</label>
        <input
          type="text"
          name="service"
          onChange={(e) => {
            setValue({ ...value, service: e.target.value });
          }}
        />
        <button className="btn btn-primary" onClick={test}>
          submit
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form {
    margin: auto;
    width: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .form input {
    margin: 1rem;
  }
  .form button {
    margin: auto;
  }
`;

export default Dbtest;
