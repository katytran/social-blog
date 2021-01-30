import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import {useDispatch} from "react-redux"
import authActions from '../redux/actions/auth.actions'

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  return (
    <div>
      <Form onSubmit={(e) => {e.preventDefault();dispatch(authActions.login(email, password))}}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
        </Form.Group>
        <Button className="mt-4" style={{width:"100%"}}variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
