import React, { useState, useRef, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  changeCategory,
  setValuesForAttrFromDbSelectForm,
  setAttributesTableWrapper,
} from "./utils/utils";
const CreateProductPageComponent = ({
  uploadImageApiRequest,
  createProductApiRequest,
  uploadImagesCloudinaryApiRequest,
  categories,
  reduxDispatch,
  newCategory,
  deleteCategory,
  saveAttrToCategoryDocument,
}) => {
  //For Navigation
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [images, setImages] = useState(false);
  //For Messages
  const [isCreating, setIsCreating] = useState("");
  //For Error and Message Handling
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  //For New Category
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category");
  //Save Attributes from db
  const [attributesFromDb, setAttributesFromDb] = useState([]);

  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);

  //Set dynamic attrs key and value
  const attrVal = useRef(null);
  const attrKey = useRef(null);

  //Ref key and value attributes
  const createNewAttrKey = useRef(null);
  const createNewAttrValue = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: attributesTable,
    };
    if (event.currentTarget.checkValidity() === true) {
      if (images.length > 3) {
        setIsCreating("Too Many Files!");
        return;
      }
      //console.log(formInputs);
      createProductApiRequest(formInputs)
        .then((data) => {
          console.log(images);
          if (images) {
            //For Heroku Deployment
            if (process.env.NODE_ENV !== "production") {
              // TO DO : change to !==
              console.log("PROD");
              uploadImageApiRequest(images, data.productId)
                .then((res) => {})
                .catch((er) => {
                  setIsCreating(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  );
                });
            }
          } else {
            //For Develpoemnt Use
            console.log("DEV");
            uploadImagesCloudinaryApiRequest(images, data.productId);
          }
          //return data;
          if (data.message === "Product Created") {
            navigate("/admin/products");
          }
        })
        // .then((data) => {
        //   setIsCreating("Product is being created....");
        //   setTimeout(() => {
        //     setIsCreating("");
        //   }, 2000);
        //   if (data.message === "Product Created") {
        //     navigate("/admin/products");
        //   }
        // })
        .catch((er) => {
          setCreateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  //Upload Images
  const uploadHandler = async (images) => {
    setImages(images);
  };

  //For Categories
  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      //Add value in as new category
      reduxDispatch(newCategory(e.target.value));
      setTimeout(() => {
        //To get fresh values in category
        let element = document.getElementById("cats");
        setCategoryChoosen(e.target.value);
        //Auto reflected newly enter value in dropdown of category
        element.value = e.target.value;
        //Fields should be empty in we type someting new, so we can start from scratch
        e.target.value = "";
      }, 200);
    }
  };

  //For delete category
  const deleteCategoryHandler = () => {
    //Get data from form select
    let element = document.getElementById("cats");
    reduxDispatch(deleteCategory(element.value));
    setCategoryChoosen("Choose category");
  };

  //For dynamically chnage attribute values
  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  //Delete attribute values from table
  const deleteAttribute = (key) => {
    //Will retrun all values expected deleted / which item keys are not same as key in values
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    //Key code 13 is for enter key
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        reduxDispatch(
          saveAttrToCategoryDocument(newAttrKey, newAttrValue, categoryChoosen)
        );
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrValue.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };

  //Prevent page from reloading
  const checkKeyDown = (e) => {
    if (e.code === "enter") {
      e.preventDefault();
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products/" className="btn btn-info my-3">
            {/*<i className="bi bi-arrow-left"> </i>*/} Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Create a new Product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                <CloseButton onClick={deleteCategoryHandler} />(
                <small>remove selected</small>)
              </Form.Label>
              <Form.Select
                id="cats"
                required
                name="category"
                aria-label="Default select example"
                onChange={(e) =>
                  changeCategory(
                    e,
                    categories,
                    setAttributesFromDb,
                    setCategoryChoosen
                  )
                }
              >
                <option value="">Choose category</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control
                onKeyUp={newCategoryHandler}
                name="newCategory"
                type="text"
              />
            </Form.Group>
            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      ref={attrKey}
                      name="attrKey"
                      aria-label="Default select example"
                      onChange={(e) =>
                        setValuesForAttrFromDbSelectForm(
                          e,
                          attributesFromDb,
                          attrVal
                        )
                      }
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </React.Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      onChange={attributeValueSelected}
                      ref={attrVal}
                      name="attrVal"
                      aria-label="Default select example"
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Row className="mt-2">
              {attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th> Attribute </th>
                      <th> Value </th>
                      <th> Delete </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttribute(item.key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>
            <Row className="mt-2">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    ref={createNewAttrKey}
                    //disabled={categoryChoosen == "Choose category"}
                    //If tables includes below values
                    disabled={["", "Choose category"].includes(categoryChoosen)}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                    //required={newAttrValue}
                    onKeyUp={newAttrKeyHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={["", "Choose category"].includes(categoryChoosen)}
                    placeholder="first choose or create category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    ref={createNewAttrValue}
                    onKeyUp={newAttrValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/*Only show if we type someting*/}
            <Alert show={newAttrKey && newAttrValue} variant="primary">
              After typing attribute key and value press enter on one of the
              field
            </Alert>
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>

              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => {
                  uploadHandler(e.target.files);
                }}
              />
              {isCreating}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPageComponent;
