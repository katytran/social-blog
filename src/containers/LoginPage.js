import React, {useEffect} from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import PublicNavBar from "../components/PublicNavBar";
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import HomePage from './HomePage'

const LoginPage = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();
  // useEffect(()=>{
  //   if(isAuthenticated) {
  //     history.push("/admin")
  //   }
  // }, [isAuthenticated])
  console.log(isAuthenticated)
  if(!isAuthenticated){
  return (
    <div>
      <Container className="mt-5">
        <h1>Sign In</h1>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );}
  else {
    return <div><HomePage/></div>
  }
};

export default LoginPage;
