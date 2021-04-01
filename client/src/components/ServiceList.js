import React, { useState, useEffect } from "react";
import Service from "./Service";
import { Container, Row } from "react-bootstrap";
import { axiosNode } from "../helpers/axios";

const ServiceList = () => {
  const [serviceList, setServiceList] = useState([]);

  const getServices = () => {
    axiosNode.get("/getServices").then((response) => {
      console.log(response.data);
      setServiceList(response.data.result);
    });
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row>
        {serviceList.map((service) => {
          return <Service service={service} key={service.id} />;
        })}
      </Row>
    </Container>
  );
};

export default ServiceList;
