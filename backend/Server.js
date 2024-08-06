const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const DbConnection = require("./Config/DbConnection");
const path = require("./Routes/CustomerRoute");
const ApplicantRoute = require("./Routes/ApplicantRoute");
const path2 = require("./Routes/TechRoute");
const path3 = require("./Routes/BookRoute");
const path4 = require("./Routes/AcceptedRoute");
const path5 = require("./Routes/AdminRoute");
const path6 = require("./Routes/ChatRoute");
//const path3 = require("./Routes/UserRoute");
const bodyParser = require("body-parser");
DbConnection();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "https://africadeployfrontend.onrender.com",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use("/api/Customer", path);
app.use("/api/Tech", path2);
app.use("/api/Book", path3);
app.use("/api/Accepted", path4);
app.use("/api/Admin", path5);
app.use("/api/Chat", path6);
app.use("/api/Applicants", ApplicantRoute);

let logged = [];
let boddy = [];
const serv = http.createServer(app);
const io = new Server(serv, {
  cors: {
    origin: "https://africadeployfrontend.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
let onlineuser = [];
const addNewUser = (email) => {
  !onlineuser.some((user) => user.email === email) &&
    onlineuser.push({ email });
};
const removeUser = (socketId) => {
  onlineuser = onlineuser.filter((user) => user.socketId !== socketId);
};
const getUser = (email) => {
  return;
};
let isFirstConnection = true;
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  console.log("user con", onlineuser);
  isFirstConnection = false;
  socket.on("newUser", (email) => {
    addNewUser(email);
  });
  socket.on("booking1", (msg) => {
    const { db, latestMember } = msg;
    const client = onlineuser.filter(
      (user) => user.email === latestMember.email
    );
    console.log(client);
    console.log(latestMember.email);
    io.emit("booking", msg);
  });
  socket.on("IsAccept", (msg) => {
    io.emit("IsAccept", msg);
  });
  socket.on("Accept", (msg) => {
    io.emit("Accept2", msg);
  });
  socket.on("isLoading", (msg) => {
    io.emit("isLoading", msg);
  });
  socket.on("Respon", (msg) => {
    io.emit("respon2", msg);
  });
  socket.on("UnAccept", (msg) => {
    io.emit("UnAccept2", msg);
  });
  socket.on("MyObject", (msg) => {
    io.emit("MyObject", msg);
  });
  socket.on("Decline", (msg) => {
    io.emit("Decline", msg);
  });
  socket.on("info", (msg) => {
    io.emit("info", msg);
  });
  socket.on("Finished", (msg) => {
    io.emit("Finished", msg);
  });
  socket.on("Registred", (msg) => {
    io.emit("Registred", msg);
  });
  socket.on("ShowTech", (msg) => {
    io.emit("ShowTech", msg);
  });
  socket.on("Error", (msg) => {
    io.emit("Error", msg);
  });
  socket.on("ErrorM", (msg) => {
    io.emit("ErrorM", msg);
  });
  socket.on("locationChange", (msg) => {
    io.emit("locationChange", msg);
  });
  socket.on("Rejected", (msg) => {
    io.emit("Rejected", msg);
  });
  socket.on("Respon", (msg) => {
    io.emit("respon2", msg);
  });
  socket.on("cancel", (msg) => {
    io.emit("cancel", msg);
  });
  socket.on("custId", (msg) => {
    io.emit("custId", msg);
  });
  socket.on("custId2", (msg) => {
    io.emit("custId2", msg);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
  socket.on("loggedIn", (msg) => {
    logged.push(msg);
  });
  io.emit("loggedIn", logged);
  socket.on("theBody", (msg) => {
    boddy.push(msg);
  });
  io.emit("thebody", boddy);
  socket.on("warning", (msg) => {
    io.emit("warning", msg);
  });
  socket.on("send_message", (msg) => {
    io.emit("receive_message", msg);
  });
  socket.on("send_message2", (msg) => {
    io.emit("receive_message2", msg);
  });
  socket.on("U_id", (msg) => {
    io.emit("U_id", msg);
  });
  socket.on("Deleted", (msg) => {
    io.emit("Deleted", msg);
  });
  socket.on("Deleted2", (msg) => {
    io.emit("Deleted2", msg);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    //console.log("user disconnected",socket.id)
  });
});

serv.listen(port, () => {
  console.log(`i am in port  ${port}`);
});
