import React, { useRef, useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {axiosNode, axiosFlask} from "../helpers/axios";

const Signup = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();
  const [log, setLog] = useState();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    axiosNode
      .get("/user_list", {
        params: {
          name: nameRef.current.value,
        },
      })
      .then((response) => {
        if (
          response.data === "no user" ||
          response.data === "no matched user from database"
        ) {
          axiosNode
            .post("/register", {
              name: nameRef.current.value,
              password: passwordRef.current.value,
              address: addressRef.current.value,
            })
            .then((response) => {
              console.log(response.data);
              history.push("/login");
            });
        } else {
          console.log(response.data);
          setLog("user already exist");
        }
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group id="name">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
              {!log ? (
                <Form.Text className="text-muted">
                  please enter your username
                </Form.Text>
              ) : (
                <Form.Text className="text-muted">{log}</Form.Text>
              )}
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
              <Form.Text className="text-muted">
                Password should be at least 4 characters
              </Form.Text>
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" ref={addressRef} required />
              <Form.Text className="text-muted">
                please enter your address
              </Form.Text>
            </Form.Group>
            <Row>
              <Col>
                <Button className="w-100" type="submit">
                  Sign Up
                </Button>
              </Col>
              <Col>
                <Link to="/login">
                  <Button className="w-100">Login</Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Signup;
