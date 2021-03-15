import React from "react";
import { Container } from "react-bootstrap";
import { RegisterForm } from "../components";

const Register = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ minWidth: "200px" }}>
        <RegisterForm />
      </div>
    </Container>
  );
};

export default Register;
