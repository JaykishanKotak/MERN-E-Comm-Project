import React from "react";
import { Form } from "react-bootstrap";
const PriceFilterComponent = ({ price, setPrice }) => {
  return (
    <>
      {/*<Form.Label>Range</Form.Label>
  <Form.Range />*/}
      <Form.Label>
        <span className="fw-bold"> Price no greatre then:</span> $ {price}
      </Form.Label>
      <Form.Range
        min={10}
        max={1000}
        step={10}
        onChange={(e) => setPrice(e.target.value)}
      />
    </>
  );
};

export default PriceFilterComponent;
