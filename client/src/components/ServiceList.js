import React, { useState, useEffect } from "react";
import { TBContext } from "../context/context";
import Service from "./Service";

const ServiceList = () => {
  const { service, setService } = React.useContext(TBContext);

  return (
    <div className="section-center">
      {service.map((menuItem) => {
        return <Service key={menuItem.id} menuItem={menuItem} />;
      })}
    </div>
  );
};

export default ServiceList;
