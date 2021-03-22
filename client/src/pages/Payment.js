import React, { useEffect, useState } from "react";
import { Navbar } from "../components/index";
import { Button } from "react-bootstrap";
import cookie from "react-cookies";
import { axiosNode, axiosFlask } from "../helpers/axios";
import { Container, ListGroup, Card } from "react-bootstrap";

const Payment = () => {
  const user = cookie.load("user");
  const [userInfo, setUserInfo] = useState({});
  const [recipients, setRecipients] = useState([]);

  const showInfo = () => {
    axiosNode.get("/login").then((response) => {
      console.log(response.data.user[0]);
      setUserInfo(response.data.user[0]);
    });
  };

  const recipientList = () => {
    axiosNode.get("/showRecipients").then((response) => {
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
        const results = response.data;
        const filtered_result = results.filter(
          (result) => result.recipient_status === 0
        );
        if (filtered_result.length === 0) {
          console.log("there is no data");
          setRecipients([
            {
              provider_name: "empty",
              recipient_service: "empty",
              recipient_price: "empty",
            },
          ]);
        } else {
          if (user.name !== filtered_result[0].recipient_name) {
            setRecipients([
              {
                provider_name: "empty",
                recipient_service: "empty",
                recipient_price: "empty",
              },
            ]);
          } else {
            setRecipients(filtered_result);
          }
        }
      }
    });
  };

  const recipientCommit = () => {
    axiosFlask
      .post("/TB/api/v1.0/commitService", {
        client_addr: recipients[0].recipient_vid,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const payment = () => {
    axiosFlask
      .post("/TB/api/v1.0/paymentService", {
        client_addr: recipients[0].recipient_vid,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const updateRecipientStatus = () => {
    axiosNode
      .post("/alterRecipient", {
        recipient_status: 1,
        recipient_id: recipients[0].id,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const call = () => {
    recipientCommit();
    setTimeout(() => {
      payment();
    }, 400);
    setTimeout(() => {
      updateRecipientStatus();
    }, 600);
    setTimeout(() => {
      window.alert("payment successfully processed!");
    }, 800);
  };

  useEffect(() => {
    recipientList();
    showInfo();
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
