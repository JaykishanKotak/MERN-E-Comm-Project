import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { logout } from "../../../redux/actions/userActions";
const OrdersPageComponent = ({ getOrders }) => {
  const [orders, setOrders] = useState([]);
  //const [orderDeleted , setOrderDeleted] = useState(false);
  const dispatch = useDispatch;
  useEffect(() => {
    const abctrl = new AbortController();
    getOrders(abctrl)
      .then((orders) => setOrders(orders))
      .catch(
        (er) => dispatch(logout())
        //console.log(
        //er.response.data.message ? er.response.data.message : er.response.data
        //)
        //console.log(er)
      );
    return () => abctrl.abort;
  }, []);
  console.log("orders", orders);
  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>Admin Orders</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Delivered</th>
                <th>Payment Method</th>

                <th>Order Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {item.user != null ? (
                      <>
                        {item.user.firstName} {item.user.lastName}
                      </>
                    ) : null}
                  </td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  <td>${item.orderTotal.cartSubtotal}</td>
                  <td>
                    {item.isDelivered ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>{item.paymentMethod}</td>
                  <td>
                    <Link to={`/admin/order-details/${item._id}`}>
                      Go to Order Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default OrdersPageComponent;
