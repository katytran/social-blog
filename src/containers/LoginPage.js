import React, {useEffect} from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import PublicNavBar from "../components/PublicNavBar";
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import AdminPage from './Admin/AdminPage'

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
      <Container>
        <h1>LOGIN</h1>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );}
  else {
    return <div><AdminPage/></div>
  }
};

export default LoginPage;
