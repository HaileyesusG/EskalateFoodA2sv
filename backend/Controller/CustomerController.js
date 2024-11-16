const Customer = require("../Model/Customer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
let otpStore = {}; // Temporary store for OTPs
const jwt = require("jsonwebtoken");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

//Sign Up
const CustomerCreate = async (req, res) => {
  const { phonenumber, otp } = req.body;

  try {
    const storedOtpData = otpStore[phonenumber];

    if (!storedOtpData) {
      return res.status(400).send({ message: "OTP not generated or expired" });
    }

    const isOtpValid = await bcrypt.compare(otp, storedOtpData.otp);
    const isOtpExpired = Date.now() > storedOtpData.otpExpiry;

    if (isOtpExpired) {
      delete otpStore[phonenumber];
      return res.status(400).send({ message: "OTP expired" });
    }

    if (!isOtpValid) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    const customers = await Customer.SignUp(phonenumber);
    console.log("cutomers", customers);
    //token
    const token = createToken(customers._id);
    const phone = customers.phonenumber;
    const _id = customers._id;
    console.log("token", token);
    res.status(200).json({ _id, phone, token });
  } catch (err) {
    console.log("the error", err);
    res.status(400).json({ message: err.message });
  }
};

//Generate OTP
const GenerateOtp = async (req, res) => {
  const { phonenumber } = req.body;
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTPy
    console.log("the opt is", otp);
    console.log("the email", phonenumber);
    const hashedOtp = await bcrypt.hash(otp, 10);
    // Store OTP and its expiration time in memory
    otpStore[phonenumber] = { otp: hashedOtp, otpExpiry: Date.now() + 300000 }; // 5 minutes expiry

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "africadish9@gmail.com",
        pass: "jhrpmzwkhvapckpt",
      },
    });

    const mailOptions = {
      from: "africadish9@gmail.com",
      to: "africaCustomer@gmail.com",
      subject: "Your OTP Code",
      text: `${phonenumber} Your OTP code is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      try {
        if (error) {
          throw Error(error);
        }
        res.status(200).json({ message: "OTP sent successfully" });
        console.log("OTP sent successfully");
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Login

//Get all(if Super Admin is Available for the future)

const GetCustomer = async (req, res) => {
  const cv = await Customer.find({});
  res.status(200).json(cv);
};
// Get one(if Super Admin is Available for the future)
const GetOneCustomer = async (req, res) => {
  const email = req.customer.email;
  const cv = await Customer.findOne({ email });
  res.status(200).json(cv);
};
//Update(For password, username and avatar change for the future)
const UpdateCustomer = async (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    phonenumber,
    location,
    email,
    password,
  } = req.body;

  const { id } = req.params;

  const result = await Customer.findById(id);
  if (!result) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await User.findByIdAndUpdate(
    { _id: id },
    { firstname, lastname, gender, phonenumber, location, email, password }
  );

  const updated_2 = await Customer.findById(id);

  res.status(200).json(updated_2);
  // res.status(200).json({ message: "this is update" });
};

//Update one

const UpdateOneCustomer = async (req, res) => {
  const { location } = req.body;

  const { id } = req.params;

  const updated = await Customer.findByIdAndUpdate(
    { _id: id },
    { location: location },
    { new: true }
  );
  const updated_2 = await Customer.findById(id);
  res.status(200).json(updated_2);
};

//Delete

const DeleteCustomer = async (req, res) => {
  const { id } = req.params;
  let result = await Customer.findOneAndDelete({ _id: id });
  result = await Customer.find({});
  res.status(200).json(result);
};

module.exports = {
  CustomerCreate,
  GetCustomer,
  GetOneCustomer,
  UpdateCustomer,
  DeleteCustomer,
  //LoginCustomer,
  UpdateOneCustomer,
  GenerateOtp,
};
