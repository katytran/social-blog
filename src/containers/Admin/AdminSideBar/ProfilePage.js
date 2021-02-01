import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../../../redux/actions/auth.actions";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  // const name = useSelector(state=>state.auth.user.name)
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  // const avatarUrl = useSelector(state => state.auth.user.avatarUrl)

  useEffect(() => {
    dispatch(authActions.getCurrentUser());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(authActions.updateProfile(name, avatarUrl));
    setEditable(false);
  };

  const handleCancel = (e) => {
    setEditable(false);
  };
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["socialBlog", "userAvatar"],
      },
      function (error, result) {
        if (error) console.log(error);
        if (result && result.length && !error) {
          setAvatarUrl(result[0].secure_url);
        }
      }
    );
  };

  return (
    <div>
      <Container style={{ width: "50%" }}>
        <h1>Profile Page</h1>
        <Row>
          <Col className="d-flex justify-content-end align-items-start">
            <Button
              variantv="primary"
              onClick={(e) => {
                e.preventDefault();
                setEditable(true);
              }}
            >
              ✎ Edit
            </Button>
          </Col>
        </Row>

        <Row className="row-content">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group>
              {avatarUrl && (
                <img className="avatar_pf" src={avatarUrl} alt="avatarUrl" />
              )}
            </Form.Group>
            <Button
              className="mb-4"
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                uploadWidget();
              }}
              disabled={!editable}
            >
              Edit Avatar
            </Button>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className="form-input"
                  type="text"
                  required
                  placeholder={useSelector((state) => state.auth.user.name)}
                  name="name"
                  value={name}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                  disabled={!editable}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  className="form-input"
                  type="email"
                  placeholder={useSelector((state) => state.auth.user.email)}
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            {editable && (
              <ButtonGroup>
                <Button className="mr-3" variant="primary" type="submit">
                  Submit
                </Button>
                <Button
                  variant="light"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCancel();
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
