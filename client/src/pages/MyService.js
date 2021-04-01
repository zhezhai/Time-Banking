import React, { useEffect, useState } from "react";
import { Navbar } from "../components/index";
import { Card, Button, ListGroup, Container } from "react-bootstrap";
import { axiosNode, axiosFlask } from "../helpers/axios";
import cookie from "react-cookies";

const MyService = () => {
  const [services, setServices] = useState([]);
  const user = cookie.load("user");

  const RecipientServiceList = () => {
    axiosNode.get("/getServices").then((response) => {
      const results = response.data.result;
      const filtered_results = results.filter((result) => {
        return (
          result.recipient_name === user.name && result.recipient_status < 2
        );
      });
      setServices(filtered_results);
    });
  };

  const recipientStatusUpdate = (service) => {
    axiosNode
      .post("/updateRecipientStatus", {
        recipient_status: 2,
        id: service.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const recipientDeposit = (service) => {
    axiosFlask
      .post("/negotiateService", {
        contract_addr: service.contract_address,
        client_addr: service.recipient_vid,
        op_state: 1,
        time_currency: service.price,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const myServiceCall = (service) => {
    recipientStatusUpdate(service);
    setTimeout(() => {
      recipientDeposit(service);
    }, 500);
    setTimeout(() => {
      window.alert("wait for provider confirm");
    }, 1000);
  };

  useEffect(() => {
    RecipientServiceList();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center">
        {services.map((service, index) => {
          return (
            <Card key={index}>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    name: {service.recipient_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    service: {service.service_info}
                  </ListGroup.Item>
                  <ListGroup.Item>price: {service.price}</ListGroup.Item>
                  {service.recipient_status === 0 ? (
                    <ListGroup.Item>provider: no provider</ListGroup.Item>
                  ) : (
                    <ListGroup.Item>
                      provider: {service.provider_name}
                    </ListGroup.Item>
                  )}
                </ListGroup>
                <Button
                  onClick={() => {
                    myServiceCall(service);
                  }}
                >
                  buy service
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default MyService;
