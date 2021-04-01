import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { Container, Card, ListGroup } from "react-bootstrap";
import cookie from "react-cookies";
import { axiosNode } from "../helpers/axios";

const MyInfo = () => {
  const user = cookie.load("user");
  const [userInfo, setUserInfo] = useState([]);

  const showInfo = () => {
    axiosNode
      .get("/getUser", {
        params: {
          username: user.name,
        },
      })
      .then((response) => {
        console.log(response.data.result[0]);
        setUserInfo(response.data.result[0]);
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
              <ListGroup.Item>name: {userInfo.name}</ListGroup.Item>
              <ListGroup.Item>my address: {userInfo.address}</ListGroup.Item>
              <ListGroup.Item>balance: {userInfo.balance}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default MyInfo;
