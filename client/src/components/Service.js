import React from "react";
import { Card, Button, ListGroup, Col } from "react-bootstrap";
import { axiosFlask, axiosNode } from "../helpers/axios";
import cookie from "react-cookies";

const Service = ({ service }) => {
  const user = cookie.load("user");

  const insertProvider = () => {
    axiosNode
      .post("/updateProvider", {
        provider_name: user.name,
        provider_vid: user.address,
        id: service.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const insertRecipient = () => {
    axiosNode
      .post("/updateRecipient", {
        recipient_name: user.name,
        recipient_vid: user.address,
        id: service.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const providerStatusUpdate = () => {
    axiosNode
      .post("/updateProviderStatus", {
        provider_status: 1,
        id: service.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const recipientStatusUpdate = () => {
    axiosNode
      .post("/updateRecipientStatus", {
        recipient_status: 1,
        id: service.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const providerRegister = () => {
    axiosFlask
      .post("/registerService", {
        contract_addr: service.contract_address,
        client_addr: user.address,
        op_state: 2,
        service_info: service.service_info,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const recipientRegister = () => {
    axiosFlask
      .post("/registerService", {
        contract_addr: service.contract_address,
        client_addr: user.address,
        op_state: 1,
        service_info: service.service_info,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const recipientCall = () => {
    insertProvider();
    recipientStatusUpdate();
    providerStatusUpdate();
    setTimeout(() => {
      providerRegister();
    }, 500);
  };
  const providerCall = () => {
    insertRecipient();
    recipientStatusUpdate();
    providerStatusUpdate();
    setTimeout(() => {
      recipientRegister();
    }, 500);
  };

  if (service.post_type === "provider" && service.provider_status === 0) {
    return (
      <Col>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                provider_name: {service.provider_name}
              </ListGroup.Item>
              <ListGroup.Item>
                service_info: {service.service_info}
              </ListGroup.Item>
              <ListGroup.Item>price: {service.price}</ListGroup.Item>
            </ListGroup>
            <Button onClick={providerCall}>buy service</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  } else if (
    service.post_type === "recipient" &&
    service.provider_status === 0
  ) {
    return (
      <Col>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                recipient_name: {service.recipient_name}
              </ListGroup.Item>
              <ListGroup.Item>
                service_info: {service.service_info}
              </ListGroup.Item>
              <ListGroup.Item>price: {service.price}</ListGroup.Item>
            </ListGroup>
            <Button onClick={recipientCall}>provide service</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  } else {
    return <></>;
  }
};

export default Service;
