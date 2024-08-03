const Customer = require("../Model/Customer");
const jwt = require("jsonwebtoken");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

//Sign Up
const CustomerCreate = async (req, res) => {
  const { phonenumber } = req.body;

  try {
    const customers = await Customer.SignUp(phonenumber);
    console.log("cutomers", customers);
    //token
    const token = createToken(customers._id);
    const phone = customers.phonenumber;
    const _id = customers._id;
    console.log("token", token);
    res.status(200).json({ _id, phone, token });
  } catch (err) {
    console.error("the error", err);
    res.status(400).json({ message: err.message });
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
};
