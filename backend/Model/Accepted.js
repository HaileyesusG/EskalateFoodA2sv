const mongoose = require("mongoose");
const acceptSchema = mongoose.Schema(
  {
    Customer_firstname: {
      type: String,
      required: [true, "Please enter first Name"],
    },
    Customer_lastname: {
      type: String,
      required: [true, "Please enter last Name"],
    },
    Customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    Technician_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tech",
    },
    Technician_firstname: {
      type: String,
      required: [true, "Please enter Tech first Name"],
    },
    Technician_lastname: {
      type: String,
      required: [true, "Please enter last Name"],
    },
    Technician_email: {
      type: String,
      required: [true, "Please enter Tech email"],
    },
    department: {
      type: String,
      required: [true, "Please enter department"],
    },
    Customer_phonenumber: {
      type: String,
      required: [true, "Please enter phone number"],
    },
    Customer_location: {
      type: String,
      required: [true, "Please enter location"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("accept", acceptSchema);
//static Sign Up
