const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
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
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Customer",
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
    Customer_locationN: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
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
bookSchema.index({ Customer_locationN: "2dsphere" });
module.exports = mongoose.model("Book", bookSchema);
//static Sign Up
