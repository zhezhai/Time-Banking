import React, { useEffect, useState } from "react";
import { Navbar } from "../components/index";
import { Button } from "react-bootstrap";
import { TBContext } from "../context/context";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import Axios from "axios";
import { Container, ListGroup, Card } from "react-bootstrap";

const Payment = () => {
  const user = cookie.load("user");
  const [recipients, setRecipients] = useState([]);

  const recipientList = () => {
    Axios.get("http://localhost:3001/showRecipients").then((response) => {
      if (response.data == "empty recipient list") {
        console.log("there is no data");
        setRecipients([
          {
            provider_name: "empty",
            recipient_service: "empty",
            recipient_price: "empty",
          },
        ]);
      } else {
        setRecipients(response.data);
      }
    });
  };

  const recipientCommit = () => {
    Axios.post("http://localhost:80/TB/api/v1.0/commitService", {
      client_addr: recipients[0].recipient_vid,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const payment = () => {
    Axios.post("http://localhost:80/TB/api/v1.0/paymentService", {
      client_addr: recipients[0].recipient_vid,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const call = () => {
    recipientCommit();
    payment();
  };

  useEffect(() => {
    recipientList();
  }, []);

  return (
    <>
      <Navbar />

      <Container className="d-flex align-items-center justify-content-center">
        {recipients.map((recipient, index) => {
          return (
            <Card key={index}>
              <Card.Title>payment</Card.Title>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    name: {recipient.provider_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    service: {recipient.recipient_service}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    price: {recipient.recipient_price}
                  </ListGroup.Item>
                </ListGroup>
                <Button onClick={call}>pay</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default Payment;
