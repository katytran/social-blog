
import React, { useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LoginPage from "../containers/LoginPage";
import AdminPage from "../containers/Admin/AdminPage";
import ProfilePage from "../containers/Admin/AdminSideBar/ProfilePage";
import { useSelector } from "react-redux";
import logo from '../images/logo.png'

const PublicNavBar = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    return isAuthenticated;
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" style={{backgroundColor:"#dffaf9"}} variant="light">
        <Navbar.Brand as={Link} to="/">
          <img style={{height:'4.5em'}}src={logo} atl="logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* USE THESE FOR SPECIAL SORTING FEATURES IF POSSIBLE
            <Nav.Link href=""></Nav.Link>
            <Nav.Link href=""></Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>

          {!isAuthenticated ? (
            <Nav>
              <Nav.Link eventKey={"register"} as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link eventKey={"login"} as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link eventKey={"admin"} as={Link} to="/admin">
                Admin
              </Nav.Link>
              <Nav.Link
                eventKey={"logout"}
                as={Link}
                to="/login"
                onClick={() => {
                  isAuthenticated = false;
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default PublicNavBar;
