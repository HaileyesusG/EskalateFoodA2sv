const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require("http");
const paz = require("path");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const { Server } = require("socket.io");
const app = express();
const DbConnection = require("./Config/DbConnection");
const seed = require("./utils/seed").default;
const path = require("./Routes/Foodroute");
const path2 = require("./Routes/RestaurantRoute");
//const path3 = require("./Routes/UserRoute");
const bodyParser = require("body-parser");
DbConnection();
//Start the periodic cleanup job
seed();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.options("/api/*", cors());
app.set("trust proxy", 1);
app.use("/api/foods", path);
app.use("/api/restaurants", path2);
let logged = [];
let boddy = [];
const serv = http.createServer(app);
const io = new Server(serv, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
let onlineuser = [];
const activeUsers = {}; // Store active users and their push tokens
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
  socket.on("registerPushToken", async ({ email, _id, expoPushToken }) => {
    try {
      console.log("Received token:", email, expoPushToken);
      const processedEmail = email.toLowerCase();

      // Upsert (update if exists, insert if not)
      await PushToken.findOneAndUpdate(
        { email: processedEmail },
        { expoPushToken, Tech_id: _id },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log("Push token stored successfully!");
    } catch (error) {
      console.error("Error storing push token:", error);
    }
  });
  socket.on("newUser", (email) => {
    addNewUser(email);
    return () => {
      socket.off("newUser");
    };
  });
  const { Expo } = require("expo-server-sdk");
  const expo = new Expo();

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
