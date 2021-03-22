import React, { useEffect, useState } from "react";
import { Navbar } from "../components/index";
import { Card, Button, ListGroup, Container } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { axiosNode, axiosFlask } from "../helpers/axios";
import cookie from "react-cookies";

const MyService = () => {
  const location = useLocation();
  const [recipients, setRecipients] = useState([]);
  const user = cookie.load("user");
  const history = useHistory();

  const recipientList = () => {
    axiosNode.get("/showRecipients").then((response) => {
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
        const results = response.data;
        const filtered_result = results.filter(
          (result) => result.recipient_status === 0
        );
        if (filtered_result.length === 0) {
          console.log("there is no data");
          setRecipients([
            {
              provider_name: "empty",
              recipient_service: "empty",
              recipient_price: "empty",
            },
          ]);
        } else {
          if (user.name !== filtered_result[0].recipient_name) {
            setRecipients([
              {
                provider_name: "empty",
                recipient_service: "empty",
                recipient_price: "empty",
              },
            ]);
          } else {
            setRecipients(filtered_result);
          }
        }
      }
    });
  };

  const updateRecipient = () => {
    axiosFlask
      .post("/TB/api/v1.0/registerService", {
        client_addr: user.address,
        op_state: 1,
        service_info: recipients[0].recipient_service,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const recipientDeposit = () => {
    axiosFlask
      .post("/TB/api/v1.0/negotiateService", {
        client_addr: user.address,
        op_state: 1, //recipient deposit time currency
        time_currency: recipients[0].recipient_price,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const call = () => {
    updateRecipient();
    setTimeout(() => {
      recipientDeposit();
    }, 500);
    setTimeout(() => {
      window.alert("wait for provider confirm");
    }, 1000)
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
