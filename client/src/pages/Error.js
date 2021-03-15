import Axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TBContext } from "../context/context";
import accounts from "../context/data/accounts";
import Navbar from "../components/Navbar";

const Error = ({ initAccount, getAccount, setAccount }) => {
  return (
    <>
      <h2>Error</h2>
    </>
  );
};

export default Error;
