import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { Container, Card, ListGroup } from "react-bootstrap";
import cookie from "react-cookies";
import { axiosNode, axiosFlask } from "../helpers/axios";
import axios from "axios";

const MyInfo = () => {
  const user = cookie.load("user");
  const [userInfo, setUserInfo] = useState({});
  const showInfo = () => {
    axiosFlask
      .get("/TB/api/v1.0/getAccount", {
        params: {
          addr: user.address,
        },
      })
      .then((response) => {
        setUserInfo(response.data.data);
      });
  };

  useEffect(() => {
    showInfo();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center">
        <Card style={{ margin: "2rem" }}>
          <Card.Title>My Information</Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>name: {user.name}</ListGroup.Item>
              <ListGroup.Item>my address: {user.address}</ListGroup.Item>
              <ListGroup.Item>balance: {userInfo.balance}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default MyInfo;
