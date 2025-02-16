const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
const customerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    phonenumber: {
      type: String,
      required: [true, "Please enter phone number"],
    },

    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "dormant",
    },
    status2: {
      type: String,
      default: "tobook",
    },
    location: {
      type: String,
      default: "Null",
    },
    locationN: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);
customerSchema.index({ locationN: "2dsphere" });
//static Sign Up
customerSchema.statics.SignUp = async function (phonenumber) {
  if (!phonenumber) {
    throw Error("phonenumber is required");
  }
  const exists = await this.findOne({ phonenumber });
  if (exists) {
    return exists;
  }

  const customers = await this.create({
    phonenumber,
  });
  return customers;
};

//Static LOgin Method

module.exports = mongoose.model("Customer", customerSchema);
