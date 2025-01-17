const mongoose = require("mongoose");
const directBookSchema = mongoose.Schema(
  {
    Customer_firstname: {
      type: String,
      default: "",
    },
    Customer_lastname: {
      type: String,
      default: "",
    },
    Customer_email: {
      type: String,
      default: "",
    },
    tech_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Tech",
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
    typeOfProblem: {
      type: String,
      default: "Not Mentioned Yet",
    },
    Status: {
      type: String,
      default: "non",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("directBook", directBookSchema);
//static Sign Up
