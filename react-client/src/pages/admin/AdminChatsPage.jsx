import React from "react";
import { Col, Row } from "react-bootstrap";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useSelector } from "react-redux";
const AdminChatsPage = () => {
  //Socket chat
  const { chatRooms, socket } = useSelector((state) => state.adminChat);
  console.log("Chats", chatRooms);
  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <Row>
            {/*Converted chat object into array */}
            {Object.entries(chatRooms).map((chatRoom, index) => (
              <AdminChatRoomComponent
                key={index}
                chatRoom={chatRoom}
                socket={socket}
                roomIndex={index + 1}
                socketUser={chatRoom[0]}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdminChatsPage;
