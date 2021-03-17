import React, { useEffect, useState } from "react";
import { Navbar, Search, ServiceList } from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TBContext } from "../context/context";
import Axios from "axios";
import cookie from "react-cookies";

const Dashboard = () => {
  const { setIsLoggedIn } = React.useContext(TBContext);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.user) {
        setIsLoggedIn(true);
      } else {
        console.log("no data");
      }
    });
  }, []);

  return (
    <Wrapper>
      <div className="Wrapper">
        <Navbar />
        <Search />
        <ServiceList />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .Wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .btn {
    display: flex;
    margin: auto;
    text-align: center;
  }
`;

export default Dashboard;
