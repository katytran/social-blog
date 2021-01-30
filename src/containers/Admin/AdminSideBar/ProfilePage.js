import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {useSelector} from 'react-redux'

const ProfilePage = () => {
const name = useSelector(state=>state.user.name)
const email = useSelector(state=>state.user.email)
  return (
    <div>
      <Container>
        <h1>Profile Page</h1>
        <Row>
            <Col>
            <Form>
  <div className="mb-3">
    <Form.File id="formcheck-api-custom" custom>
      <Form.File.Input isValid />
      <Form.File.Label data-browse="Button text">
        Custom file input
      </Form.File.Label>
      <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
    </Form.File>
  </div>
  <div className="mb-3">
    <Form.File id="formcheck-api-regular">
      <Form.File.Label>Regular file input</Form.File.Label>
      <Form.File.Input />
    </Form.File>
  </div>
</Form>
            </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="email@example.com"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="password" placeholder="Password" />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
