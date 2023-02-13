import React from "react";
import axios from "axios";
import ProductsPageComponent from "./components/ProductsPageComponent";

const fetchProducts = async (abctrl) => {
  const { data } = await axios.get("/api/products/admin", {
    signal: abctrl.signal,
  });
  console.log(data.orders);
  return data.orders;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data;
};

const AdminProductsPage = () => {
  //fetchProducts();
  return (
    <>
      <ProductsPageComponent
        fetchProducts={fetchProducts}
        deleteProduct={deleteProduct}
      />
      {/*<Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>
            Products List{" "}
            <LinkContainer to="/admin/create-new-product">
              <Button variant="primary" size="lg">
                Create New
              </Button>
            </LinkContainer>
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Panasonic", price: "$250", category: "TV" },
                { name: "Lenovo", price: "$1000", category: "Laptops" },
                { name: "GTA 10", price: "$345", category: "Games" },
              ].map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <LinkContainer to="/admin/edit-product">
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {"/"}
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={deleteHandler}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>*/}
    </>
  );
};

export default AdminProductsPage;
