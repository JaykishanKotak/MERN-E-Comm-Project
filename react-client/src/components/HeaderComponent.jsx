import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Form,
  Dropdown,
  DropdownButton,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
const HeaderComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">Super Commerce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <InputGroup>
                <DropdownButton id="dropdown-basic-button" title="All">
                  <Dropdown.Item>Books</Dropdown.Item>
                  <Dropdown.Item>Electronics</Dropdown.Item>
                  <Dropdown.Item>Toys</Dropdown.Item>
                </DropdownButton>
                <Form.Control type="text" placeholder="Search in shop ..." />
                <Button variant="warning">
                  <i className="bi bi-search-heart text-dark"></i>
                </Button>
              </InputGroup>
            </Nav>
            <Nav>
              <LinkContainer to="/admin/orders">
                <Nav.Link>
                  Admin
                  {/*To Indicate Admin For New Chat*/}
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                </Nav.Link>
              </LinkContainer>
              {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}
              <NavDropdown title="John Doe" id="collasible-nav-dropdown">
                {/*Event Key Highlits the Tab*/}
                <NavDropdown.Item
                  eventKey="/user/my-orders"
                  as={Link}
                  to="/user/my-orders"
                >
                  My Orders
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
                {/*<NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                            Separated link</NavDropdown.Item>*/}
              </NavDropdown>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart-page">
                <Nav.Link>
                  <Badge pill bg="danger">
                    2
                  </Badge>
                  <i className="bi bi-bag-heart"></i>
                  <span className="ms-1">Cart</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
