import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { axiosNode, axiosFlask } from "../helpers/axios";
import { Button, Container, ListGroup, Card } from "react-bootstrap";
import cookie from "react-cookies";

const ProviderConfirm = () => {
  const [services, setServices] = useState([]);
  const user = cookie.load("user");

  const getProvider = () => {
    axiosNode.get("/getServices").then((response) => {
      const results = response.data.result;
      const filtered_result = results.filter((result) => {
        return (
          result.provider_name === user.name &&
          result.provider_status === 1 &&
          result.recipient_status === 2
        );
      });
      setServices(filtered_result);
    });
  };

  const confirmHandler = (service) => {
    axiosNode
      .post("/updateProviderStatus", {
        provider_status: 2,
        id: service.id,
      })
      .then((response) => {
        console.log(response);
      });
    axiosFlask
      .post("/negotiateService", {
        contract_addr: service.contract_address,
        client_addr: service.provider_vid,
        op_state: 3,
        time_currency: service.price,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const providerCommit = (service) => {
    axiosFlask
      .post("/commitService", {
        contract_addr: service.contract_address,
        client_addr: service.provider_vid,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const providerConfirmCall = (service) => {
    confirmHandler(service);
    setTimeout(() => {
      providerCommit(service);
    }, 3000);
    setTimeout(() => {
      window.alert("you have confirmed your service");
    }, 3100);
  };

  useEffect(() => {
    getProvider();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center">
        {services.map((service, index) => {
          return (
            <Card key={index} style={{ margin: "2rem", width: "30rem" }}>
              <Card.Title>provider confirm</Card.Title>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>name: {service.provider_name}</ListGroup.Item>
                  <ListGroup.Item>
                    service: {service.service_info}
                  </ListGroup.Item>
                  <ListGroup.Item>price: {service.price}</ListGroup.Item>
                </ListGroup>
                <Button
                  onClick={() => {
                    providerConfirmCall(service);
                  }}
                >
                  provider confirm
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};
// return (
//   <>
//     <Navbar />
//     <Container className="d-flex align-items-center justify-content-center">
//       <h2>you have confirmed your service</h2>
//       <Button onClick={providerCommit}>test</Button>
//     </Container>
//   </>
// );

export default ProviderConfirm;
