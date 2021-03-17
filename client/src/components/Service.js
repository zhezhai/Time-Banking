import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TBContext } from "../context/context";
import { Card, Button, ListGroup, Col } from "react-bootstrap";
import Axios from "axios";
import cookie from "react-cookies";

const Service = ({ provider_info }) => {
  const createRecipient = () => {
    const user = cookie.load("user");
    Axios.post("http://localhost:3001/createRecipient", {
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
            <Button
              onClick={() => {
                createRecipient();
              }}
            >
              buy service
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Service;
