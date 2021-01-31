import React, { useState } from "react";
import { Alert, Form, Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../containers/LoginPage";
import AdminPage from "./Admin/AdminPage";
import userActions from "../redux/actions/users.actions"
import { queryAllByPlaceholderText } from "@testing-library/react";

const RegisterPage = () => {
  const registered = useSelector((state) => state.user.registered);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [show, setShow] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const dispatch = useDispatch();
  const formSubmit = (e) => {
    if (password === confirmPass) {
      e.preventDefault(); 
      console.log(avatarUrl[0])
      dispatch(userActions.register(avatarUrl, name, email, password))
      console.log('formSubmit is working')
    } else {
      // showAlert()
      console.log(password)
      console.log(confirmPass)
    }
    dispatch(userActions.register(avatarUrl, name, email, password))
    
  }
  

  // const showAlert = () => { return (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
  //       <Alert.Heading>Confrim Password</Alert.Heading>
  //       <p>Please confrim your password again</p>
  //     </Alert>)}

  const addImage = () => {window.cloudinary.openUploadWidget(
    {
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
    },
    function (error, result) {
      if (result && result.length) {
        setAvatarUrl(result[0].secure_url);
        console.log(avatarUrl)
      }});}
  
  if (!registered) {
    return (
      <div>
        <Container className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col xs={6}>
              <Form onSubmit={(e)=> {e.preventDefault(); formSubmit(e)}}>
                <Row className="justify-content-md-center">
                  <Form.File id="formcheck-api-regular">
                    <Form.File.Label>Upload Avatar Url</Form.File.Label>
                    <Button onClick={()=>{addImage()}}>Add Image</Button>
                  </Form.File>
                </Row>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </Form.Group>

                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>

                <Form.Group controlId="formGroupConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="confirmPassword" placeholder="Confirm Password" value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                </Form.Group>

                <Form.Group controlId="formGroupName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </Form.Group>

                <Button variant="dark" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else if (!isAuthenticated && registered) {
    return (
      <div>
        <LoginPage />
      </div>
    );
  }
};

export default RegisterPage;
