import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import FaceIcon from "@material-ui/icons/Face";
import PublicNavBar from "../components/PublicNavBar";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatarUrl: "",
  });

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2, avatarUrl } = formData;
    if (name === "" || email === "" || password === "" || password2 === "") {
      alert("Please input all required information");
      return;
    }

    if (password !== password2) {
      alert("Password does not match");
      return;
    }
    // TODO: handle Register
    dispatch(authActions.register(name, email, password, avatarUrl));
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
      },
      function (error, result) {
        if (error) console.log(error);
        if (result && result.length && !error) {
          setFormData({
            ...formData,
            avatarUrl: result[0].secure_url,
          });
        }
      }
    );
  };

  return (
    <div>
      <PublicNavBar />
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="text-center mb-3">
              <h1 className="text-danger"> Sign Up</h1>
              <span>It’s quick and easy.</span> <FaceIcon />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <div className="text-center"></div>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </Form.Group>

              {formData.avatarUrl && (
                <div className="mb-3">
                  <img
                    height="50%"
                    width="50%"
                    src={formData.avatarUrl}
                    className="avatar-lg"
                    alt="avatar"
                  />
                </div>
              )}
              <Button
                variant="danger"
                onClick={uploadWidget}
                sm={3}
                className="mb-3"
              >
                Upload profile picture
              </Button>

              {loading ? (
                <Button
                  className="btn-block"
                  variant="primary"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </Button>
              ) : (
                <Button
                  className="btn-block"
                  type="submit"
                  variant="primary"
                  sm={6}
                >
                  Register
                </Button>
              )}

              <p className="mt-2">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
