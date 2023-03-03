import React, { useState, useEffect } from "react";
import "../../chats.css";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
const UserChatComponent = () => {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const [socket, setSocket] = useState(false);
  //Example data of chat array data
  // let chat = [
  //  {"user" : "msg"},
  //   {"user" : "msg"},
  //   {"admin" : "msg"}
  // ]
  const [chat, setChat] = useState([]);
  //For highlight red button
  const [messageReceived, setMessageReceived] = useState(false);
  //For close chat
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false);
  //reconnect with anoter admin
  const [reconnect, setReconnect] = useState(false);
  useEffect(() => {
    if (!userInfo.isAdmin) {
      setReconnect(false);
      //Notification Audio
      var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      //If No admin
      socket.on("no admin", (msg) => {
        setChat((chat) => {
          //Old chat + no admin message
          return [...chat, { admin: "no admin here now" }];
        });
      });
      //Listen admin message
      socket.on("server sends message from admin to client", (msg) => {
        setChat((chat) => {
          //Return old chat with admin msg
          console.log("sendt msg", msg);
          return [...chat, { admin: msg }];
        });
        //Change state and Show red dot when new message arrived
        setMessageReceived(true);
        //Play The Notiifaction Audio
        audio.play();
        const chatMessage = document.querySelector(".chat-msg");
        chatMessage.scrollTop = chatMessage.scrollHeight;
      });
      setSocket(socket);
      //close chat
      socket.on("admin closed chat", () => {
        setChat([]);
        //Show message to client
        setChatConnectionInfo(
          "Admin closed chat. Type something and submit to reconnect"
        );
        setReconnect(true);
      });
      //when page is closed
      return () => socket.disconnect();
    }
  }, [userInfo.isAdmin, reconnect]);

  const clientSubmitChatMsg = (e) => {
    //If pressed key is not enter key
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    setChatConnectionInfo("");
    setMessageReceived(false);
    //get msg data
    const msg = document.getElementById("clientChatMsg");
    //remove extra line space on right side
    let v = msg.value.trim();
    //For null or empty values
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    // Event Name  : "client sends message" , message : "message from client"
    //socket.emit("client sends message", "message from client");
    socket.emit("client sends message", v);
    setChat((chat) => {
      //Return old chat + client message
      return [...chat, { client: v }];
    });
    //Save msg
    msg.focus();
    //Clear chatbox after subbmitting message
    setTimeout(() => {
      //Clear the msg
      msg.value = "";
      //For scroll
      const chatMessage = document.querySelector(".chat-msg");
      //Scroll down to leatest message / downwared scroll
      chatMessage.scrollTop = chatMessage.scrollHeight;
    }, 200);
  };
  return !userInfo.isAdmin ? (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-heart-fill comment"></i>
        {messageReceived && (
          <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        )}
        <i className="bi bi-x-circle-fill close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Welcome to Chat - Online</h6>
        </div>
        <div className="chat-form">
          <div className="chat-msg">
            <p>{chatConnectionInfo}</p>
            {chat.map((item, id) => (
              <div key={id}>
                {item.client && (
                  <p>
                    <b>You Wrote:</b> {item.client}
                  </p>
                )}
                {item.admin && (
                  <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>Support wrote :</b> {item.admin}
                  </p>
                )}
              </div>
            ))}
            {/*Array.from({ length: 20 }).map((_, id) => (
              /*console.log(id);
              <div key={id}>
                <p>
                  <b>You Wrote:</b> Hello, World! This is a toast message.
                </p>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>Support wrote</b> Hello, World! This is a toast message.
                </p>
              </div>
            ))*/}
            {/*<p>Chat History</p>*/}
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Type Message Here..."
            onKeyUp={(e) => clientSubmitChatMsg(e)}
          ></textarea>
          <button
            className="btn btn-success btn-block"
            onClick={(e) => clientSubmitChatMsg(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default UserChatComponent;
