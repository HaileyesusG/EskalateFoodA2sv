const Applicant = require("../Model/Applicants");
const Admin = require("../Model/Admin");
const Tech = require("../Model/Technician");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const { setOtp } = require("../utils/otpStore");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
let otpStore = {}; // Temporary store for OTPs
const io = require("socket.io-client");
const socket = io("https://africadeploybackend.onrender.com");
//Sign Up
const ApplicantCreate = async (req, res) => {
  let leastWork = Infinity;
  const {
    department,
    firstname,
    lastname,
    gender,
    phonenumber,
    email,
    password,
    otp,
  } = req.body;
  const [image1, image2, image3, image4] = req.files["testImages"];
  const departmentArray = department.split(",");
  try {
    // Register the user

    ////
    const applicants = await Applicant.create({
      department: [],
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      password,
      image: image1.path,
      image2: image2.path,
      image3: image3.path,
      image4: image4 ? image4.path : "",
    });
    departmentArray.forEach((value) => {
      applicants.department.push(value);
    });

    await applicants.save();

    // const newTech3 = await Admin.find({ department: department });
    // for (const person of newTech3) {
    //   if (person.numberOfworks < leastWork) {
    //     leastWork = person.numberOfworks;
    //   }
    // }
    // const newTech4 = newTech3.filter((t) => t.numberOfworks <= leastWork);
    // const MyObject = { applicants, newTech4 };
    socket.emit("MyObject", applicants);
    socket.once("Registred", async (msg) => {
      const result = await Admin.findById(msg);
      const numberOfworks = result.numberOfworks + 1;
      const final = await Admin.findByIdAndUpdate(
        {
          _id: msg,
        },
        { numberOfworks }
      );

      const update = await Applicant.findOneAndDelete({ _id: applicants._id });
    });
    socket.once("Rejected", async (msg) => {});
    // Clean up the OTP store
    delete otpStore[email];
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    //console.log("error", error);
  }
};

//Generate OTP
const GenerateOtp = async (req, res) => {
  const { email, phonenumber, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const exists = await Tech.findOne({ email });
    if (exists) {
      throw Error("email already in use");
    }
    const exists2 = await Applicant.findOne({ email });
    if (exists2) {
      throw Error("email already in use");
    }
    const exists3 = await Tech.findOne({ phonenumber });
    if (exists3) {
      throw Error("Phonenumber already in use");
    }
    const exists4 = await Applicant.findOne({ phonenumber });
    if (exists4) {
      throw Error("Phonenumber already in use");
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTPy
    console.log("the opt is", otp);
    console.log("the email", email);
    const hashedOtp = await bcryptjs.hash(otp, 10);
    // Store OTP and its expiration time in memory
    setOtp(email, { otp: hashedOtp, otpExpiry: Date.now() + 300000 }); // 5 minutes expiry

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "africadish9@gmail.com",
        pass: "jhrpmzwkhvapckpt",
      },
    });

    const mailOptions = {
      from: "africadish9@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      try {
        if (error) {
          throw Error("Failed to send OTP");
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

//Get all(if Super Admin is Available for the future)

const GetAllApplicant = async (req, res) => {
  const result = await Applicant.find({});
  res.status(200).json(result);
};
//
const GetApplicant = async (req, res) => {
  const { id } = req.params;

  const result = await Applicant.findById(id);
  res.status(200).json(result);
};
const deleteApplicant = async (req, res) => {
  const { id } = req.params;
  const { email, email2, password } = req.body;
  const update = await Applicant.findOneAndDelete({ _id: id });
  const result = await Admin.findOne({ email });
  const numberOfworks = result.numberOfworks + 1;
  const final = await Admin.findByIdAndUpdate(
    {
      _id: result._id,
    },
    { numberOfworks }
  );

  const result2 = await Applicant.find({});
  res.status(200).json(result2);
};

module.exports = {
  GetApplicant,
  ApplicantCreate,
  GetAllApplicant,
  GenerateOtp,
  deleteApplicant,
};
