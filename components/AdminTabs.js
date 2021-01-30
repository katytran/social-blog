import React from "react";
import { Container, Col, Row, Tab, Nav } from "react-bootstrap";
import ProfilePage from "../containers/Admin/AdminSideBar/ProfilePage";
import BlogTablePage from "../containers/Admin/AdminSideBar/BlogTablePage";
import FriendsPage from "../containers/Admin/AdminSideBar/FriendsPage";
import MessengerPage from "../containers/Admin/AdminSideBar/MessengerPage";

const AdminTabs = () => {
  return (
    <div>
      <Tab.Container id="adminPage" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="a">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="b">Blogs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="c">Friends</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="d">Messenger</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="a">
                <ProfilePage />
              </Tab.Pane>
              <Tab.Pane eventKey="b">
                <BlogTablePage />
              </Tab.Pane>
              <Tab.Pane eventKey="c">
                <FriendsPage />
              </Tab.Pane>
              <Tab.Pane eventKey="d">
                <MessengerPage />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default AdminTabs;
