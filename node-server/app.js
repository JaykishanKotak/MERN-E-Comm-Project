//For Security
var helmet = require("helmet");
//For Socket
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
//Config env
require("dotenv").config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

const apiRoutes = require("./routes/apiRoutes");

//For Socket
const httpServer = createServer(app);
//To used io variable in other files
global.io = new Server(httpServer);

//Store admin name for socket
const admins = [];
//Store active chats with loggedin admin
let activeChats = [];

//get rendom index for admin
function get_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
//Socket event for sent and revieve message in real time
//Our back end will conect with frontend by using this
io.on("connection", (socket) => {
  //Admin chat delivered while offile
  socket.on("admin connected with server", (adminName) => {
    admins.push({ id: socket.id, admin: adminName });
  });
  //pass same event in frontend
  //"client sends message" will be our connection name
  socket.on("client sends message", (msg) => {
    //If client sends msg and no admin is avaible
    if (admins.length === 0) {
      //Emit -> Only sents to client
      socket.emit("no admin", "");
    } else {
      //For one to one communication
      //Find active client of connection
      let client = activeChats.find((client) => client.clientId === socket.id);
      let targetAdminId;
      if (client) {
        //If inside active chat array
        targetAdminId = client.adminId;
      } else {
        //If new conversation
        let admin = get_random(admins);
        activeChats.push({ clientId: socket.id, adminId: admin.id });
        targetAdminId = admin.id;
      }
      //console.log(msg);
      //Send upcoming message to admin
      //Send of of clients expect sender (server)
      //broadcast => sent msg all expect sender
      // socket.broadcast.emit("server sends message from client to admin", {
      //   message: msg,
      // });
      socket.broadcast
        .to(targetAdminId)
        .emit("server sends message from client to admin", {
          user: socket.id,
          message: msg,
        });
    }
  });

  //For admin message
  // socket.on("admin sends message", ({ message }) => {
  //   //Emit sends all of clients expect sender
  //   socket.broadcast.emit("server sends message from admin to client", message);
  // });

  //prettier-ignore
  socket.on("admin sends message", ({user, message}) => {
    //Emit sends all of clients expect sender
    socket.broadcast.to(user).emit("server sends message from admin to client", message);
  });

  //If admin close chats
  socket.on("admin closes chat", (socketId) => {
    socket.broadcast.to(socketId).emit("admin closed chat", "");
    let c = io.sockets.sockets.get(socketId);
    //Reason server namespace disconnet
    c.disconnect();
  });
  //disconnect server
  socket.on("disconnect", (reason) => {
    //if admin disconnected
    //Remove admin index id
    //Finf where item id === socket id
    const removeIndex = admins.findIndex((item) => item.id === socket.id);
    if (removeIndex !== -1) {
      //Remove obj from array
      admins.splice(removeIndex, 1);
    }
    //If clients disconnect
    activeChats = activeChats.filter((item) => item.adminId !== socket.id);
    //Client disconneceted
    const removeClientIndex = activeChats.findIndex(
      (item) => item.clientId === socket.id
    );
    if (removeClientIndex !== -1) {
      activeChats.splice(removeClientIndex, 1);
    }
    //Sends expect sender
    //If One admin disconnet sent to all clients
    socket.broadcast.emit("disconnected", {
      reason: reason,
      socketId: socket.id,
    });
  });
});

app.get("/", async (req, res, next) => {
  res.json({ message: "API running..." });
});

// mongodb connection
const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const port = process.env.PORT;

//For socket
httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
