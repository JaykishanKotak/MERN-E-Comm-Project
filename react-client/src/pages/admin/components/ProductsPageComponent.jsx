import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const ProductsPageComponent = ({ fetchProducts, deleteProduct }) => {
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);
  const dispatch = useDispatch();
  const deleteHandler = async (productId) => {
    if (window.confirm("Are You Sure ?")) {
      const data = await deleteProduct(productId);
      if (data.message === "Product Removed") {
        setProductDeleted(!productDeleted);
      }
    }
    //alert("Product is deleted");
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch(
        (er) =>
          setProducts([
            {
              name: er.response.data.message
                ? er.response.data.message
                : er.response.data,
            },
          ])
        // dispatch(logout())
      );
    return () => abctrl.abort;
  }, [productDeleted]);

  return (
    <>
      <Row className="m-5">
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
              {products.map((product, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/edit-product/${product._id}`}>
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {"/"}
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
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

export default ProductsPageComponent;
