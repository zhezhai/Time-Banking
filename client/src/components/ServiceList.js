import React, { useState, useEffect } from "react";
import Service from "./Service";
import { Container, Row, Button } from "react-bootstrap";
import {axiosNode, axiosFlask} from "../helpers/axios";

const ServiceList = () => {
  const [serviceList, setServiceList] = useState([]);

  const show_provider = () => {
    axiosNode.get("/showProviders").then((response) => {
      const results = response.data;
      const filtered_results = results.filter(
        (result) => result.provider_status === 0
      );
      setServiceList(filtered_results);
    });
  };

  useEffect(() => {
    show_provider();
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row>
        {serviceList.map((service) => {
          return <Service provider_info={service} key={service.id} />;
        })}
      </Row>
    </Container>
  );
};

export default ServiceList;
