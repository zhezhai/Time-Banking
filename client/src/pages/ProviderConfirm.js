import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { axiosNode, axiosFlask } from "../helpers/axios";
import { Button, Container, ListGroup, Card } from "react-bootstrap";
import cookie from "react-cookies";

const ProviderConfirm = () => {
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState({});
  const user = cookie.load("user");

  const getProvider = () => {
    axiosNode
      .get("/getProvider", {
        params: {
          name: user.name,
        },
      })
      .then((response) => {
        if (response.data === "provider does not exist") {
          console.log(response.data);
        } else {
          console.log(response.data[0]);
          setProvider(response.data[0]);
        }
      });
  };

  const getService = () => {
    axiosFlask.get("/TB/api/v1.0/getService").then((response) => {
      setStatus(response.data.data.provider.status);
    });
  };

  const confirmHandler = () => {
    axiosFlask
      .post("/TB/api/v1.0/negotiateService", {
        client_addr: provider.provider_vid,
        op_state: 3,
        time_currency: provider.provider_price,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const providerCommit = () => {
    axiosFlask
      .post("/TB/api/v1.0/commitService", {
        client_addr: provider.provider_vid,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const call = () => {
    confirmHandler();
    setTimeout(() => {
      providerCommit();
    }, 3000);
    setTimeout(() => {
      window.alert("you have confirmed your service");
    }, 3100);
  };

  useEffect(() => {
    getProvider();
    getService();
  }, []);

  if (status === 1) {
    return (
      <>
        <Navbar />
        <Container className="d-flex align-items-center justify-content-center">
          <Card style={{ margin: "2rem", width: "30rem" }}>
            <Card.Title>provider confirm</Card.Title>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>name: {provider.provider_name}</ListGroup.Item>
                <ListGroup.Item>
                  service: {provider.provider_service}
                </ListGroup.Item>
                <ListGroup.Item>
                  price: {provider.provider_price}
                </ListGroup.Item>
                <ListGroup.Item>status: {status}</ListGroup.Item>
              </ListGroup>
              <Button onClick={call}>provider confirm</Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Container className="d-flex align-items-center justify-content-center">
          <h2>you have confirmed your service</h2>
          <Button onClick={providerCommit}>test</Button>
        </Container>
      </>
    );
  }
};

export default ProviderConfirm;
