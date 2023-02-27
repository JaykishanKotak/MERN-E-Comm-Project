import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  changeCategory,
  setValuesForAttrFromDbSelectForm,
  setAttributesTableWrapper,
} from "./utils/utils";
const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
};
const EditProductPageComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttrToCategoryDocument,
  imageDeleteHandler,
  //uploadHandler,
  uploadImageApiRequest,
  uploadImagesCloudinaryApiRequest,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  //Save Attributes from db
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  //For HTML Table Attributes
  const [attributesTable, setAttributesTable] = useState([]);
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category");
  //For Attrs key and value
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  //For Remove Image
  const [imageRemoved, setImageRemoved] = useState(false);
  //For Upload Image And showing the uploading message
  const [isUploading, setIsUploading] = useState("");
  const [imageUploded, setImageUploded] = useState(false);

  //Get Dynamic Product ID From URL
  const { id } = useParams();
  const navigate = useNavigate();

  //Set dynamic attrs key and value
  const attrVal = useRef(null);
  const attrKey = useRef(null);

  //Ref key and value attributes
  const createNewAttrKey = useRef(null);
  const createNewAttrValue = useRef(null);
  // const setValuesForAttrFromDbSelectForm = (e) => {
  //   //console.log(e.target.value);
  //   if (e.target.value !== "Choose attribute") {
  //     //console.log(attrVal.current);
  //     var selectedAttr = attributesFromDb.find(
  //       (item) => item.key === e.target.value
  //     );
  //     let valuesForAttrKey = attrVal.current;
  //     console.log(selectedAttr);
  //     if (selectedAttr && selectedAttr.value.length > 0) {
  //       while (valuesForAttrKey.options.length) {
  //         //Remove prriously stored values
  //         valuesForAttrKey.remove(0);
  //       }
  //       // Add new attrs value
  //       valuesForAttrKey.options.add(new Option("Choose attribute value"));
  //       selectedAttr.value.map((item) => {
  //         valuesForAttrKey.add(new Option(item));
  //         return "";
  //       });
  //     }
  //   }
  // };
  //Get product detail
  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((err) => console.log(err));
  }, [id, imageRemoved, imageUploded]);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    //Get form value of elements
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
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "Product Updated") {
            navigate("/admin/products");
          }
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  useEffect(() => {
    let catgegoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (catgegoryOfEditedProduct) {
      //Get main category of product
      //EX : Main category of Computers/Laptops/Dell is Computers
      const mainCategotyOfEditedProduct =
        catgegoryOfEditedProduct.name.split("/")[0];
      console.log(mainCategotyOfEditedProduct);

      //Get data with attributes value
      const mainCategotyOfEditedProductAllData = categories.find(
        (catgegoryOfEditedProduct) =>
          catgegoryOfEditedProduct.name === mainCategotyOfEditedProduct
      );
      console.log(mainCategotyOfEditedProductAllData);
      //Get attrs data
      if (
        mainCategotyOfEditedProductAllData &&
        mainCategotyOfEditedProductAllData.attrs.length > 0
      ) {
        //Store attrs array in local state
        setAttributesFromDb(mainCategotyOfEditedProductAllData.attrs);
      }
      //For HTML Table
      setAttributesTable(product.attrs);
    }
    setCategoryChoosen(product.category);
  }, [product]);

  // Change Category Function
  // const changeCategory = (e) => {
  //   const highLevelCategory = e.target.value.split("/")[0];
  //   const highLevelCategoryAllData = categories.find(
  //     (cat) => cat.name === highLevelCategory
  //   );
  //   if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
  //     //Set new attrs data for category change
  //     setAttributesFromDb(highLevelCategoryAllData.attrs);
  //   } else {
  //     setAttributesFromDb([]);
  //   }
  //   setCategoryChoosen(e.target.value);
  // };

  //To update dymanic attrs value
  const attributesValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      //attrs keys for values
      //console.log(attrKey.current.value);
      //attrs values
      //console.log(e.target.value);
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  // const setAttributesTableWrapper = (key, val) => {
  //   setAttributesTable((attr) => {
  //     console.log(attr);
  //     if (attr.length !== 0) {
  //       var keyExistsInOldTable = false;
  //       let modifiedTable = attr.map((item) => {
  //         if (item.key === key) {
  //           //Upadte the old value with new val
  //           keyExistsInOldTable = true;
  //           item.value = val;
  //           return item;
  //         } else {
  //           //retrun unmodified value
  //           return item;
  //         }
  //       });
  //       if (keyExistsInOldTable) {
  //         return [...modifiedTable];
  //       } else {
  //         return [...modifiedTable, { key: key, value: val }];
  //       }
  //     } else {
  //       //return key val as local state if values are empty
  //       return [{ key: key, value: val }];
  //     }
  //   });
  // };
  const deleteAttribute = (key) => {
    console.log(key);
    //Call back to retrun item key whic was not equle to args function
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  //Attrs Handlers
  const checkKeyDown = (e) => {
    //console.log(e.code);
    //Prevent submitting form
    if (e.code === "Enter") {
      e.preventDefault();
    }
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    //Key code 13 is for enter key
    // if (e.keyCode && e.keyCode === 13) {
    //   console.log("add new  key handler");
    // }
    setNewAttrKey(e.target.value);
    addNewAttributeManully(e);
  };

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    //Key code 13 is for enter key
    // if (e.keyCode && e.keyCode === 13) {
    //   console.log("add new value handler");
    // }

    setNewAttrValue(e.target.value);
    addNewAttributeManully(e);
  };

  const addNewAttributeManully = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        //Dispatch action to save/update attibutes in category
        reduxDispatch(
          saveAttrToCategoryDocument(newAttrKey, newAttrValue, categoryChoosen)
        );
        //console.log("Add new attribute");
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrValue.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products/" className="btn btn-info my-3">
            {/*<i className="bi bi-arrow-left"> </i>*/}Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit Product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
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
                defaultValue={product.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                name="count"
                required
                type="number"
                defaultValue={product.count}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                required
                type="text"
                defaultValue={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                <CloseButton />(<small>remove selected</small>)
              </Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
                //onChange={changeCategory}
                onChange={(e) =>
                  changeCategory(
                    e,
                    categories,
                    setAttributesFromDb,
                    setCategoryChoosen
                  )
                }
              >
                <option value="Choose category">Choose category</option>
                {categories.map((category, idx) => {
                  return product.category === category.name ? (
                    <option selected key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control name="newCategory" type="text" />
            </Form.Group>

            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="attrKey"
                      aria-label="Default select example"
                      ref={attrKey}
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
                        <Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </Fragment>
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
                      name="attrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attributesValueSelected}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row className="mt-2">
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
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={categoryChoosen === "Choose category"}
                    placeholder="first choose or create category"
                    name="newAttrKey"
                    type="text"
                    ref={createNewAttrKey}
                    onKeyUp={newAttrKeyHandler}
                    required={newAttrValue}
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
                    disabled={categoryChoosen === "Choose category"}
                    placeholder="first choose or create category"
                    ref={createNewAttrValue}
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrValueHandler}
                    required={newAttrKey}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert
              show={newAttrKey && newAttrValue}
              //variant="info"
              variant="primary"
              className="mt-3"
            >
              After typing attribute key and value press enter on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row>
                {product.images &&
                  product.images.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <Image src={image.path ?? null} fluid />
                      <i
                        style={onHover}
                        onClick={() =>
                          imageDeleteHandler(image.path, id).then((data) =>
                            setImageRemoved(!imageRemoved)
                          )
                        }
                        className="bi bi-x text-danger"
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control
                className="mt-3 mb-3"
                //required
                type="file"
                multiple
                onChange={(e) => {
                  setIsUploading("Upload files in progress...");
                  // uploadHandler(e.target.files, id)
                  //   .then((data) => {
                  //     setIsUploading("Uploading Completed.");
                  //     setImageUploded(!imageUploded);
                  //   })
                  //   .catch((er) =>
                  //     setIsUploading(
                  //       er.response.data.message
                  //         ? er.response.data.message
                  //         : er.response.data
                  //     )
                  //   );
                  if (process.env.NODE_ENV !== "production") {
                    uploadImageApiRequest(e.target.files, id)
                      .then((data) => {
                        setIsUploading("Uploading Completed.");
                        setImageUploded(!imageUploded);
                      })
                      .catch((er) =>
                        setIsUploading(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      );
                  } else {
                    uploadImagesCloudinaryApiRequest(e.target.files, id);
                    setIsUploading(
                      "upload file completed. wait for the result take effect, refresh also if neccassry"
                    );
                    setTimeout(() => {
                      setImageUploded(!imageUploded);
                    }, 5000);
                  }
                }}
              />
              {isUploading}
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
            {updateProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductPageComponent;
