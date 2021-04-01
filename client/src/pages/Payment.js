import React, { useEffect, useState } from "react";
import { Navbar } from "../components/index";
import { Button } from "react-bootstrap";
import cookie from "react-cookies";
import { axiosNode, axiosFlask } from "../helpers/axios";
import { Container, ListGroup, Card } from "react-bootstrap";

const Payment = () => {
  const user = cookie.load("user");
  const [services, setServices] = useState([]);

  const paymentList = () => {
    axiosNode.get("/getServices").then((response) => {
      const results = response.data.result;
      const filtered_results = results.filter((result) => {
        return (
          result.recipient_name === user.name && result.recipient_status === 2
        );
      });
      setServices(filtered_results);
    });
  };

  const recipientCommit = (service) => {
    axiosFlask
      .post("/commitService", {
        contract_addr: service.contract_address,
        client_addr: service.recipient_vid,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const payment = (service) => {
    axiosFlask
      .post("/paymentService", {
        contract_addr: service.contract_address,
        client_addr: service.recipient_vid,
      })
      .then((response) => {
        if (response.data.paymentService === "Succeed") {
          axiosNode
            .post("/alterContract", {
              status: 0,
              contract_addr: service.contract_address,
            })
            .then((response) => {
              console.log(response.data.message);
            });
        }
      });
  };

  const recipientStatusUpdate = (service) => {
    axiosNode
      .post("/updateRecipientStatus", {
        recipient_status: 3,
        id: service.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const setUserBalance = (service) => {
    axiosNode
      .get("/getUser", {
        params: {
          username: service.provider_name,
        },
      })
      .then((response) => {
        const result = response.data.result;
        axiosNode
          .post("/setUserBalance", {
            address: service.provider_vid,
            balance: result[0].balance + service.price,
          })
          .then((response) => {
            console.log(response);
          });
      });
    axiosNode
      .get("/getUser", {
        params: {
          username: service.recipient_name,
        },
      })
      .then((response) => {
        const result = response.data.result;
        axiosNode
          .post("/setUserBalance", {
            address: service.recipient_vid,
            balance: result[0].balance - service.price,
          })
          .then((response) => {
            console.log(response);
          });
      });
  };

  const paymentCall = (service) => {
    recipientCommit(service);
    setTimeout(() => {
      payment(service);
    }, 3000);
    setTimeout(() => {
      recipientStatusUpdate(service);
    }, 3100);
    setTimeout(() => {
      setUserBalance(service);
    }, 3200);
    setTimeout(() => {
      window.alert("payment successfully processed!");
    }, 3300);
  };

  useEffect(() => {
    paymentList();
  }, []);

  return (
    <>
      <Navbar />

      <Container className="d-flex align-items-center justify-content-center">
        {services.map((service, index) => {
          return (
            <Card key={index}>
              <Card.Title>payment</Card.Title>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>name: {service.provider_name}</ListGroup.Item>
                  <ListGroup.Item>
                    service: {service.service_info}
                  </ListGroup.Item>
                  <ListGroup.Item>price: {service.price}</ListGroup.Item>
                  {service.provider_status === 2 ? (
                    <ListGroup.Item>provider confirmed</ListGroup.Item>
                  ) : (
                    <ListGroup.Item>provider not confirmed</ListGroup.Item>
                  )}
                </ListGroup>
                <Button
                  onClick={() => {
                    paymentCall(service);
                  }}
                >
                  pay
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default Payment;
