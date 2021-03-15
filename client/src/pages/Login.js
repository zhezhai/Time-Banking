import React from 'react'
import {LoginForm} from '../components'
import {Container} from 'react-bootstrap'

const Login = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ minWidth: "200px" }}>
        <LoginForm />
      </div>
    </Container>
  )
    
};

export default Login;
