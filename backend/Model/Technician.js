const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const techSchema = mongoose.Schema(
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
      required: [true, "Please Add profile Pic"],
    },
    image2: {
      type: String,
      required: [true, "Please Add Front Nat Id Pic"],
    },
    image3: {
      type: String,
      required: [true, "Please Add Back Nat Id Pic"],
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
techSchema.statics.SignUp = async function (
  department,
  firstname,
  lastname,
  gender,
  phonenumber,
  email,
  password,
  image,
  image2,
  image3,
  image4
) {
  if (!email) throw Error("email required");
  console.log("the email is", email);
  if (!password) throw Error("passwoed  required");
  if (!firstname) throw Error("firstname required");
  if (!lastname) throw Error("lastname required");
  if (!gender) throw Error("genderare required");
  if (!phonenumber) throw Error("phone required");
  if (!department) throw Error("depart required");
  if (image === undefined) throw Error("Profile Pic is required");
  if (image2 === undefined) throw Error("Front Nat Id is required");
  if (image3 === undefined) throw Error("Back Nat Id is required");

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
  //nodeMailer

  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  const techs = await this.create({
    department,
    firstname,
    lastname,
    gender,
    phonenumber,
    email,
    password: hash,
    image,
    image2,
    image3,
    image4,
  });
  return techs;
};

//Static LOgin Method

techSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All files are required");
  }
  const tech = await this.findOne({ email });
  if (!tech) {
    throw Error("Incorrect email ");
  }
  const match = await bcryptjs.compare(password, tech.password);
  if (!match) {
    throw Error("Incorrect password ");
  }
  return tech;
};
module.exports = mongoose.model("Tech", techSchema);
