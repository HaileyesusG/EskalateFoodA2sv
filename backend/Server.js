const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require("http");
const paz = require("path");
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
    origin: "https://masterfix.onrender.com",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.options("/api/*", cors());

app.use(express.static(paz.join(__dirname, "build")));
app.use("/api/Customer", path);
app.use("/api/Tech", path2);
app.use("/api/Book", path3);
app.use("/api/Accepted", path4);
app.use("/api/Admin", path5);
app.use("/api/Chat", path6);
app.use("/api/Applicants", ApplicantRoute);
app.get("*", (req, res) => {
  res.sendFile(paz.resolve(__dirname, "build", index.html));
});
let logged = [];
let boddy = [];
const serv = http.createServer(app);
const io = new Server(serv, {
  cors: {
    origin: "https://masterfix.onrender.com",
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
    return () => {
      socket.off("newUser");
    };
  });
  socket.on("booking1", (msg) => {
    const { db, latestMember } = msg;

    // Flatten the array of arrays into a single array of objects
    const flattenedArray = latestMember.flat();

    // Check if any email from the flattened array exists in the onlineuser array
    const clients = onlineuser.filter((user) =>
      flattenedArray.some((member) => member.email === user.email)
    );

    if (clients.length > 0) {
      console.log(clients);
      console.log(flattenedArray.map((member) => member.email));
      io.emit("booking", msg);
    }
    return () => {
      socket.off("booking1");
    };
  });
  socket.on("IsAccept", (msg) => {
    io.emit("IsAccept", msg);
    return () => {
      socket.off("IsAccept");
    };
  });

  socket.on("techList", (msg) => {
    io.emit("techList", msg);
    return () => {
      socket.off("techList");
    };
  });

  socket.on("Accept", (msg) => {
    io.emit("Accept2", msg);
    return () => {
      socket.off("Accept");
    };
  });
  socket.on("isLoading", (msg) => {
    io.emit("isLoading", msg);
    return () => {
      socket.off("isLoading");
    };
  });

  socket.on("isLoading12", (msg) => {
    io.emit("isLoading12", msg);
    return () => {
      socket.off("isLoading12");
    };
  });

  socket.on("notSuccess", (msg) => {
    io.emit("notSuccess", msg);
    return () => {
      socket.off("notSuccess");
    };
  });
  socket.on("notSuccess2", (msg) => {
    io.emit("notSuccess2", msg);
    return () => {
      socket.off("notSuccess2");
    };
  });
  //
  socket.on("userNotSuccess", (msg) => {
    io.emit("userNotSuccess", msg);
    return () => {
      socket.off("userNotSuccess");
    };
  });

  socket.on("Respon", (msg) => {
    io.emit("respon2", msg);
    return () => {
      socket.off("Respon");
    };
  });
  socket.on("UnAccept", (msg) => {
    io.emit("UnAccept2", msg);
    return () => {
      socket.off("UnAccept");
    };
  });
  socket.on("MyObject", (msg) => {
    io.emit("MyObject", msg);
    return () => {
      socket.off("MyObject");
    };
  });
  socket.on("Decline", (msg) => {
    io.emit("Decline", msg);
    return () => {
      socket.off("Decline");
    };
  });
  socket.on("info", (msg) => {
    io.emit("info", msg);
    return () => {
      socket.off("info");
    };
  });
  socket.on("Finished", (msg) => {
    io.emit("Finished", msg);
    return () => {
      socket.off("Finished");
    };
  });
  socket.on("Registred", (msg) => {
    io.emit("Registred", msg);
    return () => {
      socket.off("Registred");
    };
  });
  socket.on("ShowTech", (msg) => {
    io.emit("ShowTech", msg);
    return () => {
      socket.off("ShowTech");
    };
  });
  socket.on("Error", (msg) => {
    io.emit("Error", msg);
    return () => {
      socket.off("Error");
    };
  });
  socket.on("ErrorM", (msg) => {
    io.emit("ErrorM", msg);
    return () => {
      socket.off("Error");
    };
  });
  socket.on("locationChange", (msg) => {
    io.emit("locationChange", msg);
    return () => {
      socket.off("locationChange");
    };
  });
  socket.on("Rejected", (msg) => {
    io.emit("Rejected", msg);
    return () => {
      socket.off("Rejected");
    };
  });
  socket.on("Respon", (msg) => {
    io.emit("respon2", msg);
    return () => {
      socket.off("Respon");
    };
  });
  socket.on("cancel", (msg) => {
    console.log("lk ned w ", msg);
    io.emit("cancelR", msg);
    return () => {
      socket.off("cancel");
    };
  });
  socket.on("emptyEmail", (msg) => {
    io.emit("emptyEmail", msg);
    return () => {
      socket.off("emptyEmail");
    };
  });
  socket.on("custId", (msg) => {
    io.emit("custId", msg);
    return () => {
      socket.off("custId");
    };
  });
  socket.on("custId2", (msg) => {
    io.emit("custId2", msg);
    return () => {
      socket.off("custId2");
    };
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    return () => {
      socket.off("disconnect");
    };
  });
  socket.on("loggedIn", (msg) => {
    logged.push(msg);
    return () => {
      socket.off("loggedIn");
    };
  });
  io.emit("loggedIn", logged);
  socket.on("theBody", (msg) => {
    boddy.push(msg);
    return () => {
      socket.off("theBody");
    };
  });
  io.emit("thebody", boddy);
  socket.on("warning", (msg) => {
    io.emit("warning", msg);
    return () => {
      socket.off("warning");
    };
  });
  socket.on("send_message", (msg) => {
    io.emit("receive_message", msg);
    return () => {
      socket.off("send_message");
    };
  });
  socket.on("send_message2", (msg) => {
    io.emit("receive_message2", msg);
    return () => {
      socket.off("send_message2");
    };
  });
  socket.on("U_id", (msg) => {
    io.emit("U_id", msg);
    return () => {
      socket.off("U_id");
    };
  });
  socket.on("Deleted", (msg) => {
    io.emit("Deleted", msg);
    return () => {
      socket.off("Deleted");
    };
  });
  socket.on("Deleted2", (msg) => {
    io.emit("Deleted2", msg);
    return () => {
      socket.off("Deleted2");
    };
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    return () => {
      socket.off("disconnect");
    };
    //console.log("user disconnected",socket.id)
  });
});

serv.listen(port, () => {
  console.log(`i am in port  ${port}`);
});
