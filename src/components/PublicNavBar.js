import React, { useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LoginPage from "../containers/LoginPage";
import AdminPage from "../containers/Admin/AdminPage";
import ProfilePage from "../containers/Admin/AdminSideBar/ProfilePage";
import { useSelector, useDispatch } from "react-redux";
import logo from "../images/logo.png";
import authActions from "../redux/actions/auth.actions";

const PublicNavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authActions.logout());
  };

  const publicNav = (
    <Nav>
      <Nav.Link eventKey={"register"} as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link eventKey={"login"} as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  const authNav = (
    <Nav>
      <Nav.Link eventKey={"admin"} as={Link} to="/admin">
        Admin
      </Nav.Link>
      <Nav.Link eventKey={"logout"} as={Link} to="/" onClick={logout}>
        Logout
      </Nav.Link>
    </Nav>
  );

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#dffaf9" }}
        variant="light"
      >
        <Navbar.Brand as={Link} to="/">
          <img style={{ height: "4.5em" }} src={logo} atl="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!loading && <>{isAuthenticated ? authNav : publicNav}</>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default PublicNavBar;

{
  /* USE THESE FOR SPECIAL SORTING FEATURES IF POSSIBLE
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
            </NavDropdown> */
}
