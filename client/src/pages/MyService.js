import React, { useEffect, useState } from "react";
import { Navbar } from "../components/index";
import { Card, Button, ListGroup, Container } from "react-bootstrap";
import { TBContext } from "../context/context";
import { Link, useLocation, useHistory } from "react-router-dom";
import Axios from "axios";
import cookie from "react-cookies";

const MyService = () => {
  const {} = React.useContext(TBContext);
  const location = useLocation();
  const [recipients, setRecipients] = useState([]);
  const user = cookie.load("user");
  const history = useHistory();

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
        if (user.name !== response.data[0].recipient_name) {
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
      }
    });
  };

  const updateRecipient = () => {
    Axios.post("http://localhost:80/TB/api/v1.0/registerService", {
      client_addr: user.address,
      op_state: 1,
      service_info: recipients[0].recipient_service,
    }).then((response) => {
      console.log(response);
    });
  };

  const recipientDeposit = () => {
    Axios.post("http://localhost:80/TB/api/v1.0/negotiateService", {
      client_addr: user.address,
      op_state: 1, //recipient deposit time currency
      time_currency: recipients[0].recipient_price,
    }).then((response) => {
      console.log(response);
    });
  };

  const call = () => {
    updateRecipient();
    recipientDeposit();
    history.push("/payment");
  };


  useEffect(() => {
    recipientList();
  }, [recipients]);

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
                <Button onClick={call}>buy service</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default MyService;
