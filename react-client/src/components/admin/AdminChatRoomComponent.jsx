import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setMessageReceived } from "../../redux/actions/chatActions";
const AdminChatRoomComponent = ({
  chatRoom,
  roomIndex,
  socket,
  socketUser,
}) => {
  console.log("User", socketUser);
  console.log("Chat", chatRoom[1]);
  // const [toast1, closeToast1] = useState(true);
  // const close1 = () => closeToast1(false);
  // const [toast2, closeToast2] = useState(true);
  // const close2 = () => closeToast2(false);
  // console.log("Admin", chatRoom);

  const dispatch = useDispatch();
  //Dynamic local state var with window keyword of js
  //EX toast1 closeToast1
  [window["toast" + roomIndex], window["closeToast" + roomIndex]] =
    useState(true);

  //For refash after submit chat msg
  const [rerender, setRerender] = useState(false);
  console.log("Room", chatRoom);
  //Close chat
  const close = (socketId) => {
    //dynmaic state setter
    window["closeToast" + roomIndex](false);
    //Send msg to server
    socket.emit("admin closes chat", socketId);
  };
  // const [localChatData, setLocalChatData] = useState([]);

  //Send message admin
  const adminSubmitChatMsg = (e, elem) => {
    //Prevent form submit when page reloaded
    e.preventDefault();
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    const msg = document.getElementById(elem);
    let v = msg.value.trim();
    console.log("admin message", v);
    //For null or empty values
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    //Push value in array
    chatRoom[1].push({ admin: msg.value });
    //Send msg to admin
    socket.emit("admin sends message", {
      user: socketUser,
      message: v,
    });
    //Rerender page to show chat
    setRerender(!rerender);
    //To save msg before empty field
    msg.focus();
    //Hide red icon
    dispatch(setMessageReceived(false));
    setTimeout(() => {
      //Clear the msg
      msg.value = "";
      //For scroll
      const chatMessage = document.querySelector(`.cht-msg${socketUser}`);
      //Scroll down to leatest message / downwared scroll
      if (chatMessage) {
        chatMessage.scrollTop = chatMessage.scrollHeight;
      }
    }, 200);
  };
  //For user chat scroll
  useEffect(() => {
    const chatMessage = document.querySelector(`.cht-msg${socketUser}`);
    if (chatMessage) {
      chatMessage.scrollTop = chatMessage.scrollHeight;
    }
    //Refresh DOM everytime
  });

  // useEffect(() => {
  //   if (chatRoom[1].length > 0) {
  //     setLocalChatData(chatRoom[1]);
  //   }
  // }, []);
  return (
    <>
      <Toast
        className="ms-4 mb-5"
        show={window["toast" + roomIndex]}
        onClose={() => close(chatRoom[0])}
      >
        <Toast.Header>
          <strong className="me-auto">Chat with User</strong>
        </Toast.Header>
        <Toast.Body>
          <div
            className={`cht-msg${socketUser}`}
            style={{ maxHeight: "500px", overflow: "auto" }}
          >
            {chatRoom[1].map((msg, idx) => (
              <Fragment key={idx}>
                {msg.client && (
                  <p
                    key={idx}
                    className="bg-primary p-3 ms-4 text-light rounded-pill"
                  >
                    <b>User Wrote:</b> {msg.client}
                  </p>
                )}
                {msg.admin && (
                  <p key={idx}>
                    <b>Admin Wrote:</b> {msg.admin}
                  </p>
                )}
              </Fragment>
            ))}
          </div>
          <Form className="mt-3">
            {/*Pass  roomIndex to indetiy chat room*/}
            <Form.Group className="mb-3" controlId={`adminChatMsg${roomIndex}`}>
              <Form.Label>Write A Message</Form.Label>
              <Form.Control
                onKeyUp={(e) =>
                  adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)
                }
                as="textarea"
                rows={2}
              />
            </Form.Group>
            <Button
              onClick={(e) => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)}
              variant="success"
              type="submit"
              className="mt-2"
            >
              Submit
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
      {/*  <Toast className="ms-4 mb-5" show={toast2} onClose={close2}>
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
            </Toast>*/}
    </>
  );
};

export default AdminChatRoomComponent;
