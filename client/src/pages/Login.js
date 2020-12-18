import React from "react";
import {Link} from 'react-router-dom'
import {styled} from 'styled-components'

const Login = () => {
  return (
    <div>
      <h1>login page</h1>
      <Link to = '/' >return Dashboard</Link>
    </div>
  );
};

export default Login;