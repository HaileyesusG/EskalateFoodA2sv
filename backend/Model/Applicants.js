const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const Applicant_techSchema = mongoose.Schema(
  {
    department: {
      type: Array,
      required: [true, "Please enter department"],
    },
    firstname: {
      type: String,
      required: [true, "Please enter first Name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter last Name"],
    },
    gender: {
      type: String,
      required: [true, "Please enter gender"],
    },
    phonenumber: {
      type: String,
      required: [true, "Please enter phone number"],
    },

    distance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "free",
    },
    status2: {
      type: String,
      default: "not",
    },
    numberOftimes: {
      type: Number,
      default: 0,
    },
    numberOfworks: {
      type: Number,
      default: 0,
    },
    deposit: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please Add password"],
    },
    image: {
      type: String,
      required: [true, "Please Add profile photo"],
    },
    image2: {
      type: String,
      required: [true, "Please Front side of your National Id"],
    },
    image3: {
      type: String,
      required: [true, "Please Back side of your National Id"],
    },
    image4: {
      type: String,
      default: " ",
    },
    location: {
      type: String,
      default: "Null",
    },
  },
  { timestamps: true }
);
//static

module.exports = mongoose.model("Applicant_Tech", Applicant_techSchema);
