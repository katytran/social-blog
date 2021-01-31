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
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatarUrl: currentUser.avatarUrl,
  });
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)

  useEffect(() => {
    dispatch(authActions.getCurrentUser());
  }, [dispatch]);

  const handleSubmit = (e) => {
    const { name, avatarUrl } = profileData;
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
          setProfileData({
            ...profileData,
            avatarUrl: result[0].secure_url,
          });
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
            <Button variantv="primary" onClick={(e) => {e.preventDefault(); setEditable(true)}}>
              ✎ Edit
            </Button>
          </Col>
        </Row>

        <Row className="row-content">
          <Form onSubmit={(e)=> {e.preventDefault(); handleSubmit()}}>
            <Form.Group>
              {profileData.avatarUrl && (
                <img
                  className="avatar_pf"
                  src={profileData.avatarUrl}
                  alt="avatarUrl"
                />
              )}
            </Form.Group>
            <Button
              className="mb-4"
              variant="primary"
              onClick={(e)=> {e.preventDefault(); uploadWidget()}}
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
                  placeholder="Name"
                  name="name"
                  value={profileData.name}
                  onChange={(e)=>{setName(e.target.value)}}
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
                  placeholder={profileData.email}
                  name="email"
                  value={profileData.email}
                  disabled={!editable}
                />
              </Col>
            </Form.Group>
            {editable && (
              <ButtonGroup>
                <Button className="mr-3" variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="light" onClick={(e)=>{e.preventDefault(); handleCancel()}}>
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
