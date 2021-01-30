import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const RegisterPage = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center">
        <Col md={6}>
          <Form>
            <div>
              Create a New Account
              <br /> It’s quick and easy
            </div>

            <button> Add Profile Picture</button>

            <Form.Group controlId="formGroupEmail">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default RegisterPage;
