const Admin = require("../Model/Admin");
const Technician = require("../Model/Technician");
const jwt = require("jsonwebtoken");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

//Sign Up
const AdminCreate = async (req, res) => {
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
  const image1 = req.file.path;

  try {
    const admins = await Admin.SignUp(
      department,
      firstname,
      lastname,
      gender,
      phonenumber,
      location,
      email,
      password,
      image1
    );

    res.status(200).json({
      department,
      firstname,
      lastname,
      gender,
      phonenumber,
      location,
      email,
      image1,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Login

const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admins = await Admin.Login(email, password);
    const _id = admins._id;
    const firstname = admins.firstname;
    const lastname = admins.lastname;
    const image = admins.image;
    const phonenumber = admins.phonenumber;
    const department = admins.department;
    const gender = admins.gender;
    const location = admins.location;

    //token
    const token = createToken(admins._id);
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
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get all(if Super Admin is Available for the future)

const GetAdmin = async (req, res) => {
  const cv = await Admin.find({});
  res.status(200).json(cv);
};
const RechargeBalance = async (req, res) => {
  let { amount } = req.body;
  amount = Number(amount);
  const { id } = req.params;
  const person = await Technician.findById(id);
  const money = person.deposit;
  const tDeposit = amount + money;
  const minperson45 = await Technician.findByIdAndUpdate(
    { _id: id },
    { deposit: tDeposit },
    { new: true }
  );
  const allTech = await Technician.find({});
  res.status(200).json(allTech);
};
const GetOneAdminById = async (req, res) => {
  const { id } = req.params;
  const cv = await Admin.findById(id);
  res.status(200).json(cv);
};
module.exports = {
  AdminCreate,
  GetAdmin,
  GetOneAdminById,
  LoginAdmin,
  RechargeBalance,
};
