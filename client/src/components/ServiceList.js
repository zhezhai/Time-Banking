import React, { useState, useEffect } from "react";
import { TBContext } from "../context/context";
import Service from "./Service";
import styled from 'styled-components'

const ServiceList = () => {
  const { providers, setProviders } = React.useContext(TBContext);

  useEffect(() => {
    const data = localStorage.getItem("provider_info");
    setProviders(JSON.parse(data));
  }, []);

  if (providers) {
    return (
      <div className="section-center">
        {/* {providers != null ? (
        providers.map((provider) => {
          return <Service key={provider.id} id={provider.id} provider_info={provider} />;
        })
      ) : (
        
      )} */}
        <Service provider_info={providers} />
      </div>
    );
  }

  return (
    <div className='container'>
      <h2>there is no information</h2>
    </div>
  );
};

const Wrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
  }
`

export default ServiceList;
