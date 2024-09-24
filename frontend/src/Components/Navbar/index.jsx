import React from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toggleSortByPrice, setSearchQuery } from "../../store/reducer/product";
import { useSelector, useDispatch } from "react-redux";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.products);

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Product Listing App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/cart"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Button
              variant="outline-success"
              onClick={() => dispatch(toggleSortByPrice())}
            >
              Sort
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
