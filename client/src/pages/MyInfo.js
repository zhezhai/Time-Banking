import React from "react";
import { Navbar } from "../components";
import { Container, Card, ListGroup } from "react-bootstrap";
import cookie from "react-cookies";

const MyInfo = () => {
  const user = cookie.load("user");

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
              <ListGroup.Item>balance: {user.balance}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default MyInfo;
