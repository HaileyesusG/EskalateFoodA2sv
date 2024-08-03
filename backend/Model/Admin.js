const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const adminSchema = mongoose.Schema(
  {
    department: {
      type: String,
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
    location: {
      type: String,
      required: [true, "Please enter location"],
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
      default: " ",
    },
    numberOfworks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
//static
adminSchema.statics.SignUp = async function (
  department,
  firstname,
  lastname,
  gender,
  phonenumber,
  location,
  email,
  password,
  image
) {
  if (!email) throw Error("email required");

  if (!password) throw Error("passwoed  required");
  if (!firstname) throw Error("firstname required");
  if (!lastname) throw Error("lastname required");
  if (!gender) throw Error("genderare required");
  if (!phonenumber) throw Error("phone required");
  if (!department) throw Error("depart required");
  if (!location) throw Error("genderare required");
  if (image === undefined) throw Error("image required");

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already in use");
  }

  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  const admins = await this.create({
    department,
    firstname,
    lastname,
    gender,
    phonenumber,
    location,
    email,
    password: hash,
    image,
  });
  return admins;
};

//Static LOgin Method

adminSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All files are required");
  }
  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error("Incorrect email ");
  }
  const match = await bcryptjs.compare(password, admin.password);
  if (!match) {
    throw Error("Incorrect password ");
  }
  return admin;
};
module.exports = mongoose.model("Admin", adminSchema);
