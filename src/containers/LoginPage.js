import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import PublicNavBar from "../components/PublicNavBar";
import { useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //const history = useHistory();

  if (!isAuthenticated) {
    return (
      <div>
        <PublicNavBar />
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <div className="text-center mb-3">
              <h1 className="text-danger"> Welcome back</h1>
              <span>
                Sign in now to post blogs and catch up on Tweets from the people
                you follow
              </span>{" "}
              <FaceIcon />
            </div>
            <Col xs={6}>
              <LoginForm />
            </Col>
          </Row>
          <span>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </span>
        </Container>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default LoginPage;
