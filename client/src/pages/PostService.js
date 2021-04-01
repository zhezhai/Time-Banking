import React, { useRef, useState, useEffect } from "react";
import { Navbar } from "../components/index";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { axiosNode, axiosFlask } from "../helpers/axios";
import cookie from "react-cookies";
import { Card, Form, Button, Container } from "react-bootstrap";

const PostService = () => {
  const serviceInfoRef = useRef();
  const priceRef = useRef();
  const contractRef = useRef();
  const characterRef = useRef();

  const [contracts, setContracts] = useState([]);

  const postService = () => {
    if (characterRef.current.value === "provider") {
      axiosNode
        .post("/createProvider", {
          post_type: characterRef.current.value,
          service_info: serviceInfoRef.current.value,
          price: priceRef.current.value,
          contract_address: contractRef.current.value,
        })
        .then((response) => {
          console.log(response);
        });
      axiosNode
        .post("/alterContract", {
          status: 1,
          contract_addr: contractRef.current.value,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
    if (characterRef.current.value === "recipient") {
      axiosNode
        .post("/createRecipient", {
          post_type: characterRef.current.value,
          service_info: serviceInfoRef.current.value,
          price: priceRef.current.value,
          contract_address: contractRef.current.value,
        })
        .then((response) => {
          console.log(response);
        });
      axiosNode
        .post("/alterContract", {
          status: 1,
          contract_addr: contractRef.current.value,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  const registerService = () => {
    const user = cookie.load("user");
    if (characterRef.current.value === "recipient") {
      axiosFlask
        .post("/registerService", {
          contract_addr: contractRef.current.value,
          client_addr: user.address,
          op_state: 1,
          service_info: serviceInfoRef.current.value,
        })
        .then((response) => {
          if (response.data.registerService === "Succeed") {
            window.alert("recipient post successful!");
          } else {
            window.alert("service post failed!");
          }
        });
    }
    if (characterRef.current.value === "provider") {
      axiosFlask
        .post("/registerService", {
          contract_addr: contractRef.current.value,
          client_addr: user.address,
          op_state: 2,
          service_info: serviceInfoRef.current.value,
        })
        .then((response) => {
          if (response.data.registerService === "Succeed") {
            window.alert("provider post successful!");
          } else {
            window.alert("service post failed!");
          }
        });
    }
  };

  const aviliableContract = () => {
    axiosNode.get("/showContracts").then((response) => {
      console.log(response.data.result);
      setContracts(response.data.result);
    });
  };

  useEffect(() => {
    aviliableContract();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Card>
          <Card.Body>
            <Form>
              <h2 className="text-center mb-4">PostService</h2>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>You are:</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  ref={characterRef}
                >
                  <option>Choose...</option>
                  <option>provider</option>
                  <option>recipient</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>service info</Form.Label>
                <Form.Control
                  type="text"
                  ref={serviceInfoRef}
                  name="serviceInfo"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>price</Form.Label>
                <Form.Control type="text" ref={priceRef} name="price" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>aviliable contract</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  ref={contractRef}
                >
                  <option>Choose...</option>
                  {contracts.map((contract, index) => {
                    return (
                      <option key={contract.id}>
                        {contract.contract_address}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  postService();
                  registerService();
                }}
                style={{ margin: "1rem" }}
              >
                post service
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PostService;
