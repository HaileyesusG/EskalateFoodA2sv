const Tech = require("../Model/Technician");
const Customers = require("../Model/Customer");
const Accepted = require("../Model/Accepted");
const Technician = require("../Model/Technician");
const io = require("socket.io-client");
const backEndUrl = process.env.VITE_API_BASE_URL;
const socket = io(backEndUrl);
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const model = require("../Model/Book");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

//Sign Up
const TechCreate = async (req, res) => {
  const {
    department,
    firstname,
    lastname,
    gender,
    phonenumber,
    email,
    password,
    testImage,
    image2,
    image3,
    image4,
  } = req.body;
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
    subject: "You Can Start A Job",
    text: `You have been registered! Your Email and password is ${email} and ${password}`,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(new Error("Failed to send Email"));
        } else {
          resolve();
        }
      });
    });

    const techs = await Tech.SignUp(
      department,
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      password,
      testImage,
      image2,
      image3,
      image4
    );

    res.status(200).json({
      department,
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      testImage,
      image2,
      image3,
      image4,
    });
  } catch (err) {
    console.log("Failed to send Email:", err);
    res.status(400).json({ message: err.message });
  }
};

//Login

const LoginTech = async (req, res) => {
  const { email, password } = req.body;

  try {
    const techs = await Tech.Login(email, password);
    const _id = techs._id;
    const firstname = techs.firstname;
    const lastname = techs.lastname;
    const image = techs.image;
    const phonenumber = techs.phonenumber;
    const deposit = techs.deposit;
    const department = techs.department;
    const gender = techs.gender;
    const location = techs.location;
    const status = techs.status;
    const status2 = techs.status2;
    //token
    const token = createToken(_id);
    res.status(200).json({
      department,
      gender,
      location,
      firstname,
      lastname,
      image: image,
      email,
      token,
      phonenumber,
      _id,
      deposit,
      status,
      status2,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get all(if Super Admin is Available for the future)

const GetTech = async (req, res) => {
  const cv = await Tech.find({});
  res.status(200).json(cv);
};
// Get one(if Super Admin is Available for the future)
const GetOneTechById = async (req, res) => {
  const { id } = req.params;
  const cv = await Tech.findById(id);
  res.status(200).json(cv);
};
const GetOneTech1 = async (req, res) => {
  const email = req.tech.email;
  const cv = await Tech.findOne({ email });
  res.status(200).json(cv);
};

// update deposit, status , number of works

const updateFinish = async (req, res) => {
  const { id } = req.params;
  const { work, departmentt } = req.body;
  try {
    console.log("the id is is", id);
    console.log("the work is", work);
    console.log("the departmentt is", departmentt);
    const UpdateB = await model
      .findOne({
        customer_id: work.myId,
        Status: "accepted",
      })
      .sort({ createdAt: -1 });
    if (UpdateB) {
      let minperson = await Technician.findById(id);
      if (minperson.status == "free" && minperson.status2 == "not") {
        return;
      }
      const UpdateS = await model.findByIdAndUpdate(
        { _id: UpdateB._id },
        { Status: "completed" }
      );
      let minperson4 = await Technician.findById(id);
      // const numberOfworks = minperson4.numberOfworks + 1;
      // let deposit;
      // if (minperson4.department === "TV") {
      //   minperson4;
      //   deposit = minperson4.deposit - 200;
      // }
      // if (minperson4.department === "DISH") {
      //   deposit = minperson4.deposit - 30;
      // }
      const status = "free";
      const status2 = "not";
      const minperson45 = await Technician.findByIdAndUpdate(
        { _id: id },
        { status, status2 }
      );
      const Respon = await Technician.findById(id);
      res.status(200).json(Respon);
      let customer = await Customers.findById(work.myId);

      if (customer) {
        const Customer_firstname = customer.firstname || "";
        const Customer_lastname = customer.lastname || "";
        const Customer_id = customer._id || "";
        const Technician_id = minperson45._id || "";
        const Technician_firstname = minperson45.firstname || "";
        const Technician_lastname = minperson45.lastname || "";
        const Technician_email = minperson45.email || "";
        const department = departmentt;
        const Customer_phonenumber = customer.phonenumber || "";
        const Customer_location = customer.location || "";

        const report = await Accepted.create({
          Customer_id: Customer_id,
          Customer_firstname: Customer_firstname,
          Customer_lastname: Customer_lastname,
          Technician_id: Technician_id,
          Technician_firstname: Technician_firstname,
          Technician_lastname: Technician_lastname,
          Technician_email: Technician_email,
          department: department,
          Customer_phonenumber: Customer_phonenumber,
          Customer_location: Customer_location,
        });
        let minperson48 = await Technician.findById(id);
        const Department2 = minperson48.department;
        if (Department2.includes("TV") || Department2.includes("FRIDGE")) {
          if (minperson48.deposit <= 200) {
            const tosend = await Accepted.find({
              Technician_id: Technician_id,
            })
              .sort({ _id: -1 })
              .limit(5);

            socket.emit("warning", tosend);
          }
        }
        if (Department2.includes("DISH")) {
          if (minperson48.deposit <= 30) {
            const tosend = await Accepted.find({ Technician_id: Technician_id })
              .sort({ _id: -1 })
              .limit(5);

            socket.emit("warning", tosend);
          }
        }
        if (Department2.includes("STOVE") && Department2.includes("TV")) {
          if (minperson48.deposit <= 200) {
            const tosend = await Accepted.find({ Technician_id: Technician_id })
              .sort({ _id: -1 })
              .limit(5);

            socket.emit("warning", tosend);
          }
        }
        if (Department2.includes("DISH") && Department2.includes("TV")) {
          if (minperson48.deposit <= 200) {
            const tosend = await Accepted.find({ Technician_id: Technician_id })
              .sort({ _id: -1 })
              .limit(5);

            socket.emit("warning", tosend);
          }
        }
        if (Department2.includes("STOVE") && Department2.includes("TV")) {
          if (minperson48.deposit <= 200) {
            const tosend = await Accepted.find({ Technician_id: Technician_id })
              .sort({ _id: -1 })
              .limit(5);

            socket.emit("warning", tosend);
          }
        }

        if (Department2.includes("STOVE") || Department2.includes("MITAD")) {
          if (minperson48.deposit <= 100) {
            const tosend = await Accepted.find({ Technician_id: Technician_id })
              .sort({ _id: -1 })
              .limit(5);

            socket.emit("warning", tosend);
          }
        }
      }
    } else {
      const result = await Technician.updateMany(
        { status2: "loading" },
        { $set: { status2: "not" } }
      );
      const Respon = await Technician.findById(id);
      res.status(200).json(Respon);
      return;
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
//update one

const UpdateOneTech = async (req, res) => {
  const { location } = req.body;

  const { id } = req.params;
  const updated = await Tech.findByIdAndUpdate(
    { _id: id },
    { location: location },
    { new: true }
  );
  const updated_2 = await Tech.findById(id);
  res.status(200).json(updated_2);
};

//Update(For password, username and avatar change for the future)
const UpdateTech = async (req, res) => {
  const {
    department,
    firstname,
    lastname,
    gender,
    phonenumber,
    location,
    email,
    password,
  } = req.body;

  const image1 = req.file;
  const image2 = image1.filename;

  const { id } = req.params;

  const result = await Tech.findById(id);
  console.log("the Location", location);
  if (!result) {
    return res.status(400).json({ msg: "no id found" });
  }
  const updated = await Tech.findByIdAndUpdate(
    { _id: id },
    {
      department,
      firstname,
      lastname,
      gender,
      phonenumber,
      location,
      email,
      password,
      image2,
    }
  );

  const updated_2 = await Tech.findById(id);

  res.status(200).json(updated_2);
  // res.status(200).json({ message: "this is update" });
};
//Delete

const DeleteTech = async (req, res) => {
  const { id } = req.params;
  let result = await Tech.findOneAndDelete({ _id: id });
  result = await Tech.find({});
  res.status(200).json(result);
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { isOnline } = req.body;
  let result = await Tech.findByIdAndUpdate(
    { _id: id },
    { status2: isOnline },
    { new: true }
  );
  res.status(200).json(result);
};

module.exports = {
  TechCreate,
  GetTech,
  GetOneTechById,
  UpdateTech,
  UpdateOneTech,
  DeleteTech,
  LoginTech,
  GetOneTech1,
  updateFinish,
  changeStatus
};
