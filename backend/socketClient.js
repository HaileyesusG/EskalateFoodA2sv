// socketClient.js
const io = require("socket.io-client");
const backEndUrl = process.env.VITE_API_BASE_URL;
let socket;

const getSocketClient = () => {
  if (!socket) {
    socket = io(backEndUrl, {
      transports: ["websocket"],
    }); // Replace with your actual socket server URL
    socket.on("connect", () => {
      console.log("Socket client connected:", socket.id);
    });
  }
  return socket;
};

module.exports = getSocketClient;
