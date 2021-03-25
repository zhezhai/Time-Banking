import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, ListGroup, Col } from "react-bootstrap";
import { axiosNode } from "../helpers/axios";
import Axios from "axios";
import cookie from "react-cookies";

const Service = ({ provider_info }) => {
  const createRecipient = () => {
    const user = cookie.load("user");
    Axios.post("http://128.226.88.250:3001/createRecipient", {
      recipient_serviceid: provider_info.id,
      provider_name: provider_info.provider_name,
      recipient_name: user.name,
      recipient_serviceinfo: provider_info.provider_service,
      recipient_price: provider_info.provider_price,
      recipient_vid: user.address,
    }).then((response) => {
      console.log(response);
    });
  };

  const updateProviderStatus = () => {
    axiosNode
      .post("/alterProvider", {
        provider_status: 1,
        provider_id: provider_info.id,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const call = () => {
    createRecipient();
    updateProviderStatus();
  };

  return (
    <Col>
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              provider_name: {provider_info.provider_name}
            </ListGroup.Item>
            <ListGroup.Item>
              service_info: {provider_info.provider_service}
            </ListGroup.Item>
            <ListGroup.Item>
              price: {provider_info.provider_price}
            </ListGroup.Item>
          </ListGroup>
          <Link
            to={{
              pathname: "/myservice",
              state: {
                service_id: provider_info.id,
              },
            }}
          >
            <Button onClick={call}>add to MyService</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Service;
