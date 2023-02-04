import React from "react";
import "../../chats.css";
const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-heart-fill comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        <i className="bi bi-x-circle-fill close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Welcome to Chat- Online</h6>
        </div>
        <div className="chat-form">
          <div className="chat-msg">
            {Array.from({ length: 20 }).map((_, id) => (
              /*console.log(id);*/
              <div key={id}>
                <p>
                  <b>You Wrote:</b> Hello, World! This is a toast message.
                </p>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>Support wrote</b> Hello, World! This is a toast message.
                </p>
              </div>
            ))}
            <p>Chat History</p>
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Type Message Here..."
          ></textarea>
          <button className="btn btn-success btn-block">Submit</button>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;
