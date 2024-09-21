import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavbarComponent = ({onSort,onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/">Product Listing App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
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
            <Button variant="outline-success" onClick={onSort}>Sort</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
