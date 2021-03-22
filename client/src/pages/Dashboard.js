import React, { useEffect } from "react";
import { Navbar, Search, ServiceList } from "../components";
import styled from "styled-components";
import { TBContext } from "../context/context";
import {axiosNode, axiosFlask} from "../helpers/axios";

const Dashboard = () => {
  const { setIsLoggedIn } = React.useContext(TBContext);

  useEffect(() => {
    axiosNode.get("/login").then((response) => {
      if (response.data.user) {
        setIsLoggedIn(true);
        console.log(response.data);
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
