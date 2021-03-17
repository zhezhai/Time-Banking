import React, { useState, useEffect } from "react";
import { TBContext } from "../context/context";
import Service from "./Service";
import styled from "styled-components";
import { Container,Row } from "react-bootstrap";
import Axios from "axios";

const ServiceList = () => {
  const [serviceList, setServiceList] = useState([]);

  Axios.defaults.withCredentials = true;

  const show_provider = async () => {
    const result = await Axios.get("http://localhost:3001/showProviders");
    setServiceList(result.data);
  };

  useEffect(() => {
    show_provider();
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row>
        {serviceList.map((service) => {
          return <Service provider_info={service} key={service.id}/>;
        })}
      </Row>
    </Container>
  );
};

const Wrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
  }
`;

export default ServiceList;
