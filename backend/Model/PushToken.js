const mongoose = require("mongoose");

const pushTokenSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  expoPushToken: { type: String, required: true },
});

const PushToken = mongoose.model("PushToken", pushTokenSchema);
module.exports = PushToken;
