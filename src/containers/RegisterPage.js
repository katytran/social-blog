import React from "react";
import { Form, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoginPage from "../containers/LoginPage";
import AdminPage from "./Admin/AdminPage";

const RegisterPage = () => {
  const registered = useSelector((state) => state.user.registered);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //useState here with names, email,
  //useDispatch to make the put request

  if (!registered) {
    return (
      <div>
        <Container className="justify-content-md-center">
          <Col xs={6}>
            <Form>
              <Row>
                <Form.File id="formcheck-api-custom" custom>
                  <Form.File.Input isValid />
                  <Form.File.Label data-browse="Button text">
                    Custom file input
                  </Form.File.Label>
                  <Form.Control.Feedback type="valid">
                    You did it!
                  </Form.Control.Feedback>
                </Form.File>
                <Form.File id="formcheck-api-regular">
                  <Form.File.Label>Regular file input</Form.File.Label>
                  <Form.File.Input />
                </Form.File>
              </Row>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Col>
        </Container>
      </div>
    );
    // } else if (registered && isAuthenticated) {
    //   return <div><AdminPage/></div>
  } else if (!isAuthenticated && registered) {
    return (
      <div>
        <LoginPage />
      </div>
    );
  }
};

export default RegisterPage;
