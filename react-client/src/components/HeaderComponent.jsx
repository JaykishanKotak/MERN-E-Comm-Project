import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories } from "../redux/actions/categoryActions";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import {
  setChatRooms,
  setSocket,
  setMessageReceived,
  removeChatRoom,
} from "../redux/actions/chatActions";
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const { categories } = useSelector((state) => state.getCategories);
  //const { itemCount } = useSelector((state) => state.cart.itemCount);
  //const cart = useSelector((state) => state.cart);
  //console.log("item count", cart.itemCount);
  //const itemCounter = Number(cart.itemCount) || 0;
  const itemCount = useSelector((state) => state.cart.itemCount);
  const { messageReceived } = useSelector((state) => state.adminChat);
  //console.log("data", userInfo);
  const navigate = useNavigate();
  //Highlight category in header
  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  //Search in header
  const [searchQuery, setSearchQuery] = useState("");
  //Call category action here
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  //For search
  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    console.log(searchQuery);
    //Remove space from left and right
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(
          `/product-list/category/${searchCategoryToggle.replaceAll(
            "/",
            ","
          )}/search/${searchQuery}`
        );
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(
        `/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
      );
    } else {
      navigate("/product-list");
    }
  };

  //For socket
  useEffect(() => {
    if (userInfo.isAdmin) {
      //Notification Audio
      var audio = new Audio("/audio/chat-msg.mp3");
      //Listen message here
      const socket = socketIOClient();
      //If admin is logged in
      //Genrating rendom admin names
      socket.emit(
        "admin connected with server",
        "Admin" + Math.floor(Math.random() * 1000000000000)
      );
      //prettier-ignore
      socket.on(
        "server sends message from client to admin",
        ({message, user}) => {
          console.log("Before dispatch", message);
          console.log("Before dispatch2", user);

          //For chats coming from admin
          dispatch(setSocket(socket));
          //console.log(message);
          //Sample conversatoin data
          //fddf54gfgfSocketID is socket id
          //   let chatRooms = {
          //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
          //   };
          console.log("in header", user);
          dispatch(setChatRooms(user, message));
          //For admin messahe red icon
          dispatch(setMessageReceived(true));
          //Play The Notiifaction Audio
          audio.play();
        }
      );
      //If admin disconnect
      socket.on("disconnected", ({ reason, socketId }) => {
        //console.log(reason, socketId);
        //We're not using reason here
        dispatch(removeChatRoom(socketId));
      });
      return () => socket.disconnect();
    }
  }, [userInfo.isAdmin, dispatch]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">BEST ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton
                id="dropdown-basic-button"
                title={searchCategoryToggle}
              >
                <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>
                  All
                </Dropdown.Item>
                {categories.map((category, id) => (
                  <Dropdown.Item
                    key={id}
                    onClick={() => setSearchCategoryToggle(category.name)}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
                {/* <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Cars</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>*/}
              </DropdownButton>
              <Form.Control
                type="text"
                onKeyUp={submitHandler}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in shop ..."
              />
              <Button onClick={submitHandler} variant="warning">
                <i className="bi bi-search text-dark"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo.isAdmin ? (
              <LinkContainer to="/admin/orders">
                <Nav.Link>
                  Admin
                  {messageReceived && (
                    <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                  )}
                </Nav.Link>
              </LinkContainer>
            ) : userInfo.firstName && !userInfo.isAdmin ? (
              <NavDropdown
                title={`${userInfo.firstName} ${userInfo.lastName}`}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  eventKey="/user/my-orders"
                  as={Link}
                  to="/user/my-orders"
                >
                  My orders
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                  My profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/cart-page">
              <Nav.Link>
                <Badge pill bg="danger">
                  {itemCount === 0 ? "" : itemCount}
                </Badge>
                <i className="bi bi-cart-dash"></i>
                <span className="ms-1">CART</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
