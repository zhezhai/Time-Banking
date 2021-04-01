import React, { useEffect, useState } from "react";
import { axiosNode, axiosFlask } from "../helpers/axios";
import { useHistory } from "react-router-dom";
import cookie from "react-cookies";
import {
  Button,
  Card,
  Navbar,
  Nav,
  ListGroup,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";

const Supervisor = () => {
  const history = useHistory();
  const [address, setAddress] = useState();
  const [iAddress, setIAddress] = useState();
  const [gInfo, setGInfo] = useState({ uid: "", balance: "", status: "" });
  const [sInfo, setSInfo] = useState({ address: "", status: "", balance: "" });

  const [serviceInfo, setServiceInfo] = useState({
    dealer_uid: "",
    dealer_balance: "",
    provider_vid: "",
    provider_serviceinfo: "",
    provider_status: "",
    recipient_vid: "",
    recipient_serviceinfo: "",
    recipient_status: "",
  });

  const getService = async () => {
    const response = await axiosFlask.get("/TB/api/v1.0/getService");
    setServiceInfo({
      dealer_uid: response.data.data.dealer.uid,
      dealer_balance: response.data.data.dealer.balance,
      provider_vid: response.data.data.provider.vid,
      provider_serviceinfo: response.data.data.provider.serviceinfo,
      provider_status: response.data.data.provider.status,
      recipient_vid: response.data.data.recipient.vid,
      recipient_serviceinfo: response.data.data.recipient.serviceinfo,
      recipient_status: response.data.data.recipient.status,
    });
    console.log(response.data);
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <Nav className="mr-auto ">
          <Nav.Link>
            <Button
              onClick={() => {
                axiosNode.get("/logout").then((response) => {
                  console.log(response.data);
                  cookie.remove("admin");
                  history.push("/login");
                });
              }}
            >
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container style={{ margin: "2rem" }}>
        <Row>
          <Col>
            <Card style={{ width: "26rem" }}>
              <Card.Body>
                <Form>
                  <Form.Group id="init_account">
                    <Form.Label style={{ margin: "1rem" }}>
                      Enter Account Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Button
                    style={{ margin: "1rem" }}
                    onClick={() => {
                      axiosFlask
                        .post("/TB/api/v1.0/initAccount", {
                          client_addr: address,
                        })
                        .then((response) => console.log(response.data));
                    }}
                  >
                    init account
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: "26rem" }}>
              <Card.Body>
                <Form>
                  <Form.Group id="get_account"></Form.Group>
                  <Form.Label style={{ margin: "1rem" }}>
                    Enter Account Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      axiosFlask
                        .get("/TB/api/v1.0/getAccount", {
                          params: {
                            addr: address,
                          },
                        })
                        .then((response) => {
                          console.log(response.data);
                          setGInfo({
                            uid: response.data.data.uid,
                            balance: response.data.data.balance,
                            status: response.data.data.status,
                          });
                        });
                    }}
                  >
                    get account
                  </Button>
                </Form>
                <ListGroup variant="flush">
                  <ListGroup.Item>uid: {gInfo.uid}</ListGroup.Item>
                  <ListGroup.Item>balance: {gInfo.balance}</ListGroup.Item>
                  <ListGroup.Item>status: {gInfo.status}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: "26rem" }}>
              <Card.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    axiosFlask
                      .post("/TB/api/v1.0/setAccount", {
                        client_addr: sInfo.address,
                        status: Number(sInfo.status),
                        balance: Number(sInfo.balance),
                      })
                      .then((response) => {
                        console.log(response.data);
                      });
                  }}
                >
                  <Form.Group>
                    <Form.Label>Enter Address</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setSInfo({ ...sInfo, address: e.target.value });
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Enter status</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setSInfo({ ...sInfo, status: e.target.value });
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Enter balance</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setSInfo({ ...sInfo, balance: e.target.value });
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit">set account</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Card style={{ margin: "1rem" }}>
            <Card.Body>
              <Button
                onClick={() => {
                  axiosFlask
                    .get("/TB/api/v1.0/initService")
                    .then((response) => {
                      console.log(response.data);
                    });
                }}
              >
                Init Service
              </Button>
              <Button onClick={getService}>get Service</Button>
            </Card.Body>
          </Card>
        </Row>

        <Row>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  dealer_uid: {serviceInfo.dealer_uid}
                </ListGroup.Item>
                <ListGroup.Item>
                  dealer_balance: {serviceInfo.dealer_balance}
                </ListGroup.Item>
                <ListGroup.Item>
                  provider_vid: {serviceInfo.provider_vid}
                </ListGroup.Item>
                <ListGroup.Item>
                  provider_serviceInfo:{serviceInfo.provider_serviceinfo}
                </ListGroup.Item>
                <ListGroup.Item>
                  provider_status: {serviceInfo.provider_status}
                </ListGroup.Item>
                <ListGroup.Item>
                  recipient_vid: {serviceInfo.recipient_vid}
                </ListGroup.Item>
                <ListGroup.Item>
                  recipient_serviceInfo: {serviceInfo.recipient_serviceinfo}
                </ListGroup.Item>
                <ListGroup.Item>
                  recipient_status: {serviceInfo.recipient_status}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Supervisor;
