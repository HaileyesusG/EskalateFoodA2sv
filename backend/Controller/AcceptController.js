const Accepted = require("../Model/Accepted");
const ToFinish = require("../Model/ToFinish");
const toBeFinished = async (req, res) => {
  const { id } = req.params;
  const { department, customerId } = req.body;
  const cv = await ToFinish.create({
    techId: id,
    department: department,
    customerId: customerId,
  });
  res.status(200).json(cv[0]);
};
const DeleteLatestAccept = async (req, res) => {
  const { id } = req.params;
  const df = await ToFinish.findOne({ techId: id });
  const cv = await ToFinish.findByIdAndDelete(df._id);
};

//Get all(if Super Admin is Available for the future)

// Get one(if Super Admin is Available for the future)
const GetOneCustomer = async (req, res) => {
  const { id } = req.params;
  console.log("the id", id);
  const cv = await Accepted.find({ Customer_id: id }).sort({
    createdAt: -1,
  });
  res.status(200).json(cv);
};
const GetOneTech = async (req, res) => {
  const id = req.tech._id;
  const cv = await Accepted.find({ Technician_id: id }).sort({
    createdAt: -1,
  });
  res.status(200).json(cv);
};
const GetLatestAccept = async (req, res) => {
  const { id } = req.params;
  const latestCv = await ToFinish.findOne({ techId: id }).sort({
    createdAt: -1,
  });
  res.status(200).json(latestCv);
};

const DeleteCustomer = async (req, res) => {
  res.status(200).json({ message: "this is delete" });
};

module.exports = {
  GetOneCustomer,
  GetOneTech,
  DeleteCustomer,
  GetLatestAccept,
  toBeFinished,
  DeleteLatestAccept,
};
