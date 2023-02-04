import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserOrdersPage = () => {
  return (
    <>
      <Row className="m-5">
        <Col md={12}>
          <h1>My Orders</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Delivered</th>
                <th>Order Details</th>
              </tr>
            </thead>
            <tbody>
              {["bi bi-check2 text-success", "bi bi-x text-danger"].map(
                (item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>Mark Twain</td>
                    <td>2023-01-01</td>
                    <td>$123</td>
                    <td>
                      <i className={item}></i>
                    </td>
                    <td>
                      <Link to="/user/order-details"> Go to Order Details</Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default UserOrdersPage;
