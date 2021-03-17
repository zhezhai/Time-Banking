import React, { useEffect, useState } from "react";
import { Navbar } from "../components/index";
import { Card, Button, ListGroup, Container } from "react-bootstrap";
import { TBContext } from "../context/context";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

const MyService = () => {
  const {} = React.useContext(TBContext);
  const location = useLocation();
  const [recipients, setRecipients] = useState([]);

  const recipientList = () => {
    Axios.get("http://localhost:3001/showRecipients").then((response) => {
      if (response.data == "empty recipient list") {
        console.log("there is no data");
        setRecipients([
          {
            provider_name: "empty",
            recipient_service: "empty",
            recipient_price: "empty",
          },
        ]);
      } else {
        setRecipients(response.data);
      }
      // setRecipients(response.data);
      // console.log(response.data);
    });
  };

  useEffect(() => {
    recipientList();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center">
        {recipients.map((recipient, index) => {
          return (
            <Card key={index}>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    name: {recipient.provider_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    service: {recipient.recipient_service}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    price: {recipient.recipient_price}
                  </ListGroup.Item>
                </ListGroup>
                <Button>buy service</Button>
              </Card.Body>
            </Card>
          );
        })}
        {/* <ListGroup>
              <ListGroup.Item>name: {}</ListGroup.Item>
              <ListGroup.Item>service_info: {}</ListGroup.Item>
              <ListGroup.Item>price: {}</ListGroup.Item>
            </ListGroup> */}
      </Container>
    </>
  );
};

export default MyService;
