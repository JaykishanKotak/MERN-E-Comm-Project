import React, { Fragment, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const AdminChatRoomComponent = () => {
  const [toast1, closeToast1] = useState(true);
  const close1 = () => closeToast1(false);
  const [toast2, closeToast2] = useState(true);
  const close2 = () => closeToast2(false);
  return (
    <>
      <Toast className="ms-4 mb-5" show={toast1} onClose={close1}>
        <Toast.Header>
          <strong className="me-auto">Chat with John Doe</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "500px", overflow: "auto" }}>
            {Array.from({ length: 30 }).map((_, idx) => (
              <Fragment key={idx}>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>User Wrote:</b> Hello World, Text Body !!!
                </p>
                <p>
                  <b>Admin Wrote:</b> Welcome John Doe Hello World, Text Body
                  !!!
                </p>
              </Fragment>
            ))}
          </div>
          <Form className="mt-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write A Message</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
      <Toast className="ms-4 mb-5" show={toast2} onClose={close2}>
        <Toast.Header>
          <strong className="me-auto">Chat with John Doe</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "500px", overflow: "auto" }}>
            {Array.from({ length: 30 }).map((_, idx) => (
              <Fragment key={idx}>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>User Wrote:</b> Hello World, Text Body !!!
                </p>
                <p>
                  <b>Admin Wrote:</b> Welcome John Doe Hello World, Text Body
                  !!!
                </p>
              </Fragment>
            ))}
          </div>
          <Form className="mt-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write A Message</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
      4
    </>
  );
};

export default AdminChatRoomComponent;
